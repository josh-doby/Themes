<h1 align="center">Moonfin Themes</h1>
<h3 align="center">The community theme catalog for the Moonfin clients.</h3>

---

[![License](https://img.shields.io/github/license/Moonfin-Client/Themes.svg)](https://github.com/Moonfin-Client/Themes)

> **[Back to main Moonfin project](https://github.com/Moonfin-Client)**

This repository holds the themes shown in the in-app Theme Store. Every Moonfin client reads [`index.json`](index.json) from here at runtime, lists what it finds, and lets you save any theme to your client so it behaves exactly like a server provided one.

Themes are plain JSON files built with the Moonfin theme editor, so you don't need to write any code to contribute one.

## What is this?

The Theme Store is a browser built into each Moonfin client. It fetches the catalog manifest, shows you the available themes, and when one is chosen, it downloads the theme, validates it, and registers it locally. Saved store themes are kept separate from server pushed themes, so syncing with your server never removes them.

The catalog stays current on its own. When a new theme is merged, a GitHub Action regenerates `index.json`, so nobody has to edit the manifest by hand.

## Contributing a theme

1. Build your theme in the Moonfin theme editor inside of the Moonfin Web client and use **Export JSON**.
2. Add the file as `themes/<your-id>.theme.json`. The `id` inside the file must use lowercase letters, numbers, `_`, or `-`, and it has to be unique across the catalog.
3. Open a pull request. The **Validate themes** check runs automatically and confirms every required field is present and well formed (id, displayName, all color tokens as hex, borders, and so on). If anything is wrong it tells you the file and the field to fix.
4. Once your pull request is merged into `main`, `index.json` is regenerated for you.

## Repository layout

- `themes/*.theme.json` are the individual themes in the editor's export format.
- `index.json` is the generated catalog: `{ schemaVersion, themes: [{ id, displayName, description, file }] }`.
- `scripts/validate-themes.mjs` is the required-field validator, kept in step with the clients' own parsers.
- `scripts/generate-index.mjs` rebuilds `index.json` from the contents of `themes/`.
- `.github/workflows/` holds `validate-pr` (the pull request gate) and `build-index` (regenerates the manifest on `main`).

Clients fetch the raw files directly from `https://raw.githubusercontent.com/Moonfin-Client/Themes/main/`.
