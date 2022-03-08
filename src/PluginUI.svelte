<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte'
  import styles from './style.css'
  import Settings from './components/Settings.svelte'
  import Preview from './components/Preview.svelte'
  import Work from './components/svg/Work.svelte'
  import Outline from './components/svg/Outline.svelte'
  import { Button, Section, Type } from 'figma-plugin-ds-svelte'

  $: theme = "blue"
  $: size = "small"
  $: radius = "small"
  $: stroke = "1 2"
  let guide = false
  let step = 1

  function handleTheme(event) {
    theme = event.detail.theme
    size = event.detail.size
    radius = event.detail.radius
    stroke = event.detail.stroke
  }

  function create() {

    parent.postMessage({ pluginMessage: { 
      'type': 'outline', 
      'theme': theme,
      'size': size,
      'radius': radius,
      'stroke': stroke
    } }, '*');

    // console.log("fired create!")
  }

  window.onmessage = async (event) => {
    
    if (event.data.pluginMessage.theme) {
      theme = event.data.pluginMessage.theme
    }
    if (event.data.pluginMessage.size) {
      size = event.data.pluginMessage.size
    }
    if (event.data.pluginMessage.radius) {
      radius = event.data.pluginMessage.radius
    }
    if (event.data.pluginMessage.stroke) {
      stroke = event.data.pluginMessage.stroke
    }
  }

  function reset() {
    guide = false
    step = 1
  }

</script>


<div class="holder">
  <Preview {theme} {size} {radius} {stroke} />
  <Settings {theme} {size} {radius} {stroke} on:message={handleTheme} runFunction={create}/>

  <div class="footer">
    <Button variant="Tertiary" on:click={() => guide = true}>Guide</Button>
    <Button variant="secondary" on:click={() => create()}>Run</Button>
  </div>
</div>

{#if guide}
<div class="holder padded fixed">
  {#if step == 1}
  <div class="image-holder">
    <div class="image">
      <Work />
    </div>
  </div>
  <Section>How it works</Section>
  <div class="text">
  <Type>Select a frame that has Auto Layout. Outline will determine the padding of the frame and any spacing between the frames children.</Type>
  </div>
  <div class="footer right">
    <Button variant="secondary" on:click={() => step = 2}>Next -></Button>
  </div>
  {:else}
  <div class="image-holder">
    <div class="image">
      <Outline />
    </div>
  </div>
  <Section>Styling</Section>
  <div class="text">
  <Type>Choose what color to make your outline, along with the font size, corner radius, and dash spacing. You can adjust this per run. Outline will remember your settings the next time you use the plugin.</Type>
  </div>
  <div class="footer right">
    <Button variant="secondary" on:click={() => reset()}>Got it!</Button>
  </div>
  {/if}
</div>
{/if}


<style>

.holder {
  width: 100%;
  height: 100%;
  position: relative;
}

.holder.padded {
  padding: 8px;
}

.holder.fixed {
  position: absolute;
  z-index: 100;
  background: var(--white);
  left: 0;
  top: 0;
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

.footer.right {
  justify-content: flex-end;
}

.image-holder {
  margin: 8px;
}

.image {
  width: 100%;
  height: 118px;
  background: var(--grey-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
}

.text {
  padding: 0 8px;
}


</style>