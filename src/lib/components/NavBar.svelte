<script>
  import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

  import Logo from "./Logo.svelte";
	import ThemeSwitch from './controls/ThemeSwitch.svelte';
	import IconButton from './controls/IconButton.svelte';
</script>

<style>
  .bg-radial {
    background-image: linear-gradient(180deg, rgba(var(--c-accent-rgb), 0.2) 0%, transparent 100%);
    background-position: top;
  }
</style>

<aside class="sm:fixed xs:bg-secondary w-full bg-radial z-50">
  <nav class="flex p-4 pe-6 items-center">
    <Logo />
    <ul class="flex gap-8 ml-auto flex-initial items-center">
      <li>
        <ThemeSwitch />
      </li>
      <li>
        <IconButton icon={faGithub} external href="https://github.com/conlangtools">
          code
        </IconButton>
      </li>
      <li>
        <IconButton icon={faDiscord} external href="https://discord.gg/yc5E5qbk6S" class="hover:!text-blurple">
          chat
        </IconButton>
      </li>
    </ul>
  </nav>
</aside>
