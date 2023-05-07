<script lang="ts">
	import Link from "$lib/components/controls/Link.svelte";
  import { page } from "$app/stores";
 
  export let name: string | undefined = undefined;
  export let root = false;

  const href = root ? '/docs' : `/docs/${name}`;

  $: active = root
    ? $page.route.id === `/docs/(pages)`
    : $page.route.id === `/docs/(pages)/${name}`;

  console.log(name, href, $page.route.id)
</script>

<li>
  {#if !active }
    <Link { href } class="block p-1">
      <slot />
    </Link>
    {:else}
      <div class="p-1 text-fg-primary font-semibold">
        <slot />
      </div>
    {/if}
</li>