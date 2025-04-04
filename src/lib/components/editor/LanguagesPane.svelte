<script lang="ts">
  import Tree from "$lib/components/viz/languages/Tree.svelte";
  import InlineCode from "$lib/components/content/InlineCode.svelte";
	import TimelineSlider from "./TimelineSlider.svelte";
  import { module, milestoneSelection } from "$stores/sandbox"

  export let split = false;

  let activeLang: string = ""
  let highlightedLangs: string[] = []

  milestoneSelection.subscribe(({ milestone, path }) => {
    activeLang = milestone?.language?.id ?? ""
    highlightedLangs = path.map(m => m.language.id)
  })
</script>

<div class="h-full grid grid-rows-[min-content_1fr] overflow-hidden">
  <h3 class="font-semibold text-xl mb-2">Languages</h3>
  {#if $module !== null && $module.languages.size > 0}
  <div class="grid grid-rows-[1fr_min-content] overflow-hidden">
    <Tree languages={$module.languages} {activeLang} {highlightedLangs} />
    {#if !split}
      <TimelineSlider />
    {/if}
  </div>
  {:else}
    <p class="mt-3">Use <InlineCode>lang</InlineCode> statements to define languages.</p>
  {/if}
</div>
