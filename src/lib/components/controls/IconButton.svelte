<script lang="ts">
	import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
	import Fa from "svelte-fa";

  export let icon: IconDefinition;
  export let size: 'md' | 'lg' | '2x' = 'lg';
  export let href: string | undefined = undefined;
  export let external = false;
  export let placement: 'left' | 'right' = 'left';
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  target={href && external ? '_blank' : undefined}
  class="flex items-center gap-3 text-primary bg-accent py-2 px-4 rounded transition duration-300 hover:brightness-110 {$$props.class}"
>
  {#if placement === 'right'}
    <slot />
  {/if}
  <Fa {icon} {size} />
  {#if placement === 'left'}
    <slot />
  {/if}
</svelte:element>
