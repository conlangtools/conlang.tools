<script lang="ts">
  import Fa from "svelte-fa";
	import { faChevronUp, faXmark } from "@fortawesome/free-solid-svg-icons";
	import { module, milestoneSelection, setSelectedMilestone, type Milestone } from "$stores/sandbox";

  let disabled: boolean = true;
  module.subscribe(mod => disabled = mod === null || mod.milestones.length === 0)

  let value: Milestone | null = null;
  milestoneSelection.subscribe(({ milestone }) => value = milestone);

  function handleChange() {
    if (value === null) return;
    setSelectedMilestone(value, true)
  }
</script>


<div class="text-center font-semibold text-sm relative">
  <select bind:value={value} on:change={handleChange} class="appearance-none bg-secondary py-1 ps-2 pe-6 m-0 font-semibold {disabled ? "text-fg-secondary" : "hover:bg-primary"}" disabled={disabled}>
    {#if disabled || $module === null}
      <option value={null}>No Milestones</option>
    {:else}
      {#each $module.milestones as milestone}
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
