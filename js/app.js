// ==============================================================
//  AURORA CHAT — app.js
//  منطق کامل برنامه: احراز هویت، گفتگوها، پیام‌های Realtime
//  ساختار جدول‌ها داخل schema.sql توضیح داده شده
// ==============================================================

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------
//  State
// ---------------------------------------------------------------
const state = {
  session: null,
  profile: null,          // ردیف پروفایل کاربر جاری
  conversations: [],       // لیست گفتگوهای کاربر
  activeConversationId: null,
  messages: [],             // پیام‌های گفتگوی باز
  messageChannel: null,     // سابسکرایپشن Realtime فعال
};

// ---------------------------------------------------------------
//  DOM references
// ---------------------------------------------------------------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const authScreen = $("#auth-screen");
const appScreen = $("#app-screen");

const loginForm = $("#login-form");
const registerForm = $("#register-form");
const loginError = $("#login-error");
const registerError = $("#register-error");

const conversationListEl = $("#conversation-list");
const searchInput = $("#search-input");
const meAvatar = $("#me-avatar");
const meName = $("#me-name");
const logoutBtn = $("#logout-btn");

const emptyMessagesEl = $("#empty-messages");
const activeChatEl = $("#active-chat");
const messagesListEl = $("#messages-list");
const peerAvatarEl = $("#peer-avatar");
const peerNameEl = $("#peer-name");
const peerStatusEl = $("#peer-status");

const composerForm = $("#composer-form");
const composerInput = $("#composer-input");
const sendBtn = $("#send-btn");

const sidebarEl = $("#sidebar");
const chatPaneEl = $("#chat-pane");
const mobileBackBtn = $("#mobile-back-btn");

const toastEl = $("#toast");

// ---------------------------------------------------------------
//  Utilities
// ---------------------------------------------------------------
function showToast(message, isError = false) {
  toastEl.textContent = message;
  toastEl.classList.toggle("is-error", isError);
  toastEl.classList.add("is-visible");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
}

function initials(name = "") {
  return name.trim().slice(0, 2).toUpperCase() || "?";
}

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------------------------------------------------------------
//  Auth: tabs
// ---------------------------------------------------------------
$$(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".tab-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const target = btn.dataset.tab;
    loginForm.style.display = target === "login" ? "block" : "none";
    registerForm.style.display = target === "register" ? "block" : "none";
  });
});

// ---------------------------------------------------------------
//  Auth: register
// ---------------------------------------------------------------
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  registerError.textContent = "";
  const submitBtn = $("#register-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "در حال ساخت حساب…";

  const username = $("#register-username").value.trim();
  const email = $("#register-email").value.trim();
  const password = $("#register-password").value;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    // اگر کاربر بلافاصله session داره (تایید ایمیل خاموشه) پروفایل رو می‌سازیم
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username,
      });
      if (profileError && profileError.code !== "23505") throw profileError;
    }

    showToast("حساب ساخته شد! اگر تایید ایمیل فعاله، ایمیلت رو چک کن.");
    if (data.session) {
      await handleAuthenticated(data.session);
    } else {
      $$(".tab-btn")[0].click();
    }
  } catch (err) {
    registerError.textContent = translateAuthError(err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "ساخت حساب";
  }
});

// ---------------------------------------------------------------
//  Auth: login
// ---------------------------------------------------------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";
  const submitBtn = $("#login-submit");
  submitBtn.disabled = true;
  submitBtn.textContent = "در حال ورود…";

  const email = $("#login-email").value.trim();
  const password = $("#login-password").value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await handleAuthenticated(data.session);
  } catch (err) {
    loginError.textContent = translateAuthError(err.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "ورود به حساب";
  }
});

function translateAuthError(msg = "") {
  if (msg.includes("Invalid login credentials")) return "ایمیل یا رمز عبور اشتباهه.";
  if (msg.includes("already registered")) return "این ایمیل قبلاً ثبت شده.";
  if (msg.includes("Password should be")) return "رمز عبور باید حداقل ۶ کاراکتر باشه.";
  return msg || "خطایی پیش اومد. دوباره تلاش کن.";
}

// ---------------------------------------------------------------
//  Auth: logout
// ---------------------------------------------------------------
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  cleanupRealtime();
  state.session = null;
  state.profile = null;
  authScreen.classList.add("is-active");
  appScreen.classList.remove("is-active");
});

// ---------------------------------------------------------------
//  After successful login/register: load app
// ---------------------------------------------------------------
async function handleAuthenticated(session) {
  state.session = session;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    showToast("پروفایل پیدا نشد — schema.sql رو روی Supabase اجرا کردی؟", true);
    return;
  }

  state.profile = profile;
  meAvatar.textContent = initials(profile.username);
  meName.textContent = profile.username;

  authScreen.classList.remove("is-active");
  appScreen.classList.add("is-active");

  loadConversations();
}

// ---------------------------------------------------------------
//  Conversations
// ---------------------------------------------------------------
async function loadConversations() {
  const { data, error } = await supabase
    .from("conversation_members")
    .select(`
      conversation:conversations (
        id, is_group, name, created_at,
        members:conversation_members ( user:profiles ( id, username, avatar_url, status ) )
      )
    `)
    .eq("user_id", state.profile.id);

  if (error) {
    conversationListEl.innerHTML = `<p style="padding:16px;color:var(--text-muted);font-size:12.5px;">خطا در بارگذاری گفتگوها: ${escapeHtml(error.message)}</p>`;
    return;
  }

  state.conversations = (data || []).map((row) => row.conversation).filter(Boolean);
  renderConversationList(state.conversations);
}

function renderConversationList(list) {
  if (!list.length) {
    conversationListEl.innerHTML = `
      <div style="padding:28px 16px;text-align:center;color:var(--text-muted);font-size:12.5px;">
        هنوز گفتگویی نداری.<br/>وقتی از Supabase یه مکالمه بسازی، اینجا نمایش داده می‌شه.
      </div>`;
    return;
  }

  conversationListEl.innerHTML = list
    .map((conv) => {
      const peer = getPeerForConversation(conv);
      const title = conv.is_group ? conv.name || "گروه بدون‌نام" : peer?.username || "کاربر";
      return `
        <div class="conv-item" data-id="${conv.id}">
          <div class="avatar">
            ${initials(title)}
            <span class="status-dot"></span>
          </div>
          <div class="conv-item__body">
            <div class="conv-item__top">
              <span class="conv-item__name">${escapeHtml(title)}</span>
              <span class="conv-item__time"></span>
            </div>
            <div class="conv-item__preview">برای شروع، پیام بفرست</div>
          </div>
        </div>`;
    })
    .join("");

  conversationListEl.querySelectorAll(".conv-item").forEach((el) => {
    el.addEventListener("click", () => openConversation(el.dataset.id));
  });
}

function getPeerForConversation(conv) {
  const members = (conv.members || []).map((m) => m.user).filter(Boolean);
  return members.find((m) => m.id !== state.profile.id) || members[0];
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return renderConversationList(state.conversations);
  const filtered = state.conversations.filter((conv) => {
    const peer = getPeerForConversation(conv);
    const title = conv.is_group ? conv.name || "" : peer?.username || "";
    return title.toLowerCase().includes(q);
  });
  renderConversationList(filtered);
});

// ---------------------------------------------------------------
//  Open a conversation
// ---------------------------------------------------------------
async function openConversation(conversationId) {
  state.activeConversationId = conversationId;

  $$(".conv-item").forEach((el) => el.classList.toggle("is-active", el.dataset.id === conversationId));

  const conv = state.conversations.find((c) => c.id === conversationId);
  const peer = getPeerForConversation(conv);
  const title = conv.is_group ? conv.name || "گروه" : peer?.username || "کاربر";

  peerAvatarEl.textContent = initials(title);
  peerNameEl.textContent = title;
  peerStatusEl.textContent = peer?.status || "آنلاین";

  emptyMessagesEl.style.display = "none";
  activeChatEl.style.display = "flex";

  // نمایش موبایل: رفتن به chat-pane
  sidebarEl.classList.add("is-hidden");
  chatPaneEl.classList.add("is-active");

  await loadMessages(conversationId);
  subscribeToMessages(conversationId);
}

mobileBackBtn.addEventListener("click", () => {
  sidebarEl.classList.remove("is-hidden");
  chatPaneEl.classList.remove("is-active");
});

// ---------------------------------------------------------------
//  Messages: load + render
// ---------------------------------------------------------------
async function loadMessages(conversationId) {
  messagesListEl.innerHTML = `<div class="empty-state" style="margin:auto;"><p>در حال بارگذاری پیام‌ها…</p></div>`;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    messagesListEl.innerHTML = `<div class="empty-state" style="margin:auto;"><p>خطا در بارگذاری پیام‌ها: ${escapeHtml(error.message)}</p></div>`;
    return;
  }

  state.messages = data || [];
  renderMessages();
}

function renderMessages() {
  if (!state.messages.length) {
    messagesListEl.innerHTML = `
      <div class="empty-state" style="margin:auto;">
        <div class="empty-state__mark"></div>
        <h3>هنوز پیامی نیست</h3>
        <p>اولین پیام رو تو بفرست 👋</p>
      </div>`;
    return;
  }

  messagesListEl.innerHTML = state.messages
    .map((msg) => {
      const isOwn = msg.sender_id === state.profile.id;
      return `
        <div class="msg-row ${isOwn ? "is-own" : ""}">
          <div>
            <div class="msg-bubble">${escapeHtml(msg.content)}</div>
            <div class="msg-meta"><span>${formatTime(msg.created_at)}</span></div>
          </div>
        </div>`;
    })
    .join("");

  messagesListEl.scrollTop = messagesListEl.scrollHeight;
}

// ---------------------------------------------------------------
//  Realtime subscription for the open conversation
// ---------------------------------------------------------------
function subscribeToMessages(conversationId) {
  cleanupRealtime();

  state.messageChannel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        state.messages.push(payload.new);
        renderMessages();
      }
    )
    .subscribe();
}

function cleanupRealtime() {
  if (state.messageChannel) {
    supabase.removeChannel(state.messageChannel);
    state.messageChannel = null;
  }
}

// ---------------------------------------------------------------
//  Composer: send message
// ---------------------------------------------------------------
composerInput.addEventListener("input", () => {
  composerInput.style.height = "auto";
  composerInput.style.height = Math.min(composerInput.scrollHeight, 120) + "px";
});

composerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    composerForm.requestSubmit();
  }
});

composerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = composerInput.value.trim();
  if (!content || !state.activeConversationId) return;

  sendBtn.disabled = true;
  composerInput.value = "";
  composerInput.style.height = "auto";

  const { error } = await supabase.from("messages").insert({
    conversation_id: state.activeConversationId,
    sender_id: state.profile.id,
    content,
  });

  sendBtn.disabled = false;

  if (error) {
    showToast("ارسال پیام ناموفق بود: " + error.message, true);
    composerInput.value = content; // برگردوندن متن برای تلاش دوباره
  }
});

// ---------------------------------------------------------------
//  Bootstrap: check for existing session on page load
// ---------------------------------------------------------------
(async function bootstrap() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    await handleAuthenticated(data.session);
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      authScreen.classList.add("is-active");
      appScreen.classList.remove("is-active");
    }
  });
})();
                   
