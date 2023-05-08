<script>
	import Heading from "$lib/components/content/Heading.svelte";
	import P from "$lib/components/content/P.svelte";
	import Item from "$lib/components/content/list/Item.svelte";
	import List from "$lib/components/content/list/List.svelte";
	import IconButton from "$lib/components/controls/IconButton.svelte";
	import Link from "$lib/components/controls/Link.svelte";
	import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>
<Heading rank={1}>Introduction</Heading>
<P><Link href="https://conlang.tools">conlang.tools</Link> is home to a cohesive toolset for creating believable constructed languages.</P>
<P>Most of these tools are powered by Chronlang, a simple coding language that allows you to define sound changes using a syntax based on linguistic literature that should be familiar to conlangers and users of other popular sound change appliers.</P>

<Heading rank={2}>Getting Started</Heading>
<P>Start using the conlang workbench right away by following the quick-start guide.</P>
<IconButton href="/docs/getting-started" placement="right" icon={faArrowRight}>Get Started</IconButton>

<Heading rank={2}>Learn Chronlang</Heading>
<P>Delve deeper into the features and syntax of the Chronlang definition language with the following articles:</P>
<List>
	<Item>
		Fundamentals
		<List>
			<Item><Link href="/docs/languages">Languages & Language Families</Link></Item>
			<Item><Link href="/docs/words">Words</Link></Item>
			<Item><Link href="/docs/sound-changes">Sound Changes</Link></Item>
			<Item><Link href="/docs/milestones">Milestones</Link></Item>
		</List>
	</Item>
	<Item>
		Advanced
		<List>
			<Item><Link href="/docs/imports">Imports</Link></Item>
			<Item><Link href="/docs/traits">Traits</Link></Item>
			<Item><Link href="/docs/classes">Classes</Link></Item>
			<Item><Link href="/docs/series">Series</Link></Item>
		</List>
	</Item>
</List>
