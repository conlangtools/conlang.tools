<script lang="ts">
  import Fa from "svelte-fa";
	import { faCircleXmark, faFile, faFileCirclePlus, faFileExport, faTrashAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
	import { tick, createEventDispatcher, onMount } from "svelte";
  import { files, createFile } from "$stores/sandbox";
	import InlineCode from "../content/InlineCode.svelte";

  const dispatch = createEventDispatcher();

  export let attached: boolean;

  let activePath: string | null = null
  let isCreatingFile = false;
  let newFileName = "";
  let newFileInput: HTMLInputElement;
  let fileCreationError: string | null = null;
  let deleteDialog: HTMLDialogElement;
  let fileToDelete: string | null = null

  onMount(() => {
    if (activePath === null && $files.length > 0) {
      selectFile($files[0].path)
    }
  });

  function selectFile(path: string) {
    activePath = path;
    dispatch("fileSelected", { path })
  }

  async function startCreatingFile() {
    if (isCreatingFile && !(await addNewFile())) {
      fileCreationError = "Failed to create the text model."
      return;
    }
    isCreatingFile = true;
    newFileName = "new-file";
    let i = 2;
    while ($files.some(file => file.path === newFileName)) {
      newFileName = "new-file" + i++;
    }
    await tick();
    newFileInput.focus();
    newFileInput.select();
  }

  function cancelFileCreation() {
    isCreatingFile = false;
  }

  async function addNewFile(): Promise<boolean> {
    if ($files.some(file => file.path === newFileName)) {
      fileCreationError = "File already exists"
      return false;
    }
    if (/[^a-zA-Z0-9-]/.test(newFileName)) {
      fileCreationError = "File name may only contain a-z, A-Z, 0-9 and hyphen (-)."
      return false;
    }
    if (newFileName.startsWith("-") || newFileName.endsWith("-")) {
      fileCreationError = "File name may not begin or end with a hypen (-)."
      return false;
    }
    files.set([...$files, createFile({ path: newFileName, content: '', isModuleRoot: false })])
    isCreatingFile = false;
    fileCreationError = null;
    selectFile(newFileName)
    return true;
  }

  function startDeletingFile(path: string) {
    fileToDelete = path
    deleteDialog.showModal();
  }

  function cancelDelete() {
    fileToDelete = null
    deleteDialog.close()
  }

  function deleteFile() {
    files.set($files.filter(f => f.isModuleRoot || f.path !== fileToDelete))
    deleteDialog.close()
  }

  const beforeClass = "before:block before:absolute before:z-10 before:rounded-br-full before:w-[1rem] before:h-[1rem] before:-end-[0.5rem] before:-top-[0.5rem] before:border-e-[0.5rem] before:border-b-[0.5rem] before:border-e-primary before:border-b-primary"
  const afterClass = "after:block after:absolute after:z-10 after:rounded-tr-full after:w-[1rem] after:h-[1rem] after:-end-[0.5rem] after:-bottom-[0.5rem] after:border-e-[0.5rem] after:border-t-[0.5rem] after:border-e-primary after:border-t-primary"
  let activeClass: string;
  $: activeClass = attached ? `bg-primary ${beforeClass} ${afterClass}` : 'bg-primary'
</script>

<svelte:document on:keydown={e => e.key === "Escape" && cancelFileCreation()} />

<div class="{$$props.class ?? ""} bg-secondary h-full ps-8" style={$$props.style}>
  {#if $files.length > 0 || isCreatingFile}
    <div class="flex justify-end px-4">
      <button title="Add file" class="text-fg-secondary hover:text-fg-primary transition-colors" on:click={startCreatingFile}>
        <Fa icon={faFileCirclePlus} />
      </button>
    </div>
  {/if}
  {#if $files.length === 0 && !isCreatingFile}
    <div class="flex justify-center mt-3 pe-8">
      <button class="flex gap-2 items-center p-2 px-4 rounded bg-accent text-fg-emphasis font-black transition-colors hover:bg-accent-light" on:click={startCreatingFile}>
        <Fa icon={faFileCirclePlus} />
        Add File
      </button>
    </div>
  {/if}
  <ul class="mt-3">
    {#each $files as file}
      <li class="group mb-2 relative {attached ? "pe-4 rounded-s-lg" : "me-4 rounded-lg"} {file.path === activePath && activeClass}">
        <button class="flex gap-2 items-center rounded-lg p-2 px-4 transition-colors w-full {file.path === activePath || "hover:bg-highlight-secondary"}" on:click={() => selectFile(file.path)}>
          <Fa icon={file.isModuleRoot ? faFileExport : faFile} class="text-fg-secondary" />
          {file.path}
          {#if file.hasErrors || file.hasWarnings}
            <Fa icon={file.hasErrors ? faCircleXmark : faTriangleExclamation} class="mt-px ml-auto {file.hasErrors ? "text-error" : "text-warn"}" size="sm" />
          {/if}
        </button>
        {#if !file.isModuleRoot}
          <button class="absolute hidden group-hover:flex rounded p-1 right-6 top-2 w-6 items-center justify-center bg-red hover:brightness-110" on:click={() => startDeletingFile(file.path)}>
            <Fa icon={faTrashAlt} />
          </button>
        {/if}
      </li>
    {/each}
  </ul>
  {#if isCreatingFile}
    <form class="flex items-center gap-3 ps-4" on:submit|preventDefault={addNewFile}>
      <Fa icon={faFile} class="text-fg-secondary" />
      <input type="text" class="rounded bg-primary p-2 px-4 focus:outline-2 focus:outline focus:outline-accent border-2 border-transparent {fileCreationError && "border-red focus:outline-red"}" bind:value={newFileName} bind:this={newFileInput} on:focus={() => newFileInput.select()} on:blur={cancelFileCreation} />
    </form>
    {#if fileCreationError}
        <p class="ps-10 pe-5 pt-2 text-red text-sm">{fileCreationError}</p>
      {/if}
  {/if}
</div>

<dialog bind:this={deleteDialog} class="p-4 rounded-lg bg-primary border border-border text-fg-primary font-semibold backdrop:backdrop-blur">
  <p>Are you sure you want to delete <InlineCode>{fileToDelete}</InlineCode>?</p>
  <div class="flex items-center justify-end gap-2 mt-4">
    <button on:click={cancelDelete} class="bg-secondary rounded px-2 py-1 transition-colors hover:bg-alt">Cancel</button>
    <button on:click={deleteFile} class="bg-error rounded px-2 py-1 text-fg-emphasis transition-all hover:brightness-125">Delete</button>
  </div>
</dialog>
