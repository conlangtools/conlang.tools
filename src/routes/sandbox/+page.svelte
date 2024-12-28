<script lang="ts">
  import { faBook, faCircleExclamation, faDiagramProject, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
	import Fa from "svelte-fa";

	import compile from "$lib/chronlang/compile";
	import Heading from "$lib/components/content/Heading.svelte";
	import { Module, type Snapshot } from "@conlangtools/chronlang-engine";
	import Tree from './Tree.svelte';
	import InlineCode from '$lib/components/content/InlineCode.svelte';

  let code = `import { C, V } from @core/ipa

lang TP: Toki Pona
lang DB < TP: Dutse Bon

@ 0, TP

- speech /toki/
- good /pona/
- mushroom /soko/

@ 10, DB

$ o > ʌ                         : /o/ becomes /ʌ/
$ [C+velar] > [+palatal] / _i   : velars are palatalised before /i/
$ [V-rounded] > ə               : unrounded vowels become ə word finally

@ 20

$ ə > e / [C+palatal]_              : ə becomes e after palatals
$ [C] > [+voiced] / #_              : consonants are voiced word initially
$ [V] > [+rounded] / [C+bilabial]_  : vowels are rounded following bilabials

@ 30

$ c > t͡s        : c lenites to t͡s
$ ə > [] / _#   : word-final schwa is lost`

  let module: Module;

  $: compile(code, "sandbox.lang")
      .then(mod => {
        module = mod
      })

  let textarea: HTMLTextAreaElement;
  let cursorPosition: { line: number, column: number };

  $: textarea && updateCursor();

  function updateCursor() {
    cursorPosition = offsetToSpan(textarea.selectionStart, code);
  }

  function setCursorPosition(span: typeof module.errors[0]["span"]) {
    textarea.focus()
    textarea.selectionStart = span.start.offset;
    textarea.selectionEnd = span.end.offset;
  }

  function offsetToSpan(offset: number, source: string) {
    const textBefore = source.slice(0, offset)
    const lines = textBefore.split("\n")
    const line = lines.length;
    const column = (lines.at(-1)?.length ?? 0) + 1

    return { line, column, offset }
  };
  
  let selectedMilestone: typeof module.milestones[0];
  let snapshot: Snapshot;
  $: if(module && selectedMilestone) snapshot = module.snapshot(selectedMilestone.language, selectedMilestone.starts + 0.0001)
    
</script>

<svelte:head>
  <title>Sandbox | conlang.tools</title> 
</svelte:head>

<main class="w-full relative px-4 pt-24 h-full h-100">
  <Heading rank={2}>Sandbox</Heading>
  <div class="grid grid-cols-2 gap-4 h-[calc(100vh-144px)] pb-4">
    <div class="flex flex-col">
      <textarea
        bind:this={textarea}
        on:selectionchange={updateCursor}
        bind:value={code}
        class="peer block grow whitespace-pre font-mono overflow-auto p-4 rounded-t font-semibold text-fg-secondary bg-alt border-2 border-border border-b-0 focus:outline-none focus:ring-0 focus:bg-secondary focus:border-accent focus:text-fg-emphasis" />
      <div class="bg-alt font-mono rounded-b border-2 border-border border-t-0 h-6 flex gap-3 items-center justify-end px-2 text-sm font-semibold peer-focus:bg-accent peer-focus:border-accent peer-focus:text-primary">
        {#if cursorPosition !== undefined}
          <div>sandbox.lang {cursorPosition.line}:{cursorPosition.column}</div>
        {/if}
      </div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden">
      {#if module === undefined}
        <p>Start writing some code to see the output here...</p>
      {:else}
        {#if module.errors.length > 0 }
          <details class="bg-secondary rounded mb-3 [&_summary]:open:bg-error [&_h4]:open:!text-secondary">
            <summary class="block cursor-pointer hover:bg-[rgba(var(--c-error-rgb),0.2)] rounded px-3 py-2 transition-colors duration-300">
              <Heading rank={4} softBg={false} class="!text-error flex gap-3 items-center !mb-0">
                <Fa icon={faCircleExclamation} color="currentColor" />
                Errors ({module.errors.length})
              </Heading>
            </summary>
            <div class="p-3 pb-1">
              {#each module.errors as error}
                <article class="mb-2 bg-[rgba(var(--c-error-rgb),0.15)] rounded p-2">
                  <p>{error.message}</p>
                  <p class="text-error">
                    at
                    <button
                      class="font-semibold underline"
                      on:click={() => setCursorPosition(error.span)}
                    >{`${error.span.source} ${error.span.start.line}:${error.span.start.column}`}</button>
                  </p>
                </article>
              {/each}
            </div>
          </details>
        {/if}
        {#if module.warnings.length > 0 }
        <details class="bg-secondary rounded mb-3 [&_summary]:open:bg-warn [&_h4]:open:!text-secondary">
          <summary class="block cursor-pointer hover:bg-[rgba(var(--c-warn-rgb),0.2)] rounded px-3 py-2 transition-colors duration-300">
              <Heading rank={4} softBg={false}  class="!text-warn flex gap-3 items-center !mb-0">
                <Fa icon={faTriangleExclamation} color="currentColor" />
                Warnings ({module.warnings.length})
              </Heading>
            </summary>
            <div class="p-3 pb-1">
              {#each module.warnings as warning}
                <article class="bg-[rgba(var(--c-warn-rgb),0.1)] rounded p-2">
                  <p>{warning.message}</p>
                  <p class="text-error">
                    at
                    <button
                      class="font-semibold underline"
                      on:click={() => setCursorPosition(warning.span)}
                    >{`${warning.span.source} ${warning.span.start.line}:${warning.span.start.column}`}</button>  
                  </p>
                </article>
              {/each}
            </div>
          </details>
        {/if}
        <details class="bg-secondary rounded mb-3 [&_summary]:open:bg-accent" open>
          <summary class="block cursor-pointer hover:bg-[rgba(var(--c-accent-rgb),0.2)] rounded px-3 py-2 transition-colors duration-300">
            <Heading rank={4} softBg={false}  class="flex gap-3 items-center !mb-0">
              <Fa icon={faDiagramProject} color="currentColor" />
              Languages ({module.languages.size})
            </Heading>
          </summary>
          {#if module.languages.size > 0}
            <Tree languages={module.languages} activeLang={selectedMilestone?.language?.id} />
          {:else}
            <p class="mt-3">Use <InlineCode>lang</InlineCode> statements to define languages.</p>
          {/if}
        </details>
        <details class="bg-secondary rounded mb-3 [&_summary]:open:bg-accent w-full" open>
          <summary class="block cursor-pointer hover:bg-[rgba(var(--c-accent-rgb),0.2)] rounded px-3 py-2 transition-colors duration-300">
            <Heading rank={4} softBg={false}  class="flex gap-3 items-center !mb-0">
              <Fa icon={faBook} color="currentColor" />
              Dictionary
            </Heading>
          </summary>
          <div class="p-3">
            {#if module.milestones.length > 0}
              <label>
                <span class="text-lg font-semibold mr-2">Milestone:</span>
                <select bind:value={selectedMilestone} class="rounded bg-primary border border-border px-3 py-2 font-semibold">
                  {#each module.milestones as milestone}
                    <option value={milestone}>{milestone.language.name} @ {milestone.starts}</option>
                  {/each}
                </select>
              </label>
              {#if snapshot !== undefined}
                <div class="max-w-full w-full overflow-x-auto">
                  <table class="mt-2 w-full">
                    <thead>
                      <tr>
                        <th class="text-left bg-primary border border-alt px-4 py-1 rounded-tl">Gloss</th>
                        <th class="text-left bg-primary border border-alt px-4 py-1 rounded-tr">Transcription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each snapshot.words as word}
                        <tr>
                          <td class="border border-alt px-4 py-1">{word.gloss}</td>
                          <td class="border border-alt px-4 py-1">{word.render()}</td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
              {:else}
                <p>Select a milestone to generate a snapshot of your dictionary.</p>
              {/if}
            {:else}
              <p>Use the <InlineCode>@</InlineCode> statement to create milestones.</p>
            {/if}
          
          </div>
        </details>
      {/if}
    </div>
  </div>
</main>