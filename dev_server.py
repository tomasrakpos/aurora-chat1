"""Tiny static preview server with SPA route fallback."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class SPAHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def do_GET(self):
        requested = Path(self.translate_path(self.path.split('?', 1)[0]))
        if not requested.exists() and not self.path.startswith('/js/'):
            self.path = '/index.html'
        super().do_GET()

ThreadingHTTPServer(('0.0.0.0', 4173), SPAHandler).serve_forever()
