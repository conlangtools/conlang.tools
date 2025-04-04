<script lang="ts">
	import type { Language } from "@conlangtools/chronlang-engine";
  import type { Node } from "$lib/chronlang/tree";

  export let language: Language;
  export let children: Node[];
  export let activeLang: string | null;
  export let highlightedLangs: string[] = [];
</script>

<li class={$$props.class}>
  <div class:active={language.id === activeLang} class:highlighted={highlightedLangs.includes(language.id)}>
    <p class="font-semibold">{language.name}</p>
    <p class="font-mono text-fg-secondary text-sm">{language.id}</p>
  </div>
  {#if children.length > 0}
    <ul class:highlighted={highlightedLangs.includes(language.id)}>
      {#each children as child}
        <svelte:self language={child.language} children={child.children} {activeLang} {highlightedLangs} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  $line-width: 2px;

  ul {
    --line-color: var(--c-border);
    --line: #{$line-width} solid var(--line-color);

    position: relative;
    padding: 1em 0;
    white-space: nowrap;
    margin: 0 auto;
    text-align: center;

    &::after {
      content: '';
      display: table;
      clear: both;
    }

    &::before {
      content: '';
      position: absolute;
      top: $line-width;
      left: 50%;
      border-left: var(--line);
      width: 0;
      height: 1em;
    }
  }

  li {

    display: inline-block;
    vertical-align: top;
    text-align: center;
    list-style-type: none;
    position: relative;
    padding: 1em .5em 0 .5em;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: $line-width;
      right: 50%;
      border-top: var(--line);
      width: 50%;
      height: 1em;
    }

    &::after {
      right: auto;
      left: 50%;
      border-left: var(--line);
    }

    &:only-child {
      padding-top: 0;
      top: -#{$line-width};

      &::after,
      &::before {
        display: none;
      }
    }

    &:first-child::before,
    &:last-child::after {
      border: 0 none;
    }

    &:last-child::before{
      border-right: var(--line);
      border-radius: 0 5px 0 0;
    }

    &:first-child::after{
      border-radius: 5px 0 0 0;
    }

    &.root::before,
    &.root::after {
      display: none;
    }
  }

  div {
    border: #{$line-width} solid var(--line-color);
    padding: 0.5em 1em;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    color: var(--c-fg-primary);
    background-color: var(--c-primary);
    position: relative;
    top: $line-width;
    
    &.highlighted {
      --line-color: var(--c-fg-secondary);

      --tint: rgba(var(--c-fg-secondary-rgb), 0.1);
      background: var(--c-alt);
    }

    &.active {
      --line-color: var(--c-accent);
      color: var(--c-accent);
      font-weight: 600;

      background: rgba(var(--c-accent-rgb), 0.1);
    }
  }
</style>
