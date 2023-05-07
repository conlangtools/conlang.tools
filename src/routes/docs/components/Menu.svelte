<script>
	import MenuHeading from "./MenuHeading.svelte";
	import MenuItem from "./MenuItem.svelte";

</script>
<aside>
  <ul class="mt-24 py-4 pl-8 min-w-[32ch]">
    <MenuHeading>Basics</MenuHeading>
    <li><MenuItem root>Introduction</MenuItem></li>
    <li><MenuItem name="getting-started">Getting Started</MenuItem></li>

    <MenuHeading>Features</MenuHeading>
    <li><MenuItem name="languages">Languages</MenuItem></li>
    <li><MenuItem name="words">Words</MenuItem></li>
    <li><MenuItem name="sound-changes">Sound Changes</MenuItem></li>
    <li><MenuItem name="milestones">Milestones</MenuItem></li>
    <li><MenuItem name="classes">Classes</MenuItem></li>
    
    <MenuHeading>Advanced</MenuHeading>
    <li><MenuItem name="imports">Imports</MenuItem></li>
  </ul>
</aside>