<script lang="ts">
  import { page } from '$app/stores';

  export let href: string;

  let activeClasses: string;
  $: activeClasses = $page.url.pathname.startsWith(href)
    ? "font-semibold text-accent"
    : "text-fg-primary hover:brightness-125";
</script>

<a
  {href}
  class="bg-soft transition duration-300 {activeClasses} {$$props.class}">
  <slot />
</a>
