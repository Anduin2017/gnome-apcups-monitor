# APCUPS Monitor for GNOME Shell

<p align="left">
    <a href="https://extensions.gnome.org/extension/9331/apcups-monitor/">
        <img src="https://github.com/home-sweet-gnome/dash-to-panel/raw/refs/heads/master/media/design/svg/Gnome_logo.svg" width="160px"/>
    </a>
</p>

A professional, lightweight, and highly customizable UPS monitor for GNOME Shell (45-49+). It provides real-time insights into your Power Supply status directly in the system panel.

---

## 🛠 Prerequisites (Required)

This extension is a frontend for **apcupsd**. It will not work unless `apcupsd` is installed and properly configured on your system.

### 1. Install apcupsd
```bash
sudo apt update
sudo apt install apcupsd
```

### 2. Configure apcupsd
Edit the configuration file:
```bash
sudo nano /etc/apcupsd/apcupsd.conf
```
Ensure the following lines are set correctly (especially for USB connected UPS):
- `UPSCABLE usb`
- `UPSTYPE usb`
- `DEVICE` (leave blank for auto-detecting USB UPS)

### 3. Restart the service
```bash
sudo systemctl enable apcupsd
sudo systemctl restart apcupsd
```
Verify it's working by running `apcaccess status` in your terminal.

---

## 🚀 Installation

### Recommended: GNOME Extensions Store
👉 **[Install from GNOME Extensions Store](https://extensions.gnome.org/extension/9331/apcups-monitor/)**

---

## ✨ Features

- **Asynchronous Execution**: Uses non-blocking subprocesses to ensure zero impact on GNOME Shell performance.
- **Virtual Power Calculation**: Calculates real-time Wattage (W) based on `NOMPOWER` and `LOADPCT`.
- **Intelligent Switching**: Set different display modes for AC Power and Battery Power.
- **Modern Settings**: Full Libadwaita-based preferences window.

---

## 🎁 Support the Project
If you find this extension useful, consider buying me a coffee!
<p align="left">
    <a href="https://www.paypal.com/donate/?hosted_button_id=5DCVELP7BSAVQ">
        <img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt="Donate with PayPal" />
    </a>
</p>

## 📄 License
MIT License.
