<script lang="ts">
  import "../styles/global.scss"

  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div id="app" class="theme-{data.theme} bg-primary text-fg-primary">
  <slot />
</div>
