<script lang="ts">
  import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"
	import FileTree from "./FileTree.svelte";
	import CodePane from "./CodePane.svelte";
	import { compileProject, files } from "$stores/sandbox";
	import { faBook, faCircleExclamation, faCode, faDiagramProject, faTableColumns, faXmark } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";
	import LanguagesPane from "./LanguagesPane.svelte";
	import { onMount, tick } from "svelte";
	import MilestoneSelector from "./MilestoneSelector.svelte";
	import ProblemsTool from "./ProblemsTool.svelte";
	import ProblemsPane from "./ProblemsPane.svelte";
	import DictionaryPane from "./DictionaryPane.svelte";
  import { module } from "$stores/sandbox"

  let editor: CodePane;
  let selectedModel: monaco.editor.ITextModel | null = null;
  let selection: monaco.Selection | null = null
  let activeTab: "code" | "languages" | "dictionary" | "problems" = "code"
  let split = false

  $: if (split && activeTab === "code") {
    activeTab = "languages"
  }

  onMount(() => {
    compileProject();
  })

  async function setActiveFile(path: string) {
    const { createModel, getModelByPath } = await import("$lib/monaco/model")
    const file = $files.find(file => file.path === path)
    if (file === undefined) {
      console.error(`No such sandbox file ${path}.`)
      return;
    }
    selectedModel?.dispose();
    getModelByPath(file.path)?.dispose();
    selectedModel = createModel(file.path, file.content)
    if (!split) activeTab = "code"
  }

  async function toggleSplit() {
    await setSplit(!split)
  }

  async function setSplit(newValue: boolean) {
    split = newValue
    await tick();
    editor.setSize();
  }

  async function handleCloseSplit() {
    activeTab = "code"
    await setSplit(false)
  }

  async function showProblems() {
    activeTab = "problems"
    await setSplit(true)
  }

  function handleChangeSelection(e: CustomEvent) {
    selection = e.detail.selection
  }

  async function handleJump(e: CustomEvent) {
    const span = e.detail.span;
    split = true
    await setActiveFile(span.source)
    await tick();
    editor.jumpToRange({
      startColumn: span.start.column,
      startLineNumber: span.start.line,
      endColumn: span.end.column,
      endLineNumber: span.end.line
    })
  }
</script>

<div class="grid grid-rows-[1fr_min-content] h-screen w-screen absolute top-0 pt-[68px]">
  <div class="grid grid-cols-[16rem_1fr]">
    <div class="flex flex-col bg-secondary rounded-tr-lg">
      <h2 class="font-black text-fg-emphasis text-2xl pt-4 pl-6 pb-0">Sandbox</h2>
      <FileTree on:fileSelected={e => setActiveFile(e.detail.path)} attached={activeTab === 'code' || split} />
      <div class="flex flex-col gap-2 pt-4 m-4 mb-2 min-h-64 border-border border-t">
        <div class="grid grid-cols-[1fr_min-content]">
          <button class="flex items-center gap-2 py-2 px-4 rounded-l-lg transition-colors hover:bg-highlight text-xl {activeTab === "code" || split ? "bg-border" : "bg-primary"}" on:click={handleCloseSplit}>
            <Fa icon={faCode} size="sm" class="mt-px" />
            Code
          </button>
          <button class="flex items-center py-2 px-4 rounded-r-lg transition-colors hover:bg-highlight text-xl border-l {split ? "bg-border border-primary" : "bg-primary border-border"}" on:click={toggleSplit}>
            <Fa icon={faTableColumns} size="sm" class="mt-px" />
          </button>
        </div>
        <button class="flex items-center gap-2 py-2 px-4 rounded-lg transition-colors hover:bg-highlight text-xl {activeTab === "languages" ? "bg-border" : "bg-primary"}" on:click={() => activeTab = "languages"}>
          <Fa icon={faDiagramProject} size="sm" class="mt-px" />
          Languages
        </button>
        <button class="flex items-center gap-2 py-2 px-4 rounded-lg transition-colors hover:bg-highlight text-xl {activeTab === "dictionary" ? "bg-border" : "bg-primary"}" on:click={() => activeTab = "dictionary"}>
          <Fa icon={faBook} size="sm" />
          Dictionary
        </button>
        <button class="flex items-center gap-2 py-2 px-4 rounded-lg transition-colors hover:bg-highlight text-xl mt-auto {activeTab === "problems" ? "bg-border" : "bg-primary"}" on:click={showProblems}>
          <Fa icon={faCircleExclamation} size="sm" />
          Problems
        </button>
      </div>
    </div>
    <div class="grid h-full max-h-full {split ? "grid-rows-[60%_minmax(0,40%)]" : ""}">
      {#if activeTab === "code" || split}
        {#if selectedModel !== null}
          <div class="h-full relative">
            <CodePane bind:this={editor} model={selectedModel} on:change={compileProject} on:changeSelection={handleChangeSelection} />
          </div>
        {/if}
      {/if}
      
      {#if activeTab !== "code"}
        <div class="bg-secondary min-h-0 max-h-full overflow-hidden">
          <div class="bg-primary h-full p-4 {split && "mt-2 mr-1 rounded-lg"} max-h-full relative">
            {#if split}
              <div class="flex justify-end w-full top-1 right-1 absolute z-10">
                <button on:click={handleCloseSplit} class="rounded-full flex justify-center w-6 items-center aspect-square transition-colors bg-transparent hover:bg-border">
                  <Fa icon={faXmark} />
                </button>
              </div>
            {/if}
            {#if $module === null}
              <p class="text-lg">No information to show.</p>
            {:else}
              {#if activeTab === "languages"}
                <LanguagesPane />
              {:else if activeTab === "problems"}
                <ProblemsPane on:jump={handleJump} />
              {:else if activeTab === "dictionary"}
                <DictionaryPane on:jump={handleJump} />
              {/if}
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="bg-secondary flex flex-nowrap justify-start items-center">
    <div class="ml-auto"></div>
    <ProblemsTool active={activeTab === "problems"} on:click={showProblems}/>
    <MilestoneSelector />
    <div class="w-12 text-center font-semibold text-sm">
      {#if selection !== null}
        {selection.getSelectionStart().lineNumber}:{selection.getSelectionStart().column}
      {/if}
    </div>
  </div>
</div>
