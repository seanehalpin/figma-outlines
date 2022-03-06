<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte'
  import styles from './style.css'
  import Settings from './components/Settings.svelte'
  import Preview from './components/Preview.svelte'
  import { Button } from 'figma-plugin-ds-svelte'

  $: theme = "blue"
  $: size = "small"

  function handleTheme(event) {
    theme = event.detail.theme
    size = event.detail.size
  }

  function create() {

    parent.postMessage({ pluginMessage: { 
      'type': 'outline', 
      'theme': theme,
      'size': size,
    } }, '*');

    // console.log("fired create!")
  }

  window.onmessage = async (event) => {
    
    if (event.data.pluginMessage.theme) {
      theme = event.data.pluginMessage.theme
      // console.log(theme)
    }
  }

</script>


<div class="holder">
  <Preview {theme} {size} />
  <Settings {theme} {size} on:message={handleTheme} runFunction={create}/>

  <div class="footer">
    <Button variant="Tertiary">Guide</Button>
    <Button variant="secondary" on:click={() => create()}>Create</Button>
  </div>
</div>



<style>

.holder {
  width: 100%;
  height: 100%;
  position: relative;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
}


</style>