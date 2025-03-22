<script lang="ts">
  import Cookie from 'js-cookie'
  import Fa from 'svelte-fa';
  import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
  import { browser } from '$app/environment';
  import theme from '$stores/theme';

  function setTheme(nextTheme: string) {
    const app = document.querySelector('#app')
    if (app === null) return
    app.classList.remove(`theme-${$theme}`)
    app.classList.add(`theme-${nextTheme}`)
    localStorage.setItem('theme', nextTheme)
    Cookie.remove('theme')
    Cookie.set('theme', nextTheme, { expires: new Date(8640000000000000) })
    theme.set(nextTheme)
  }

  function onload (_: HTMLElement) {
    if (!browser) return
    const preferredTheme = localStorage.getItem('theme')
    if (!preferredTheme) return
    setTheme(preferredTheme)
  }
</script>

<div class="bg-alt p-2 pb-0 rounded relative user-select-none hidden sm:block" use:onload style="filter: drop-shadow(0 0 20px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary));">
  <div class="absolute top-0 w-1/2 h-full rounded bg-accent transition-all z-0" style='left: {$theme === 'light' ? '0' : '50%'}'></div>
  <button on:click={() => setTheme('light')} class="hover:brightness-125 transition duration-300 z-10 relative">
    <Fa icon={faSun} size="lg" color="currentColor" class="z-10" />
  </button>
  <button on:click={() => setTheme('dark')} class="ms-4 hover:brightness-125 transition duration-300 z-10 relative">
    <Fa icon={faMoon} size="lg" color="currentColor" class="z-10" />
  </button>
</div>
