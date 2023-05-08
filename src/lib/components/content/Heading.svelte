<script lang="ts">
  export let rank: 1 | 2 | 3 | 4 | 5 | 6;

  let rankClass = [
    'text-5xl font-black    first:mt-0 mt-6',
    'text-4xl font-black    first:mt-0 mt-6',
    'text-3xl font-black    first:mt-0 mt-6',
    'text-2xl font-black    first:mt-0 mt-6',
    'text-xl  font-black    first:mt-0 mt-6',
    'text-xl  font-semibold first:mt-0 mt-6',
  ][rank - 1];
</script>

<svelte:element this={`h${rank}`} class="text-fg-emphasis mb-2 bg-soft-tight {rankClass} {$$props.class}">
  <slot />
</svelte:element>
