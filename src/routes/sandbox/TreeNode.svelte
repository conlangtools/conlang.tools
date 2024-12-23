<script lang="ts">
	import { type Language } from "@conlangtools/chronlang-engine";
  import { type Node } from "./tree";

  export let language: Language;
  export let children: Node[];
  export let activeLang: string;
</script>

<li class={$$props.class}>
  <span class:active={language.id === activeLang}>{language.name}</span>
  {#if children.length > 0}
    <ul>
      {#each children as child}
        <svelte:self language={child.language} children={child.children} {activeLang} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  $border-width: 2px;

  ul {
    --border: #{$border-width} solid var(--c-border);

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
      top: $border-width;
      left: 50%;
      border-left: $border-width solid var(--c-border);
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
      top: $border-width;
      right: 50%;
      border-top: var(--border);
      width: 50%;
      height: 1em;
    }

    &::after {
      right: auto;
      left: 50%;
      border-left: var(--border);
    }

    &:only-child {
      padding-top: 0;
      top: -#{$border-width};

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
      border-right: var(--border);
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

  span {
    border: var(--border);
    padding: 0.5em 1em;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    color: var(--c-fg-primary);
    background-color: var(--c-primary);
    position: relative;
    top: $border-width;

    &.active {
      border-color: var(--c-accent);
      color: var(--c-accent);
      font-weight: 600;
      --tint: rgba(var(--c-accent-rgb), 0.1);
      background: linear-gradient(var(--tint), var(--tint)),
                  linear-gradient(var(--c-primary), var(--c-primary));
    }
  }
</style>