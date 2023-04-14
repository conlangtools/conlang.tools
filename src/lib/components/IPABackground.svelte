<script lang="ts">
  let mouse = { x: 0, y: 0 };

  function handleMousemove(evt: MouseEvent) {
    mouse.x = evt.pageX - (document.body.offsetWidth);
    mouse.y = evt.pageY - (document.body.offsetHeight);
  }
</script>

<style lang="scss">
  .ipa {
    mask-image: url('/ipa-background.svg');
    mask-size: 360px 300px;
    background:
      radial-gradient(transparent 0%, var(--c-primary) 12%),
      linear-gradient(90deg, rgba(var(--c-accent-rgb), 0.2) 60%, rgba(var(--c-analogue-rgb), 0.2) 80%, rgba(var(--c-accent-rgb), 0.2) 100%),
      linear-gradient(180deg, rgba(var(--c-accent-rgb), 0.2) 60%, rgba(var(--c-analogue-rgb), 0.2) 80%, rgba(var(--c-accent-rgb), 0.2) 100%);
    background-size: 200% 200%, 100% 100vh, 100% 100vh;
    background-position: var(--bg-dots-pos-x) var(--bg-dots-pos-y), top left, top left;
    background-repeat: no-repeat, repeat, repeat;

    @media (max-width: 640px) {
      background: transparent;
    }
  }
</style>
  

<svelte:body on:mousemove={handleMousemove} />

<div class="ipa absolute w-full h-full top-0 left-0" style="--bg-dots-pos-x: {mouse.x}px; --bg-dots-pos-y: {mouse.y}px" />
