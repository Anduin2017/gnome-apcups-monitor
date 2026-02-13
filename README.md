# APCUPS Monitor for GNOME Shell

A lightweight, low-key UPS monitor for GNOME Shell (45+). It fetches real-time data from `apcupsd` and displays it directly on your panel.

![Version](https://img.shields.io/badge/GNOME-45%20%7C%2046%20%7C%2047%20%7C%2048%20%7C%2049-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Subtle Design**: Displays only the most essential data (Load, Power, or Battery) to keep your panel clean.
- **Smart Switching**: Automatically switches display modes when on battery power (e.g., show load on AC, show remaining time on battery).
- **Virtual Power Calculation**: Calculates real-time power consumption (Watts) even if your UPS doesn't report it.
- **Detailed Menu**: Click to see comprehensive UPS status (Voltage, Load, Battery, Model, etc.).
- **Highly Customizable**: 
  - Choose any UPS attribute to display.
  - Configurable refresh rate (down to 1 second).
  - Modern settings UI using Libadwaita.

## Requirements

- **apcupsd**: The extension relies on the `apcaccess` command.
  ```bash
  sudo apt install apcupsd
  sudo systemctl enable --now apcupsd
  ```

## Installation

### From Source
1. Clone the repository:
   ```bash
   git clone git@github.com:Anduin2017/gnome-apcups-monitor.git
   ```
2. Link to your extensions directory:
   ```bash
   ln -s $(pwd) ~/.local/share/gnome-shell/extensions/apcups-monitor@anduin2017
   ```
3. Compile the schema:
   ```bash
   glib-compile-schemas schemas/
   ```
4. Restart GNOME Shell and enable the extension.

## License

MIT License. See `LICENSE` for details.
