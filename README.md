# APCUPS Monitor for GNOME Shell

<p align="left">
    <a href="https://extensions.gnome.org/extension/9331/apcups-monitor/">
        <img src="https://github.com/home-sweet-gnome/dash-to-panel/raw/refs/heads/master/media/design/svg/Gnome_logo.svg" width="160px"/>
    </a>
</p>

A professional, lightweight, and highly customizable UPS monitor for GNOME Shell (45-49+). It provides real-time insights into your Power Supply status directly in the system panel.

---

## 🚀 Installation

### Recommended: GNOME Extensions Store
The easiest way to install and stay updated is through the official store.
Click the **"Get it on GNOME"** button above to visit the store page.

### Manual Installation (From Source)
1. Clone the repository:
   ```bash
   git clone git@github.com:Anduin2017/gnome-apcups-monitor.git
   ```
2. Link the folder to your extensions directory:
   ```bash
   ln -s $(pwd) ~/.local/share/gnome-shell/extensions/apcups-monitor@anduin2017
   ```
3. Compile the schema:
   ```bash
   glib-compile-schemas schemas/
   ```
4. Log out and Log in, then enable via the **Extensions** app.

---

## ✨ Features

- **Subtle & Low-key**: Minimalist design that fits perfectly with the GNOME aesthetic.
- **Virtual Power Calculation**: Calculates real-time Wattage (W) based on `NOMPOWER` and `LOADPCT`.
- **Intelligent Switching**: Set different display modes for AC Power and Battery Power.
- **Universal Attributes**: Choose any attribute reported by `apcupsd` to display on the panel.
- **Modern Settings**: Full Libadwaita-based preferences window.

---

## 🛠 Maintenance & Development

### Local Debugging
To see real-time logs and errors:
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```

### Packaging for Release
When you are ready to upload a new version:
1. Increment the `version` number in `metadata.json`.
2. Run the packaging command:
   ```bash
   zip -r apcups-monitor-vX.zip extension.js metadata.json prefs.js schemas/ README.md
   ```

## 📄 License
MIT License.
