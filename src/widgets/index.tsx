import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register a sidebar widget.
  await plugin.app.registerWidget('katex_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
    widgetTabTitle: 'KaTeX Settings'
  });
}

async function onDeactivate(plugin: ReactRNPlugin) {
  await plugin.app.unregisterWidget("katex_widget", WidgetLocation.RightSidebar);

}

declareIndexPlugin(onActivate, onDeactivate);
