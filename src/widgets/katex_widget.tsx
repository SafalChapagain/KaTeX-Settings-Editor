import { renderWidget } from '@remnote/plugin-sdk';

let state = "";

export const KatexWidget = () => {
  return (
    <div className="p-2 m-2 rounded-lg rn-clr-background-light-positive rn-clr-content-positive font-inter">
      <h1 className="text-xl">KaTeX Settings Editor</h1>
      <div>
        Paste the value of what you want KATEX_SETTINGS to be: 
        <textarea onChange={(event) => handleChange(event)} style={{resize: "none", fontFamily: "monospace"}} className="rich-text-editor relative min-w-full" id="katex_settings_box">

        </textarea>
        <br/>
        
        <button onClick={() => setKatexSettings()} className="rn-add-button flex items-center justify-center overflow-hidden gap-2 w-[calc(100%-16px)] rn-clr-background-accent hover:rn-clr-background-accent--hovered cursor-pointer  rn-clr-content-on-color rounded m-2 h-8" type='button'>Set</button>
      </div>
    </div>
  );
};

async function handleChange(event: React.ChangeEvent<HTMLTextAreaElement> | undefined )
{
  if (event != undefined)
  {
    state = event.target.value;
  }
}

async function setKatexSettings()
{
  try {

    window.KATEX_SETTINGS = JSON.parse(state);
  }
  catch (e)
  {
    
  }
}

renderWidget(KatexWidget);
