<script lang="ts">
	import DictionaryTable from "../viz/languages/DictionaryTable.svelte";
  import { snapshot } from "$stores/sandbox";
	import InlineCode from "../content/InlineCode.svelte";
	import TimelineSlider from "./TimelineSlider.svelte";
</script>


<div class="h-full flex flex-col">
  <h3 class="font-semibold text-xl mb-2">Dictionary</h3>
  {#if $snapshot !== null}
    {#if $snapshot.words.length === 0}
      <p>Use the syntax <InlineCode>- gloss /transcription/</InlineCode> to define some words.</p>
    {:else}
      <DictionaryTable words={$snapshot.words} on:jump />
      <TimelineSlider />
    {/if}
  {:else}
    <p>Select a milestone to generate a snapshot of your dictionary.</p>
  {/if}
</div>
