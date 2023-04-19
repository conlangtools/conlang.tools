<script lang="ts">
  export let size: 'sm' | 'lg' = 'sm'

  let sizeClass = size == 'sm' ? 'w-8 xl:w-10' : 'w-20 xl:24'
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 66.48 49.92"
  class="{$$props.class} {sizeClass} bg-soft select-none"
  style={$$props.style}
>
  <g id="group0" transform="translate(-18.097925654162, -99.483743348053)" fill="none">
    <text transform="translate(16.9921875, 147.798122370693)" fill="var(--c-fg-emphasis)" stroke="none" font-family="Fira Sans" font-size="72" font-stretch="normal" font-weight="900" letter-spacing="3">
      ct
    </text>
    <text transform="translate(41.9179312901683, 147.34375)" fill="var(--c-accent)" stroke="none" font-family="Fira Sans" font-size="96" font-stretch="normal" font-weight="900">
      .
    </text>
  </g>
</svg>
