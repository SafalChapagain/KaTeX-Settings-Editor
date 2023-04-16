import { declareIndexPlugin, ReactRNPlugin, WidgetLocation, SettingEvents } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register a sidebar widget.
  /*
  await plugin.app.registerWidget('katex_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
    widgetTabTitle: 'KaTeX Settings'
  });
  */

  await plugin.settings.registerStringSetting({
    id: "katex_settings",
    title: "Value of KATEX_SETTINGS",
    defaultValue: "{}",
  });

  if (!plugin.isNative)
  {
    await plugin.app.toast("Please retry in native mode!")
  }
  else
  {
    try {
      window.KATEX_SETTINGS = JSON.parse(await plugin.settings.getSetting("katex_settings"));
      await plugin.app.toast("Loaded KaTeX settings!");
    }
    catch (e: any)
    {
      await plugin.app.toast("Failed loading KaTeX settings!");
      
      console.error("Exception thrown", e.stack);
    }
  }
  
  plugin.event.addListener(
    SettingEvents.SettingChanged,
    "katex_settings",
    async () => {
      try{
        window.KATEX_SETTINGS = JSON.parse(await plugin.settings.getSetting("katex_settings"));
        await plugin.app.toast("Loaded KaTex settings!");
      }
      catch (e: any){
        await plugin.app.toast("Failed loading KaTex settings!"); 
      }
    }
  );

}


async function onDeactivate(plugin: ReactRNPlugin) {
  //await plugin.app.unregisterWidget("katex_widget", WidgetLocation.RightSidebar);
}

declareIndexPlugin(onActivate, onDeactivate);
