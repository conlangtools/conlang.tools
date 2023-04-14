<script>
  import Fa from 'svelte-fa';
  import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

  import Logo from "./Logo.svelte";
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<style>
  .bg-radial {
    background-image: linear-gradient(180deg, rgba(var(--c-accent-rgb), 0.2) 0%, transparent 100%);
    background-position: top;
  }
</style>

<aside class="sm:fixed xs:bg-secondary w-full bg-radial z-50">
  <nav class="flex p-4 pe-6 items-center">
    <Logo class="w-8 xl:w-10" drop-shadow(0 0 10px var(--c-primary)) style="filter: drop-shadow(0 0 20px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary));" />
    <ul class="flex gap-8 ml-auto flex-initial items-center">
      <li>
        <ThemeSwitch />
      </li>
      <li>
        <a href="https://github.com/conlangtools" target="_blank" class="text-fg-secondary hover:text-fg-emphasis transition-colors duration-300 flex items-center gap-2" style="filter: drop-shadow(0 0 20px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary));">
          <Fa icon={faGithub} size="2x" color="currentColor" />
          code
        </a>
      </li>
      <li>
        <a href="https://discord.gg/yc5E5qbk6S" target="_blank" class="text-fg-secondary hover:text-blurple transition-colors duration-300 flex items-center gap-2" style="filter: drop-shadow(0 0 20px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary)) drop-shadow(0 0 10px var(--c-primary));">
          <Fa icon={faDiscord} size="2x" color="currentColor" />
          chat
        </a>
      </li>
    </ul>
  </nav>
</aside>
