<script lang="ts">
	import type { Language } from "@conlangtools/chronlang-engine";
	import { buildLanguageTrees } from "../../../chronlang/tree";
	import TreeNode from "./TreeNode.svelte";

  export let languages: Map<string, Language>;
  export let activeLang: string | null = null;
  export let highlightedLangs: string[];

  let rootNodes;
  $: rootNodes = buildLanguageTrees(languages)
</script>

<section class="tree mt-0 w-full overflow-auto">
  <ul class="w-full">
    {#each rootNodes as { language, children }}
      <TreeNode {language} {children} {activeLang} {highlightedLangs} class="root"/>
    {/each}
  </ul>
</section>

<style lang="scss">
  $line-width: 2px;

  .tree {
    ul {
      --line-color: var(--c-border);
      --line: #{$line-width} solid var(--line-color);

      position: relative;
      padding-top: 1em;
      white-space: nowrap;
      margin: 0 auto;
      text-align: center;

      &::after {
        content: '';
        display: table;
        clear: both;
      }
    }
  }
</style>

