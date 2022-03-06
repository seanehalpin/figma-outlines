<script>
  export let theme = "blue"
  export let size = "small"
  let text = "20"
</script>

<div class="preview-holder {theme}">
  <div class="preview {theme} {size}">
    <div class="hilite top {theme}">{text}</div>
    <div class="hilite bottom {theme}">{text}</div>
    <div class="hilite left {theme}"><span>{text}</span></div>
    <div class="hilite right {theme}"><span>{text}</span></div>
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
    border: 1px dashed;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
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

</style>