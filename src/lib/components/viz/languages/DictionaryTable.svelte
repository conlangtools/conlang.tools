<script lang="ts">
	import type { Word } from "@conlangtools/chronlang-engine";
	import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
	import { createEventDispatcher } from "svelte";
	import Fa from "svelte-fa";

  export let words: Word[]
  
  let allPos: string[] = [];
  $: allPos = words
      .flatMap(w => w.definitions)
      .map(d => d.partOfSpeech)
      .filter((x, i, a) => x !== null && a.indexOf(x) === i)
      .toSorted() as string[]

  let expandedWords = new Set<Word>();

  $: {
    expandedWords.forEach(word => {
      if (!words.some(w => w.gloss === word.gloss))
        expandedWords.delete(word)
    })
    expandedWords = expandedWords
  }

  function toggleWord(word: Word) {
    if (expandedWords.has(word)) expandedWords.delete(word);
    else expandedWords.add(word);
    expandedWords = expandedWords
  }

  type Definition = Word['definitions'][number]

  function groupDefinitions(word: Word): Record<string, Definition[]> {
    return word.definitions.reduce((acc, cur) => {
        if (cur.partOfSpeech === null) {
          if (acc['$NOPOS'] === undefined) acc['$NOPOS'] = [cur]
          else acc['$NOPOS'].push(cur)
        }
        else if(acc[cur.partOfSpeech] === undefined) acc[cur.partOfSpeech] = [cur]
        else acc[cur.partOfSpeech].push(cur)

        return acc;
      },
      {} as Record<string, Definition[]>
    )
  }

  const colors = [
    "bg-[rgba(var(--c-accent-rgb),0.1)] text-[rgba(var(--c-accent-rgb),0.6)] border-[rgba(var(--c-accent-rgb),0.2)]",
    "bg-[rgba(var(--c-analogue-rgb),0.1)] text-[rgba(var(--c-analogue-rgb),0.6)] border-[rgba(var(--c-analogue-rgb),0.2)]",
    "bg-[rgba(var(--c-info-rgb),0.1)] text-[rgba(var(--c-info-rgb),0.6)] border-[rgba(var(--c-info-rgb),0.2)]"
  ]

  const dispatch = createEventDispatcher();
  
  function jumpToProblem(span: Word['definitionSite']) {
    dispatch("jump", { span })
  }
</script>

<div class="max-w-full w-full h-full overflow-y-scroll mt-2 border-t border-border">
  <table class="w-full border-separate border-spacing-0 border-border border">
    <thead>
      <tr>
        <th class="text-left bg-alt border-b border-border px-4 py-1 sticky top-0"></th>
        <th class="text-left bg-alt border-b border-l border-border px-4 py-1 sticky top-0">Transcription</th>
        <th class="text-left bg-alt border-b border-l border-border px-4 py-1 sticky top-0">Gloss</th>
        <th class="text-left bg-alt border-b border-l border-border px-4 py-1 sticky top-0">Part of Speech</th>
        <th class="text-left bg-alt border-b border-l border-border px-4 py-1 sticky top-0">Source</th>
      </tr>
    </thead>
    <tbody>
      {#each words as word}
        {@const span = word.definitionSite}
        {@const partsOfSpeech = word.definitions.map(d => d.partOfSpeech).filter((x, i, a) => a.indexOf(x) === i).toSorted()}
        {@const expanded = expandedWords.has(word)}
        <tr>
          <td class="border-b border-border px-1 bg-secondary w-0">
            <div class="flex items-center justify-center">
              <button on:click={() => toggleWord(word)} class="bg-accent text-primary w-full aspect-square rounded flex items-center justify-center">
                <Fa icon={expanded ? faChevronDown : faChevronRight} size="sm" />
              </button>
            </div>
          </td>
          <td class="border-b border-l border-border px-4 py-1 bg-secondary">{word.render()}</td>
          <td class="border-b border-l border-border px-4 py-1 bg-secondary">{word.gloss}</td>
          <td class="border-b border-l border-border px-4 py-1 bg-secondary">
            {#each partsOfSpeech as pos}
              {#if pos === null}
                <span class="text-fg-secondary">-</span>
              {:else}
                <span class="{colors[allPos.indexOf(pos) % colors.length]} font-semibold rounded px-1 mr-1 border">{pos}</span>
              {/if}
            {/each}
          </td>
          <td class="border-b border-l border-border px-4 py-1 bg-secondary">
            <button class="underline text-fg-secondary" on:click={() => jumpToProblem(span)}>
              {span.source}#{span.start.line}:{span.start.column}
            </button>
          </td>
        </tr>
        {#if expanded}
          {@const groups = Object.entries(groupDefinitions(word))}
          <tr>
            <td colspan={5}>
              <ul class="pb-2">
                {#each groups as [pos, defs]}
                  <li class="pt-2">
                    <ul class="ps-14 list-disc">
                      {#each defs as def}
                      <li>
                        <span class="font-semibold italic">{pos === "$NOPOS" ? "" : pos}.</span>
                        {def.text}
                      </li>
                    {/each}
                    </ul>
                  </li>
                {/each}
              </ul>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </table>
</div>
