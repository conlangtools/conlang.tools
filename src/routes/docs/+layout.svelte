<script>
	import Menu from "./components/Menu.svelte";

</script>
<svelte:head>
    <title>Documentation | conlang.tools</title> 
</svelte:head>

<div class="h-screen overflow-hidden flex">
  <Menu />
  <main class="pt-16 overflow-y-scroll flex-grow">
    <slot />
  </main>
</div>