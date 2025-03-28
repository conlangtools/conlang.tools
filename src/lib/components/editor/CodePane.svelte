<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import theme from "$stores/theme";
	import themeDark from "../../monaco/theme-dark";
	import themeLight from "../../monaco/theme-light";
	import tokensProvider from "../../monaco/tokens-provider";
	import monacoEnvironment from "../../monaco/monaco-environment";
	import semanticTokensProvider from "../../monaco/semantic-tokens-provider";
  import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"
	import { browser } from "$app/environment";
  import { files } from "$stores/sandbox";
	import compile, { SandboxResolver } from "$lib/chronlang/compile";
	import applyXSampaExtension from "$lib/editor-extensions/xsampa";

  const dispatch = createEventDispatcher();

  export let model: monaco.editor.ITextModel;

  let editorDiv: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let Monaco: typeof import("monaco-editor");
  let pendingJump: monaco.IRange | null = null;

  $: if (browser && editor) editor.setModel(model);
  $: if (pendingJump !== null && editor !== undefined) jumpToRange(pendingJump)

  export function jumpToRange(range: monaco.IRange) {
    if (editor === undefined) {
      pendingJump = range
      return;
    }
    pendingJump = null;
    editor.revealRangeInCenter(range, 0)
    editor.setSelection(range)
    editor.focus()
  }

  export async function updateMarkers() {
    const module = await compile(model.getValue(), model.uri.path, new SandboxResolver($files))

    const errorMarkers = module.errors.map(err => ({
      message: err.message,
      severity: 8,
      startLineNumber: err.span.start.line,
      startColumn: err.span.start.column,
      endLineNumber: err.span.end.line,
      endColumn: err.span.end.column,
      source: err.span.source
    }))

    const warningMarkers = module.warnings.map(warn => ({
      message: warn.message,
      severity: 4,
      startLineNumber: warn.span.start.line,
      startColumn: warn.span.start.column,
      endLineNumber: warn.span.end.line,
      endColumn: warn.span.end.column,
      source: warn.span.source
    }))

    const markers = [...errorMarkers, ...warningMarkers]

    Monaco = await import("monaco-editor");
    Monaco.editor.setModelMarkers(model, "engine", markers)
  }

  onMount(async () => {
    self.MonacoEnvironment = monacoEnvironment;

    Monaco = await import("monaco-editor");
    
    Monaco.languages.register({ id: "chronlang" })
    Monaco.languages.setMonarchTokensProvider("chronlang", tokensProvider)
    Monaco.languages.registerDocumentSemanticTokensProvider("chronlang", semanticTokensProvider)

    Monaco.editor.defineTheme("ct-light", themeLight)
    Monaco.editor.defineTheme("ct-dark", themeDark)

    theme.subscribe((theme) => Monaco.editor.setTheme(theme === "light" ? "ct-light" : "ct-dark"))

    editor = Monaco.editor.create(editorDiv, {
      theme: $theme === "light" ? "ct-light" : "ct-dark",
      fontFamily: '"Noto Sans Mono", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      fontWeight: "600",
      fontSize: 16,
    });

    editor.onDidChangeModelContent(async () => {
      const model = editor.getModel();
      if (model === null) return;
      const path = model.uri.path.slice(1);
      const file = $files.find(file => file.path === path);
      if (file === undefined) return;
      const content = model.getValue();
      file.content = content;
      files.set($files);
      dispatch("change", { content });
      await updateMarkers();
    })

    editor.onDidChangeCursorSelection(({ selection }) => {
      dispatch("changeSelection", { selection })
    })

    applyXSampaExtension(editor)

    editor.setModel(model)

    setSize();
    updateMarkers();

    return () => {
      editor.dispose();
    };
  });

  export function setSize() {
    if (editorDiv?.parentElement === null) return;
    const rect = editorDiv.parentElement.getBoundingClientRect();
    editor.layout({ width: rect.width, height: rect.height });
  }
</script>

<svelte:window
  on:resize={() => {
    editor.layout({ width: 0, height: 0 });
    window.requestAnimationFrame(() => {
      setSize();
    });
  }}
/>

<style>
  :global(.mtkb) {
    font-weight: 800;
  }

  :global(.scroll-decoration) {
    height: 12px !important;
    box-shadow: var(--vscode-scrollbar-shadow) 0 12px 12px -6px inset !important;
  }

  :global(.theme-light .scroll-decoration) {
    height: 12px !important;
    box-shadow: var(--vscode-scrollbar-shadow) 0 12px 12px -6px inset !important;
  }
</style>

<div bind:this={editorDiv} class="absolute" />
