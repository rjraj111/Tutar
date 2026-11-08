"""
TutarBD — Full-Stack REST API & Web Server (Python + SQLite3)
Zero external dependencies required. Serves the Web App + REST API endpoints.
Run with:
    python d:\\Tutar\\backend\\server.py
Then open:
    http://localhost:8000
"""

import json
import os
import sqlite3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WEB_DIR = os.path.join(BASE_DIR, "web-app")
DB_PATH = os.path.join(BASE_DIR, "backend", "tutarbd.db")
PORT = 8000


def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS app_state (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            state_json TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    )
    conn.commit()
    conn.close()


def get_saved_state():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT state_json FROM app_state WHERE id = 1")
    row = cur.fetchone()
    conn.close()
    if row:
        try:
            return json.loads(row[0])
        except Exception:
            return None
    return None


def save_state_to_db(state_obj):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    payload = json.dumps(state_obj, ensure_ascii=False)
    cur.execute(
        """
        INSERT INTO app_state (id, state_json, updated_at)
        VALUES (1, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
            state_json = excluded.state_json,
            updated_at = CURRENT_TIMESTAMP
        """,
        (payload,),
    )
    conn.commit()
    conn.close()


class TutarBDRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=WEB_DIR, **kwargs)

    def _send_json(self, data, status=200):
        raw = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            return self._send_json({"ok": True, "service": "TutarBD SQLite API"})

        if parsed.path == "/api/state":
            saved = get_saved_state()
            return self._send_json({"ok": True, "state": saved})

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        length = int(self.headers.get("Content-Length", 0))
        body_raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(body_raw)
        except Exception:
            body = {}

        if parsed.path == "/api/state":
            state_data = body.get("state")
            if state_data is not None:
                save_state_to_db(state_data)
                return self._send_json({"ok": True, "message": "State synced to SQLite DB"})
            return self._send_json({"ok": False, "error": "Missing state payload"}, status=400)

        return self._send_json({"ok": False, "error": "Not found"}, status=404)


if __name__ == "__main__":
    init_db()
    server = ThreadingHTTPServer(("0.0.0.0", PORT), TutarBDRequestHandler)
    print(f"============================================================")
    print(f"🎓 TutarBD Server + SQLite API running at http://localhost:{PORT}")
    print(f"📂 Serving Web App from: {WEB_DIR}")
    print(f"🗄️ SQLite Database at:   {DB_PATH}")
    print(f"============================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        server.server_close()

