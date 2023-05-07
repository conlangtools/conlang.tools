<script lang="ts">
  import "../styles/global.scss"

	import NavBar from '$lib/components/NavBar.svelte';

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<svelte:head>
    <title>Landing Page | conlang.tools</title> 
</svelte:head>

<div id="app" class="theme-{data.theme} bg-primary text-fg-primary">
  <NavBar />
  <slot />
</div>
