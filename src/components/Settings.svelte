<script>

  import { createEventDispatcher } from 'svelte'
  import { Radio, Section, IconText, IconCornerRadius, IconGroup, SelectMenu } from 'figma-plugin-ds-svelte'
  
  const dispatch = createEventDispatcher()

  export let theme = "blue"
  export let size = "small"
  export let radius = "0"
  export let stroke = "2,2"

  let sizeArray = [
    { 'value': 'small', 'label': '8', 'group': null, 'selected': true },
    { 'value': 'medium', 'label': '12', 'group': null, 'selected': false },
    { 'value': 'large', 'label': '16', 'group': null, 'selected': false },
  ]

  let radiusArray = [
    { 'value': '0', 'label': '0', 'group': null, 'selected': true },
    { 'value': '4', 'label': '4', 'group': null, 'selected': false },
    { 'value': '10', 'label': '10', 'group': null, 'selected': false },
    { 'value': '20', 'label': '20', 'group': null, 'selected': false },
  ]

  let dashArray = [
    { 'value': '2,2', 'label': '2,2', 'group': null, 'selected': true },
    { 'value': '4,4', 'label': '4,4', 'group': null, 'selected': false },
    { 'value': '6,6', 'label': '6,6', 'group': null, 'selected': false },
    { 'value': '10,10', 'label': '10,10', 'group': null, 'selected': false },
  ]

  $: reactiveTheme = theme

  let colors = [
    {color: "blue"},
    {color: "purple"},
    {color: "pink"},
    {color: "yellow"},
    {color: "lime"},
    {color: "black"},
    {color: "white"},
  ]

  let sizes = [
    {size: "small", symbol: "S"},
    {size: "medium", symbol: "M"},
    {size: "large", symbol: "L"},
  ]

  function updateTheme(theme, size) {
    dispatch('message', {
      theme: theme,
      size: size
    })
    console.log(theme,size)
  }

</script>

<div class="holder">
  <Section>Color</Section>
  <div class="nav color">
    {#each colors as color}
    <div class="block" on:click={() => updateTheme(color.color, size.value)}>
      <div class="color-picker {color.color}">
        <Radio bind:group={reactiveTheme} value={color.color}></Radio>
      </div>
    </div>
    {/each}
  </div>
</div>
<div class="holder">
  <Section>Style</Section>
  <div class="inner">
    <SelectMenu 
      iconName={IconText} 
      bind:menuItems={sizeArray} 
      bind:value={size}
      on:change={() => updateTheme(theme, size.value)}
    />
    <SelectMenu 
      iconName={IconCornerRadius} 
      bind:menuItems={radiusArray} 
      bind:value={radius}
    />
    <SelectMenu 
      iconName={IconGroup} 
      bind:menuItems={dashArray} 
      bind:value={stroke}
    />
  </div>
</div>


<style>

  .holder {
    padding: 8px 8px 10px;
    border-bottom: 1px solid var(--border);
  }

  .color {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
  }

  .block {
    width: var(--size-btn);
    height: var(--size-btn);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    border-radius: var(--radius-sm);
  }

  .block-end {
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .block:hover {
    background: var(--grey);
  }

  .current-color {
    box-shadow: inset 0 0 0 2px rgba(0,0,0,0.1);
    border: 2px solid var(--white);
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }

  .current-color.blue {
    background: var(--blue-full);
  }
  .current-color.pink {
    background: var(--pink-full);
  }
  .current-color.pink {
    background: var(--pink-fake);
  }
  .current-color.purple {
    background-color: var(--purple-full);
  }
  .current-color.yellow {
    background-color: var(--yellow-full);
  }
  .current-color.lime {
    background-color: var(--lime-full);
  }
  .current-color.black {
    background-color: var(--charcoal-full);
  }
  .current-color.white {
    background-color: var(--white);
  }

  .button-holder {
    margin-left: 8px;
  }

  .color-picker, .size-picker {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .size-symbol {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .inner {
    display: flex;
  }

</style>