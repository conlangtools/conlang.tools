<script lang="ts">
  import { milestoneSelection, setSelectedMilestone, type Milestone } from "$stores/sandbox"

  let index = 0;
  let milestone: Milestone | null = null;
  let path: Milestone[] = [];

  let slider: HTMLInputElement;
  $: if (slider) {
    updateSliderBounds();
    updateProgress();
  }

  milestoneSelection.subscribe(update => {
    milestone = update.milestone;
    path = update.path;
    if (slider) updateSliderBounds()
    if (milestone === null) return;
    const idx = path.findIndex(m => m.language.id === milestone?.language.id && m.starts === milestone.starts)
    if (idx === -1) return;
    index = idx;
    updateProgress();
  })

  function updateSliderBounds() {
    slider.min = "" + (path.length < 2 ? -1 : 0);
    slider.max = "" + Math.max(0, path.length - 1);
  }

  function updateProgress() {
    if (!slider) return;
    const n = $milestoneSelection.path.length;
    const progress = n < 2 ? 100 : Math.round((index / (n - 1) * 100))
    slider.style.background = `linear-gradient(to right, var(--c-highlight) 0%, var(--c-highlight) ${progress}%, var(--c-border) ${progress}%, var(--c-border) 100%)`
  }

  function handleChange(evt: Event & { currentTarget: HTMLInputElement }) {
    const idx = Number(evt.currentTarget.value)
    setSelectedMilestone($milestoneSelection.path[idx], false)
  }
</script>

<style lang="scss">
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    height: 8px;
    background-color: var(--c-border);
    border-radius: 2px;
    padding: 0;

    &::-webkit-slider-container {
      -webkit-appearance: none;
      appearance: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: var(--c-accent);
      border-radius: 4px;
      width: 16px;
      height: 16px;
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      appearance: none;
      border: none;
      background: var(--c-accent);
      border-radius: 4px;
      width: 16px;
      height: 16px;
    }

    &::-moz-range-progress {
      background-color: var(--c-highlight);
      height: 8px;
    }
  }
</style>

<div class="bg-secondary p-4 rounded-lg">
  <div class="text-center">
    {#if milestone !== null}
      <span class="font-semibold">{milestone.language.name} @ {milestone.starts}</span>
    {:else}
      <span class="italic text-fg-secondary">No milestone selected</span>
    {/if}
  </div>
  <input
    bind:this={slider}
    type="range"
    class="w-full mt-4"
    value={index}
    disabled={path.length < 2}
    on:input={handleChange}
  />
  <div class="flex justify-between items-center mb-4 px-2">
    {#if path.length === 1}
    <div class="relative">
      <div class="absolute -translate-x-1/2">
        ...
      </div>
    </div>
    {/if}
    {#each path as step, i}
      <div class="relative">
        {#if i !== index}
          <div class="block w-[4px] h-[16px] absolute -top-[24px] -left-[2px] mt-[5px] rounded-sm {i < index ? "bg-accent" : "bg-fg-secondary"}"></div>
        {/if}
        <div class="absolute -translate-x-1/2 text-fg-secondary">
          {step.starts}
        </div>
      </div>
    {/each}
  </div>
</div>
