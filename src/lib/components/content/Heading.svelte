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

  export let softBg: boolean = true;
  let softBgClass = softBg ? "bg-soft-tight" : "";
</script>

<svelte:element this={`h${rank}`} class="text-fg-emphasis mb-2 {softBgClass} {rankClass} {$$props.class}">
  <slot />
</svelte:element>
