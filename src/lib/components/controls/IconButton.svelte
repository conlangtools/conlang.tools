<script lang="ts">
	import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";
	import Fa from "svelte-fa";

  export let icon: IconDefinition;
  export let size: 'md' | 'lg' | '2x' = '2x';
  export let color = 'currentColor';
  export let href: string | undefined = undefined;
  export let external = false;
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  {href}
  target={href && external ? '_blank' : undefined}
  class="flex items-center gap-2 text-fg-secondary bg-soft transition-colors duration-300 hover:text-fg-emphasis {$$props.class}"
>
  <Fa {icon} {size} {color} />
  <slot />
</svelte:element>
