<script lang="ts">
	import type { Module } from "@conlangtools/chronlang-engine";
	import { faChevronDown, faChevronRight, faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
	import { createEventDispatcher } from "svelte";
	import Fa from "svelte-fa";
  import { module } from "$stores/sandbox"
  
  let errors: Module['errors'] = []
  let warnings: Module['warnings'] = []

  module.subscribe(mod => {
    if (mod === null) return;
    errors = mod.errors
    warnings = mod.warnings
  })

  const dispatch = createEventDispatcher();
  
  function jumpToProblem(span: Module['errors'][number]['span']) {
    dispatch("jump", { span })
  }
</script>

<div class="h-full max-h-full overflow-hidden flex flex-col">
  <h3 class="font-semibold text-xl mb-2">Problems</h3>
  <div class="max-h-full overflow-y-auto" style="scrollbar-gutter: stable;">
    {#if errors.length === 0 && warnings.length === 0}
      <p class="p-1">
        <Fa icon={faCircleCheck} class="text-success inline mr-1" size="lg" />
        No problems to show!
      </p>
    {/if}
    {#if errors.length > 0}
      <details class="group open:bg-secondary rounded">
        <summary class="flex gap-2 items-center font-semibold rounded bg-alt hover:bg-secondary group-open:bg-alt p-1 ps-2 cursor-pointer sticky top-0">
          <Fa icon={faCircleXmark} class="text-error" size="lg" />
          <span>Errors ({ errors.length })</span>
          <Fa icon={faChevronRight} class="text-fg-secondary ml-auto mr-3 group-open:hidden" />
          <Fa icon={faChevronDown} class="text-fg-secondary ml-auto mr-2 hidden group-open:block" />
        </summary>
        <ul class="ps-8">
          {#each errors as error}
            <li>
              <button class="flex justify-between hover:bg-alt w-full p-1 px-2 rounded text-left" on:click={() => jumpToProblem(error.span)}>
                <span class="mr-8">{error.message}</span>
                <span class="underline text-fg-secondary">{error.span.source}#{error.span.start.line}:{error.span.start.column}</span>
              </button>
            </li>
          {/each}
        </ul>
      </details>
    {/if}
    {#if warnings.length > 0}
      <details class="group open:bg-secondary rounded">
        <summary class="flex gap-2 items-center font-semibold rounded bg-alt hover:bg-secondary group-open:bg-alt p-1 ps-2 cursor-pointer sticky top-0">
          <Fa icon={faTriangleExclamation} class="text-warn" size="lg" />
          <span>Warnings ({ warnings.length })</span>
          <Fa icon={faChevronRight} class="text-fg-secondary ml-auto mr-3 group-open:hidden" />
          <Fa icon={faChevronDown} class="text-fg-secondary ml-auto mr-2 hidden group-open:block" />
        </summary>
        <ul class="ps-8">
          {#each warnings as warning}
            <li>
              <button class="flex justify-between hover:bg-alt w-full p-1 px-2 rounded text-left" on:click={() => jumpToProblem(warning.span)}>
                <span class="mr-8">{warning.message}</span>
                <span class="underline text-fg-secondary">{warning.span.source}#{warning.span.start.line}:{warning.span.start.column}</span>
              </button>
            </li>
          {/each}
        </ul>
      </details>
    {/if}
  </div>
</div>
