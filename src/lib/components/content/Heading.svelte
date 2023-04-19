<script lang="ts">
  export let rank: 1 | 2 | 3 | 4 | 5 | 6;

  let rankClass = [
    'text-5xl font-black',
    'text-4xl font-black',
    'text-3xl font-black',
    'text-2xl font-black',
    'text-xl font-black',
    'text-xl font-semibold',
  ][rank - 1];
</script>

<svelte:element this={`h${rank}`} class="text-fg-emphasis mb-2 bg-soft-tight {rankClass} {$$props.class}">
  <slot />
</svelte:element>
