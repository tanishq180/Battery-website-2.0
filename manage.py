"""Build, check and preview Sunka using only the Python standard library."""

from argparse import ArgumentParser
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from shutil import copy2
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "site"
OUTPUT = ROOT / "dist"


class PageReferences(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {"href", "src"} and value:
                self.references.append(value)


def check(directory):
    """Check page assets and local links without external dependencies."""
    errors = []
    references = 0
    pages = sorted(directory.glob("*.html"))
    if not pages:
        raise SystemExit(f"No HTML pages found in {directory}")
    for page in pages:
        parser = PageReferences()
        parser.feed(page.read_text(encoding="utf-8"))
        for reference in parser.references:
            url = urlsplit(reference)
            if url.scheme or url.netloc or not url.path:
                continue
            references += 1
            path = unquote(url.path)
            target = (directory / path.lstrip("/")) if path.startswith("/") else page.parent / path
            target = target.resolve()
            if not target.is_relative_to(directory.resolve()):
                errors.append(f"{page.name}: path outside the website: {reference}")
                continue
            if target.is_dir():
                target = target / "index.html"
            if not target.exists() and not target.suffix:
                target = target.with_suffix(".html")
            if not target.is_file():
                errors.append(f"{page.name}: missing {reference}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Checked {len(pages)} pages and {references} local references. All passed.")


def build():
    check(SOURCE)
    for source in SOURCE.rglob("*"):
        if source.is_file():
            destination = OUTPUT / source.relative_to(SOURCE)
            destination.parent.mkdir(parents=True, exist_ok=True)
            copy2(source, destination)
    check(OUTPUT)
    print(f"Built static website: {OUTPUT}")


class SiteHandler(SimpleHTTPRequestHandler):
    """Support /products and /products.html in the local preview."""

    def translate_path(self, path):
        translated = Path(super().translate_path(path))
        if not translated.exists() and not translated.suffix:
            candidate = translated.with_suffix(".html")
            if candidate.is_file():
                return str(candidate)
        return str(translated)


def serve(port):
    build()
    handler = partial(SiteHandler, directory=str(OUTPUT))
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
        print(f"Sunka preview: http://127.0.0.1:{port}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPreview stopped.")


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("build", "check", "serve"))
    parser.add_argument("--port", type=int, default=4173)
    arguments = parser.parse_args()
    if arguments.command == "build":
        build()
    elif arguments.command == "check":
        check(SOURCE)
        check(OUTPUT)
    else:
        serve(arguments.port)
