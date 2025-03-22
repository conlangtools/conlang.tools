<script lang="ts">
	import type { Module } from "@conlangtools/chronlang-engine";
	import { faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
	import Fa from "svelte-fa";

  export let active: boolean
  export let errors: Module['errors']
  export let warnings: Module['warnings']
</script>

<button class="font-semibold text-sm flex gap-3 items-stretch px-2 h-full {active ? "bg-primary" : "bg-secondary hover:bg-primary"}" on:click>
  <div class="flex gap-1 justify-center items-center {errors.length > 0 ? "text-fg-primary" : "text-fg-secondary"}">
    <Fa icon={faCircleXmark} class="{errors.length > 0 ? "text-error" : "text-fg-secondary"}" />
    {errors.length}
  </div>
  <div class="flex gap-1 justify-center items-center {warnings.length > 0 ? "text-fg-primary" : "text-fg-secondary"}">
    <Fa icon={faTriangleExclamation} class="{warnings.length > 0 ? "text-warn" : "text-fg-secondary"}" />
    {warnings.length}
  </div>
</button>
