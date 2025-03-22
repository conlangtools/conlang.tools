<script lang="ts">
	import type { Language, Module } from "@conlangtools/chronlang-engine";
  import Tree from "$lib/components/viz/languages/Tree.svelte";
  import InlineCode from "$lib/components/content/InlineCode.svelte";

  export let languages: Map<string, Language>
  export let selectedMilestone: Module['milestones'][0] | null;
</script>

<h3 class="font-semibold text-xl mb-2">Languages</h3>
{#if languages.size > 0}
  <Tree languages={languages} activeLang={selectedMilestone?.language?.id} />
{:else}
  <p class="mt-3">Use <InlineCode>lang</InlineCode> statements to define languages.</p>
{/if}
