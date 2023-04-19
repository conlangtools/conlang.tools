<script lang="ts">
  import Fa from "svelte-fa";
  import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

  export let hash: string;

  let y: number;
  $: opacity = Math.max(0, 100 - (y / 150 * 100));
</script>

<svelte:window bind:scrollY={y} />

<div class="fixed bottom-12 left-0 right-0 sm:relative sm:bottom-0 grid justify-center {$$props.class}" style="opacity: {opacity}%;">
  <a href="#{hash}" class="inline-block aspect-square w-14 sm:w-10 rounded-full grid justify-center items-center bg-primary drop-shadow-[0_5px_10px_rgba(var(--c-accent-rgb),0.3)] hover:translate-y-1 hover:drop-shadow-[0_3px_3px_rgba(var(--c-accent-rgb),0.4)] transition-all">
    <Fa icon={faArrowDown} size="lg" color="var(--c-accent)"/>
  </a>
</div>
