<script>
  export let theme = "blue"
  export let size = "small"
  export let radius = "small"
  export let stroke = "1 2"
  let text = "20"
  $: rx = 0

  $: if (radius == "small") {
    rx = 0
  } else if (radius == "medium") {
    rx = 5
  } else {
    rx = 10
  }

</script>

<div class="preview-holder {theme}">
  <div class="preview {theme} {size} {radius}-radius">
    <div class="hilite top {theme} {radius}-radius">
      {text}
      <svg class="{theme}" width="228" height="20" viewBox="0 0 228 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="227" height="19" stroke={theme} rx={rx} stroke-dasharray={stroke} />
      </svg>
    </div>
    <div class="hilite bottom {theme} {radius}-radius" style="border-radius: {radius}px;">
      {text}
      <svg class="{theme}" width="228" height="20" viewBox="0 0 228 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="227" height="19" stroke={theme} rx={rx} stroke-dasharray={stroke} />
      </svg>
    </div>
    <div class="hilite left {theme} {radius}-radius" style="border-radius: {radius}px;">
      <span>{text}</span>
      <svg class="{theme}" width="20" height="70" viewBox="0 0 20 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="20" height="70" stroke={theme} rx={rx} stroke-dasharray={stroke} />
      </svg>
    </div>
    <div class="hilite right {theme} {radius}-radius" style="border-radius: {radius}px;">
      <span>{text}</span>
      <svg class="{theme}" width="20" height="70" viewBox="0 0 20 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="20" height="70" stroke={theme} rx={rx} stroke-dasharray={stroke} />
      </svg>
    </div>
  </div>
</div>


<style>

  .preview-holder {
    padding: 16px;
    transition: background 0.2s ease-in-out;
  }
  
  .preview {
    width: 100%;
    height: 70px;
    background: var(--white);
    position: relative;
    pointer-events: none;
  }

  .preview.white {
    background: var(--charcoal-bg);
  }

  .hilite {
    position: absolute;
    /* border: 1px dashed; */
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .pink rect {
    stroke: var(--pink-border);
  }
  .blue rect {
    stroke: var(--blue-border);
  }
  .purple rect {
    stroke: var(--purple-border);
  }
  .yellow rect {
    stroke: var(--yellow-border);
  }
  .lime rect {
    stroke: var(--lime-border);
  }

  .small {
    font-size: 8px;
  }

  .medium {
    font-size: 12px;
  }

  .large {
    font-size: 16px;
  }

  .top {
    width: 100%;
    height: 20px;
    left: 0;
    top: 0;
  }

  .bottom {
    width: 100%;
    height: 20px;
    left: 0;
    bottom: 0;
  }

  .left {
    width: 20px;
    height: 100%;
    left: 0;
    top: 0;
  }

  span {
    transform: rotate(-90deg);
  }

  .right {
    width: 20px;
    height: 100%;
    right: 0;
    top: 0;
  }

  .hilite.blue {
    background: var(--blue-light);
    border-color: var(--blue-border);
    color: var(--blue-full);
  }
  .hilite.purple {
    background: var(--purple-light);
    border-color: var(--purple-border);
    color: var(--purple-full);
  }
  .hilite.pink {
    background: var(--pink-light);
    border-color: var(--pink-border);
    color: var(--pink-full);
  }
  .hilite.yellow {
    background: var(--yellow-light);
    border-color: var(--yellow-border);
    color: var(--yellow-text);
  }
  .hilite.lime {
    background: var(--lime-light);
    border-color: var(--lime-border);
    color: var(--lime-text);
  }
  .hilite.white {
    background: var(--charcoal-light);
    border-color: var(--charcoal-border);
    color: var(--white);
  }
  .hilite.black {
    background: var(--black-light);
    border-color: var(--black-border);
    color: var(--black);
  }

  .preview-holder.blue {
    background-color: var(--blue-bg);
  }
  .preview-holder.pink {
    background-color: var(--pink-bg);
  }
  .preview-holder.purple {
    background-color: var(--purple-bg);
  }
  .preview-holder.yellow {
    background-color: var(--yellow-bg);
  }
  .preview-holder.lime {
    background-color: var(--lime-bg);
  }
  .preview-holder.black {
    background-color: var(--grey);
  }
  .preview-holder.white {
    background-color: var(--charcoal-bg);
  }

  .small-radius {
    border-radius: 0;
  }
  .medium-radius {
    border-radius: 5px;
  }
  .large-radius {
    border-radius: 10px;
  }

</style>