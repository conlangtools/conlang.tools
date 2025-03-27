<script lang="ts">
	import type { Snapshot } from "@conlangtools/chronlang-engine";
	import DictionaryTable from "../viz/languages/DictionaryTable.svelte";

  export let snapshot: Snapshot | undefined
  
</script>


<div class="h-full flex flex-col">
  <h3 class="font-semibold text-xl mb-2">Dictionary</h3>
  {#if snapshot !== undefined}
    <DictionaryTable words={snapshot.words} />
  {:else}
    <p>Select a milestone to generate a snapshot of your dictionary.</p>
  {/if}
</div>
