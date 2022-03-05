<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte'
  import styles from './style.css'
  import Nav from './components/Nav.svelte'
  import Preview from './components/Preview.svelte'

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
      console.log(theme)
    }
  }

</script>


<div class="holder {theme}">
  <Preview {theme} {size} />
  <Nav {theme} {size} on:message={handleTheme} runFunction={create}/>
</div>


<style>

.holder {
  width: 100%;
  height: 100%;
  position: relative;
  min-height: 237px;
  transition: background 0.2s ease-in-out;
}

.blue {
  background-color: var(--blue-bg);
}
.pink {
  background-color: var(--pink-bg);
}
.purple {
  background-color: var(--purple-bg);
}
.yellow {
  background-color: var(--yellow-bg);
}
.lime {
  background-color: var(--lime-bg);
}
.black {
  background-color: var(--grey);
}
.white {
  background-color: var(--charcoal-bg);
}

</style>