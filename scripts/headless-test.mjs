import { Window } from 'happy-dom'
import fs from 'fs'

const html = fs.readFileSync('dist/index.html', 'utf8')
const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1])

const window = new Window({ url: 'http://localhost:5173' + (process.env.TEST_PATH || '/') })
window.document.write('<div id="root"></div>')
for (const k of ['window','document','navigator','history','location','localStorage','sessionStorage','getComputedStyle','requestAnimationFrame','cancelAnimationFrame','CustomEvent','Event','HTMLElement','MutationObserver','IntersectionObserver']) {
  try { globalThis[k] = window[k] } catch {}
}
globalThis.window = window
globalThis.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} }
window.ResizeObserver = globalThis.ResizeObserver
window.addEventListener('error', (e) => console.log('WINDOW ERROR:', e.message))

for (const s of scripts) {
  try { await import('../dist' + s) ; console.log('LOADED', s) }
  catch (e) { console.log('CRASH in', s, '\n', e.message.split('\n').slice(0,4).join('\n')) }
}
await new Promise(r => setTimeout(r, 1200))
const root = window.document.getElementById('root')
const text = (root?.textContent || '').replace(/\s+/g, ' ')
console.log('ROOT CHILDREN:', root ? root.children.length : 'no root')
console.log('TEXT LENGTH:', text.length)
console.log('BODY TEXT:', text.slice(0, 220))
const markers = process.argv.slice(2)
if (markers.length) {
  for (const m of markers) console.log(text.includes(m) ? `OK   ${m}` : `MISS ${m}`)
}
process.exit(0)
