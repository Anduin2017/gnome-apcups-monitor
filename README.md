# APCUPS Monitor for GNOME Shell

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/GNOME_Logo.svg" width="100" height="100" alt="GNOME Logo">
</p>

A professional, lightweight, and highly customizable UPS monitor for GNOME Shell (45-49+). It provides real-time insights into your Power Supply status directly in the system panel.

[![GNOME Extensions](https://img.shields.io/badge/GNOME-Extensions-blue.svg)](https://extensions.gnome.org/extension/9331/apcups-monitor/)
![Version](https://img.shields.io/badge/Version-2-green)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## 🚀 Installation

### Recommended: GNOME Extensions Store
The easiest way to install and stay updated is through the official store:
👉 **[Install from GNOME Extensions Store](https://extensions.gnome.org/extension/9331/apcups-monitor/)**

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
4. Restart GNOME Shell (Log out and Log in) and enable via the Extensions app.

---

## ✨ Features

- **Subtle & Low-key**: Minimalist design that fits perfectly with the GNOME aesthetic.
- **Virtual Power Calculation**: Calculates real-time Wattage (W) based on `NOMPOWER` and `LOADPCT`.
- **Intelligent Switching**: Set different display modes for AC Power (e.g., Load/Watts) and Battery Power (e.g., Remaining Time).
- **Universal Attributes**: Choose any attribute reported by `apcupsd` to display on the panel.
- **Modern Settings**: Full Libadwaita-based preferences window.

---

## 🛠 Maintenance & Development

### Local Debugging
To see real-time logs and errors while developing:
```bash
# Follow GNOME Shell logs
journalctl -f -o cat /usr/bin/gnome-shell
```

### Changing Settings (GSettings)
Settings are stored via DConf. You can inspect them using:
```bash
gsettings list-recursively org.gnome.shell.extensions.apcups-monitor
```

### Packaging for Release
When you are ready to upload a new version to the GNOME Extension store:
1. Increment the `version` number in `metadata.json`.
2. Run the packaging command:
   ```bash
   zip -r apcups-monitor-vX.zip extension.js metadata.json prefs.js schemas/ README.md
   ```
   *Note: Do not include the `.git` folder in the zip.*

### Requirements
- `apcupsd` must be installed and running.
- The `apcaccess` command must be available in `/usr/sbin/apcaccess`.

## 📄 License
This project is licensed under the MIT License.
