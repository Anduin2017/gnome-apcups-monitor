import St from 'gi://St';
import Clutter from 'gi://Clutter';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import GLib from 'gi://GLib';
import Gio from 'gi://Gio';

export default class ApcUpsExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        
        this._indicator = new PanelMenu.Button(0.0, this.metadata.name, false);
        this._label = new St.Label({
            text: 'UPS: ..',
            y_align: Clutter.ActorAlign.CENTER,
            style_class: 'ups-label'
        });
        this._indicator.add_child(this._label);
        Main.panel.addToStatusArea(this.uuid, this._indicator);

        this._detailsArea = new PopupMenu.PopupMenuItem('Loading...', { reactive: false });
        this._indicator.menu.addMenuItem(this._detailsArea);
        this._indicator.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        
        let settingsItem = new PopupMenu.PopupMenuItem('Settings');
        settingsItem.connect('activate', () => this.openPreferences());
        this._indicator.menu.addMenuItem(settingsItem);

        this._changedId = this._settings.connect('changed', () => this._startTimer());
        this._startTimer();
    }

    _startTimer() {
        if (this._timeoutId) {
            GLib.Source.remove(this._timeoutId);
            this._timeoutId = null;
        }
        let rate = this._settings.get_int('refresh-rate');
        this._updateStatus();
        this._timeoutId = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, rate || 1, () => {
            this._updateStatus();
            return GLib.SOURCE_CONTINUE;
        });
    }

    async _updateStatus() {
        try {
            // 改为异步子进程调用
            let proc = new Gio.Subprocess({
                argv: ['/usr/sbin/apcaccess', 'status'],
                flags: Gio.SubprocessFlags.STDOUT_PIPE | Gio.SubprocessFlags.STDERR_PIPE
            });
            proc.init(null);
            
            let [stdout, stderr] = await proc.communicate_utf8_async(null, null);
            if (!proc.get_successful()) return;

            let data = this._parseAllProps(stdout);

            // 计算虚拟瓦特属性
            let nomPower = parseFloat(data.NOMPOWER) || 0;
            let loadPct = parseFloat(data.LOADPCT) || 0;
            if (nomPower > 0) {
                data.POWER = Math.round(nomPower * (loadPct / 100)) + " Watts";
            }

            let isOnBatt = data.STATUS && data.STATUS.includes('ONBATT');
            let key = this._settings.get_string(isOnBatt ? 'battery-display' : 'normal-display');
            
            let rawValue = data[key] || 'N/A';
            let displayValue = this._formatValue(key, rawValue);

            if (this._label) {
                if (isOnBatt) {
                    this._label.set_text(`🔋 ${displayValue}`);
                    this._label.set_style('color: #ff5555; font-weight: bold; font-family: monospace;');
                } else {
                    let prefix = (key === 'LOADPCT') ? 'L:' : (key === 'POWER' ? 'W:' : (key === 'STATUS' ? '' : key.substring(0,1)+':'));
                    this._label.set_text(`${prefix}${displayValue}`);
                    this._label.set_style('color: white; font-weight: normal; font-family: monospace;');
                }
            }

            if (this._detailsArea) {
                let detailText = ['STATUS', 'LOADPCT', 'POWER', 'BCHARGE', 'TIMELEFT', 'LINEV']
                    .map(k => `${k}: ${data[k] || '?'}`).join('\n');
                this._detailsArea.label.set_text(detailText);
            }

        } catch (e) {
            if (this._label) this._label.set_text('ERR');
        }
    }

    _parseAllProps(output) {
        let res = {};
        output.split('\n').forEach(line => {
            let parts = line.split(':');
            if (parts.length >= 2) res[parts[0].trim()] = parts.slice(1).join(':').trim();
        });
        return res;
    }

    _formatValue(key, val) {
        if (!val) return '??';
        if (val.includes('Percent')) return Math.round(parseFloat(val)) + '%';
        if (val.includes('Volts')) return Math.round(parseFloat(val)) + 'V';
        if (val.includes('Minutes')) return Math.round(parseFloat(val)) + 'm';
        if (val.includes('Watts')) return Math.round(parseFloat(val)) + 'W';
        return val;
    }

    disable() {
        if (this._changedId) {
            this._settings.disconnect(this._changedId);
            this._changedId = null;
        }
        if (this._timeoutId) {
            GLib.Source.remove(this._timeoutId);
            this._timeoutId = null;
        }
        
        // 显式销毁所有创建的 widgets
        if (this._detailsArea) {
            this._detailsArea.destroy();
            this._detailsArea = null;
        }
        if (this._label) {
            this._label.destroy();
            this._label = null;
        }
        if (this._indicator) {
            this._indicator.destroy();
            this._indicator = null;
        }
        
        this._settings = null;
    }
}
