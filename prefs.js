import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ApcUpsPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'UPS Display Configuration' });
        page.add(group);
        window.add(page);

        const options = [
            { id: 'POWER', label: 'Current Power (W)' },
            { id: 'LOADPCT', label: 'Load %' },
            { id: 'BCHARGE', label: 'Battery %' },
            { id: 'TIMELEFT', label: 'Time Remaining' },
            { id: 'STATUS', label: 'UPS Status' },
            { id: 'LINEV', label: 'Line Voltage' },
            { id: 'BATTV', label: 'Battery Voltage' },
            { id: 'NOMPOWER', label: 'Nominal Max Power' }
        ];

        const labels = options.map(o => o.label);
        const ids = options.map(o => o.id);

        const normalRow = new Adw.ComboRow({
            title: 'Normal Display (AC)',
            model: new Gtk.StringList({ strings: labels })
        });
        group.add(normalRow);
        normalRow.selected = Math.max(0, ids.indexOf(settings.get_string('normal-display')));
        normalRow.connect('notify::selected', () => {
            settings.set_string('normal-display', ids[normalRow.selected]);
        });

        const batteryRow = new Adw.ComboRow({
            title: 'On Battery Display',
            model: new Gtk.StringList({ strings: labels })
        });
        group.add(batteryRow);
        batteryRow.selected = Math.max(0, ids.indexOf(settings.get_string('battery-display')));
        batteryRow.connect('notify::selected', () => {
            settings.set_string('battery-display', ids[batteryRow.selected]);
        });

        const rateRow = new Adw.ActionRow({ title: 'Refresh Rate (seconds)' });
        const adj = new Gtk.Adjustment({ lower: 1, upper: 60, step_increment: 1, value: settings.get_int('refresh-rate') });
        const spin = new Gtk.SpinButton({ adjustment: adj, valign: Gtk.Align.CENTER, visible: true });
        rateRow.add_suffix(spin);
        group.add(rateRow);
        settings.bind('refresh-rate', adj, 'value', Gio.SettingsBindFlags.DEFAULT);
    }
}
