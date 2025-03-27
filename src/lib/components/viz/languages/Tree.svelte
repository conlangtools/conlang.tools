<script lang="ts">
	import type { Language } from "@conlangtools/chronlang-engine";
	import { buildLanguageTrees } from "../../../chronlang/tree";
	import TreeNode from "./TreeNode.svelte";

  export let languages: Map<string, Language>;
  export let activeLang: string | null = null;

  let rootNodes;
  $: rootNodes = buildLanguageTrees(languages)
</script>

<style lang="scss">
  $border-width: 2px;

  .tree {
    --border: #{$border-width} solid var(--c-border);

    ul {
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

<section class="tree mt-0 w-full overflow-x-auto">
  <ul class="w-full">
    {#each rootNodes as { language, children }}
      <TreeNode {language} {children} {activeLang} class="root"/>
    {/each}
  </ul>
</section>

