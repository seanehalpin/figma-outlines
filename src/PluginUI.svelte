<script>

  import { GlobalCSS } from 'figma-plugin-ds-svelte'
  import { Button, Input, Label, SelectMenu } from 'figma-plugin-ds-svelte'

  let theme = "blue"

  function createShapes() {
    parent.postMessage({ pluginMessage: { 
      'type': 'create-shapes', 
      'count': count,
      'shape': selectedShape.value
    } }, '*');
  }

</script>


<div class="holder {theme}">



</div>


<style>

:root {
  --blue-bg: #EDF6FF;
  --blue-text: #0072DC;
  --blue-light: rgba(0,114,0220, 0.1);
}

.holder {
  width: 100%;
  height: 100%;
}

.blue {
  background-color: var(--blue-bg);
}

</style>