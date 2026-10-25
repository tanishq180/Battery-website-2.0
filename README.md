# Sunka battery website

A six-page website made with **HTML, CSS, vanilla JavaScript and Python**.
No Node.js, npm, JavaScript framework, bundler, Three.js or pip installation is required.

## Edit the website

The editable website is in `site/`:

- `index.html`: home page and the static 3D-style battery image.
- `products.html`: battery categories and filters.
- `mr1232bs.html`: original battery photograph, dimensions and product information.
- `applications.html`: application examples.
- `about.html`: Sunka and Meri Industires.
- `enquiry.html`: downloadable wholesale enquiry.
- `style.css` and `pages.css`: styles and responsive layouts.
- `app.js`: category filters, accessible tabs and enquiry file generation.
- `assets/`: product photograph and home-page rendering.

## Build

With Python 3.9 or later:

```powershell
python manage.py build
```

Python checks local page references and copies the website to `dist/`, the deployment directory.

## Local preview

```powershell
python manage.py serve
```

Open http://127.0.0.1:4173. Stop with Ctrl+C.
Both `/products` and `/products.html` work in this preview.
An alternative port is available with `python manage.py serve --port 8080`.

## Check links and assets

```powershell
python manage.py check
```

The published website serves static HTML, CSS, JavaScript and images. Python manages the local build and preview; no Python server is needed by the current static hosting configuration.

The enquiry form downloads a text file locally. It does not submit or store customer enquiries on a server.
Product dimensions and charging information retain the verification notes from the supplied leaflet.
