<script lang="ts">
  import Fa from "svelte-fa";
	import { faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
	import type { Module } from "@conlangtools/chronlang-engine";

  type Milestone =  Module['milestones'][number];

  export let milestones: Milestone[];
  export let value: Milestone | null = null;

  let disabled: boolean = true;
  $: disabled = milestones.length === 0;
</script>


<div class="text-center font-semibold text-sm relative">
  <select bind:value={value} class="appearance-none bg-secondary py-1 ps-2 pe-6 m-0 font-semibold {disabled ? "text-fg-secondary" : "hover:bg-primary"}" disabled={disabled}>
    {#if disabled}
      <option value={null}>No Tags</option>
    {:else}
      {#each milestones as milestone}
        <option value={milestone}>{milestone.language.name} @ {milestone.starts}</option>
      {/each}
    {/if}
  </select>
  <div class="absolute right-[6px] top-0 h-full flex items-center text-fg-secondary pointer-events-none">
    {#if disabled}
      <Fa icon={faXmark} size="sm" />
    {:else}
      <Fa icon={faChevronUp} size="sm" />
    {/if}
  </div>
</div>
