<script lang="ts">
  export let href: string;
  export let external = false;
</script>

<a {href} target={external ? '_blank' : undefined} class="text-accent underline hover:brightness-125 transition duration-300 {$$props.class}">
  <slot />
</a>
