<script>

  import { fly, fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import Textsize from './svg/Textsize.svelte'
  import { Button, Radio, Icon, IconResolve } from 'figma-plugin-ds-svelte'
  
  const dispatch = createEventDispatcher()

  export let theme = "blue"
  export let size = "small"
  export let runFunction
  let nav = "main"
  $: radioTheme = theme
  $: radioSize = size

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
    nav = "main"
  }

</script>

<div class="nav-holder">
  {#if nav == "main"}
  <div class="nav main {theme}" in:fade={{duration:150}}>
    <div class="block" on:click={() => nav = "color"}>
      <div class="color-wheel">
        <div class="current-color {theme}"></div>
      </div>
    </div>
    <div class="block" on:click={() => nav = "text"}>
      {#if theme == 'white'}
      <Textsize color="#fff" />
      {:else}
      <Textsize />
      {/if}
    </div>
    <div class="button-holder">
      <Button class={theme} on:click={runFunction}>Create</Button>
    </div>
  </div>
  {/if}
  {#if nav == "color"}
  <div class="nav color {theme}" in:fade={{duration:150}}>
    {#each colors as color}
    <div class="block" on:click={() => updateTheme(color.color, radioSize)}>
      <div class="color-picker {color.color}">
        <Radio bind:group={radioTheme} value={color.color}></Radio>
      </div>
    </div>
    {/each}
    <!-- <div class="block" on:click={() => nav = "main"}>
      {#if theme == "white"}
      <Icon iconName={IconResolve} color="white"/>
      {:else}
      <Icon iconName={IconResolve} />
      {/if}
    </div> -->
  </div>
  {/if}
  {#if nav == "text"}
  <div class="nav text {theme}" in:fade={{duration:150}}>
    {#each sizes as size}
    <div class="block" on:click={() => updateTheme(radioTheme,size.size)}>
      <div class="size-picker">
        <Radio bind:group={radioSize} value={size.size}><span class="size-symbol">{size.symbol}</span></Radio>
      </div>
    </div>
    {/each}
    <!-- <div class="block" on:click={() => nav = "main"}>
      {#if theme == "white"}
      <Icon iconName={IconResolve} color="white"/>
      {:else}
      <Icon iconName={IconResolve} />
      {/if}
    </div> -->
  </div>
  {/if}
</div>

{#if nav !== "main"}
  <div class="nav-bg" on:click={() => nav = "main"}></div>
{/if}
<style>

  .nav-holder {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: flex-start;
    z-index: 100;
  }

  .nav-bg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 50;
  }

  .nav {
    background: var(--white);
    padding: var(--padding-md);
    border-radius: var(--radius-lg);
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    min-height: 48px;
    position: relative;
  }

  .nav.blue {
    box-shadow: 0px 0px 0px 0px rgba(0, 42, 84, 0.1), 0px 3px 6px 0px rgba(0, 42, 84, 0.1), 0px 11px 11px 0px rgba(0, 42, 84, 0.09), 0px 24px 15px 0px rgba(0, 42, 84, 0.05), 0px 43px 17px 0px rgba(0, 42, 84, 0.01), 0px 67px 19px 0px rgba(0, 42, 84, 0);
  }

  .nav.black {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 3px 6px 0px rgba(0, 0, 0, 0.1), 0px 11px 11px 0px rgba(0, 0, 0, 0.09), 0px 24px 14px 0px rgba(0, 0, 0, 0.05), 0px 42px 17px 0px rgba(0, 0, 0, 0.01), 0px 66px 18px 0px rgba(0, 0, 0, 0);
  }

  .nav.purple {
    box-shadow: 0px 34px 14px rgba(21, 0, 93, 0.01), 0px 19px 12px rgba(21, 0, 93, 0.05), 0px 9px 9px rgba(21, 0, 93, 0.09), 0px 2px 5px rgba(21, 0, 93, 0.1), 0px 0px 0px rgba(21, 0, 93, 0.1);
  }

  .nav.pink {
    box-shadow: 0px 34px 13px rgba(91, 0, 66, 0.01), 0px 19px 11px rgba(91, 0, 66, 0.04), 0px 8px 8px rgba(91, 0, 66, 0.07), 0px 2px 5px rgba(91, 0, 66, 0.08), 0px 0px 0px rgba(91, 0, 66, 0.08);
  }
  .nav.yellow {
    box-shadow: 0px 33px 13px rgba(76, 58, 3, 0.01), 0px 19px 11px rgba(76, 58, 3, 0.05), 0px 8px 8px rgba(76, 58, 3, 0.09), 0px 2px 5px rgba(76, 58, 3, 0.1), 0px 0px 0px rgba(76, 58, 3, 0.1);
  }

  .nav.lime {
    box-shadow: 0px 40px 16px rgba(0, 88, 69, 0.01), 0px 23px 14px rgba(0, 88, 69, 0.05), 0px 10px 10px rgba(0, 88, 69, 0.09), 0px 3px 6px rgba(0, 88, 69, 0.1), 0px 0px 0px rgba(0, 88, 69, 0.1);
  }

  .nav.white {
    background: var(--charcoal-full);
    box-shadow: 0px 42px 17px rgba(0, 0, 0, 0.01), 0px 24px 14px rgba(0, 0, 0, 0.05), 0px 11px 11px rgba(0, 0, 0, 0.09), 0px 3px 6px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .block {
    width: var(--size-btn);
    height: var(--size-btn);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px;
    /* cursor: pointer; */
    border-radius: var(--radius-md);
    /* transition: var(--transition-default); */
  }

  .block-end {
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .block:hover {
    background: var(--grey);
  }

  .white .block:hover {
    background: var(--charcoal-light);
  }

  .color-wheel {
    width: 22px;
    height: 22px;
    background: var(--rainbow);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .white .current-color.white {
    border: 2px solid var(--charcoal-full);
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

</style>