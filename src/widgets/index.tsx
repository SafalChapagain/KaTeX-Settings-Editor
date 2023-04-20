import { declareIndexPlugin, ReactRNPlugin, WidgetLocation, SettingEvents } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

// function works so that if there are multiple calls
// the timer resets, once timer is over, the function is called
// used to prevent too many calls to checking if settings has changed
function debounce(func: () => void, timeout:number){
  let timer:NodeJS.Timeout;
  console.log("this is being called");
  return (...args) => {
    clearTimeout(timer); // stop the timer
    timer = setTimeout(() => { func.apply(this, args); }, timeout); // no idea what .apply does here
  };
}

async function onActivate(plugin: ReactRNPlugin) {
  // define setting option for getting their macros
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
  
  // whenever setting for macro has changed, update macros 1 second afterwards the LAST change has been made
  plugin.event.addListener(
    SettingEvents.SettingChanged,
    "katex_settings",
    debounce(async () => {
      try{
        window.KATEX_SETTINGS = JSON.parse(await plugin.settings.getSetting("katex_settings"));
        await plugin.app.toast("Loaded KaTeX settings!");
      }
      catch (e: any){
        await plugin.app.toast("Failed loading KaTeX settings!"); 
      }
    }, 1000)
  );
}


async function onDeactivate(plugin: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
