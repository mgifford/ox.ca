# Mike Gifford Personal Site | [ox.ca](https://ox.ca)

This is the source code for [Mike Gifford](https://ox.ca)'s personal website. It's built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.

---

## 🚀 Running Locally

You'll need Ruby and Bundler. Then run:

```bash
# Install dependencies
bundle install

# (Optional) Initialize git submodules for presentation features like live captioning
git submodule update --init --recursive

# Start the Jekyll server
bundle exec jekyll serve --source .
```

Then open localhost:4000 in your browser once the server starts (local dev only; not reachable in CI).

---

## 🔍 Project Structure

- `index.md` — Main content file
- `_layouts/default.html` — HTML skeleton for rendering
- `assets/css/style.scss` — Custom site styles
- `media/` — Static media assets (e.g., photos)
- `presentations/` — Slide decks and presentation tools
- `presentations/whisper.cpp/` — Git submodule for live captioning (optional)

---

## ⚙️ Development Notes

- Compatible with GitHub Pages
- Uses `jekyll-theme-minimal` as the base
- Supports dark mode via system preference
- Customizations live in `style.scss` and `_config.yml`

---

## 📄 License

This site is licensed under the [GNU AGPLv3](LICENSE).

