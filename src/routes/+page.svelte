<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
  import IpaBackground from '../lib/components/IPABackground.svelte';
	import Link from '$lib/components/controls/Link.svelte';
	import ScrollToContentButton from '$lib/components/controls/ScrollToContentButton.svelte';
	import SideBySide from '$lib/components/content/SideBySide.svelte';
	import Code from '$lib/components/content/Code.svelte';
	import Heading from '$lib/components/content/Heading.svelte';
	import P from '$lib/components/content/P.svelte';
	import InlineCode from '$lib/components/content/InlineCode.svelte';
</script>

<style>
  :global(.diachronic-demo) {
    --highlighted: 0;
    animation: rotating-highlight 10s infinite;
  }

  @keyframes rotating-highlight {
    0%, 16% { --highlighted: 0; --abra-changed: 0; --cadabra-changed: 0; --hocus-changed: 0; --pocus-changed: 0; }
    21%, 37% { --highlighted: 1; --abra-changed: 1; --cadabra-changed: 1; --hocus-changed: 0; --pocus-changed: 0; }
    42%, 58% { --highlighted: 2; --abra-changed: 2; --cadabra-changed: 2; --hocus-changed: 1; --pocus-changed: 1; }
    63%, 79% { --highlighted: 3; --abra-changed: 2; --cadabra-changed: 3; --hocus-changed: 2; --pocus-changed: 2; }
    84%, 100% { --highlighted: 4; --abra-changed: 2; --cadabra-changed: 4; --hocus-changed: 3; --pocus-changed: 3; }
  }

  @property --highlighted {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
  }

  @property --abra-changed {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
  }

  @property --cadabra-changed {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
  }

  @property --hocus-changed {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
  }

  @property --pocus-changed {
    syntax: '<number>';
    initial-value: 0;
    inherits: true;
  }
</style>

<NavBar />
<main class="w-full relative pb-16 sm:pb-32">
  <IpaBackground />
  <section class="flex justify-center sm:items-center w-full h-screen">
    <div class="pb-[8rem] px-4 pt-4 w-[min(72ch,100%)] max-w-full">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-black text-fg-emphasis mb-4 bg-soft-tight">
        conlang<span class="text-accent">.</span>tools
      </h1>
      <p class="text-xl sm:text-2xl bg-soft-tight">
        conlang.tools is a cohesive <Link external href="https://en.wikipedia.org/wiki/Constructed_language">conlanging</Link> toolset with a focus on naturalistic language creation and evolution.
      </p>
      <div class="mt-8 max-w-full text-lg bg-soft-tight">
        <p class="mb-4">The website is currently undergoing a facelift, and the engine itself is currently being re-written from scratch. For more information, or to find your old projects, head over to the <Link external href="https://old.conlang.tools/future">old site</Link>.</p>
        <p class="font-semibold">
          Don't forget to <Link external href="https://discord.gg/yc5E5qbk6S" class="!text-blurple">join the Discord server</Link> for development updates & support.
        </p>
      </div>
      <ScrollToContentButton hash="about" />
    </div>
  </section>
  <div id="about">
    <SideBySide>
      <div slot="left">
        <Heading rank={2}>Familiar Syntax</Heading>
        <P>Chronlang is a simple computer language that allows you to define sound changes in a syntax based on linguistic literature and familiar to users of other popular sound change appliers.</P>
      </div>
      <Code slot="right">
        <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ɒ</span> &gt; <span class="text-fg-emphasis">o</span></pre>
        <pre>  : <span class="text-fg-alt">/ɒ/ raises to /o/ unconditionally</span></pre>
        <pre> </pre>
        <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+alveolar+stop</span>] &gt; <span class="text-fg-emphasis">ɾ</span> / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
        <pre>  : <span class="text-fg-alt">alveolar stops lenite to flaps intervocalically</span></pre>
        <pre> </pre>
        <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] &gt; [<span class="text-success">+palatal</span>] / <span class="text-fg-emphasis">_</span>[<span class="text-analogue">V</span><span class="text-success">+high+front</span>]</pre>
        <pre>  : <span class="text-fg-alt">stops palatalize before high front vowels</span></pre>
      </Code>
    </SideBySide>
    <SideBySide class="sm:mt-28">
      <div slot="left">
        <Heading rank={2}>All-in-one</Heading>
        <P>Chronlang doesn't just do sound changes - you can use it to define and derive words and affixes to build up lexicons for entire language families.</P>
        <P class="mt-4">Build your proto-language's lexicon, then specify different sound changes for as many daughter languages as you like. Chronlang will generate the child-lang lexicons automatically.</P>
      </div>
      <Code slot="right">
        <pre><span class="text-accent">lang</span> <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Proto-Auzger-Morlan</span></pre>
        <pre><span class="text-accent">-</span> <span class="text-complement">hello</span> /<span class="text-fg-emphasis">gek</span>.<span class="text-fg-emphasis">wit</span>/ <span class="text-analogue">int</span>. <span class="text-fg-alt">A greeting said when meeting someone</span></pre>
        <pre> </pre>
        <pre><span class="text-accent">lang</span> <span class="text-analogue">Aur</span> &lt; <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Auriinaga</span></pre>
        <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">kw</span> &gt; <span class="text-fg-emphasis">p</span></pre>
        <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+alveolar+stop</span>] &gt; [<span class="text-success">+affricate</span>] / [<span class="text-analogue">V</span><span class="text-success">+palatal</span>]<span class="text-fg-emphasis">_</span><span class="text-complement">#</span> </pre>
        <pre>// (PAM /gek.wit/ -&gt; Aur /ge.pit͡s/) </pre>
        <pre> </pre>
        <pre><span class="text-accent">lang</span> <span class="text-analogue">Mor</span> &lt; <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Morlanii</span></pre>
        <pre><span class="text-accent">$</span> <span class="text-analogue">C</span> &gt; [<span class="text-error">-voiced</span>] / <span class="text-fg-emphasis">_</span><span class="text-complement">#</span></pre>
        <pre><span class="text-accent">$</span> <span class="text-analogue">V</span> &gt; [<span class="text-success">+round+long</span>] / <span class="text-fg-emphasis">w</span><span class="text-fg-emphasis">_</span></pre>
        <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">w</span> &gt; [] / <span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
        <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">k</span> &gt; <span class="text-fg-emphasis">h</span> / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
        <pre>// (PAM /gek.wit/ -&gt; Mor /ke.hy:t/)</pre>
      </Code>
    </SideBySide>
    <SideBySide class="sm:mt-36">
      <div slot="left">
        <Heading rank={2}>Diachronic</Heading>
        <P>Language evolution doesn't happen all at once. Chronlang is concerned with the way in which languages tend to change incrementally over time, so allows you to set timeline milestones and view your language's lexicon at any point in its history.</P>
      </div>
      <Code slot="right" class="flex diachronic-demo">
        <div class="relative mr-4">
          <pre><span class="text-accent">@</span> <span class="text-complement">100</span></pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] &gt; [<span class="text-error">-voiced</span>]</pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">200</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ə</span> &gt; <span class="text-fg-emphasis">ɪ</span> / <span class="text-fg-emphasis">k_</span></pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">500</span></pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] &gt; [<span class="text-success">+fricative</span>] / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">1250</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ə</span>[<span class="text-analogue">V</span><span class="text-cyan">:α</span>] &gt; [<span class="text-cyan">α</span><span class="text-success">+long</span>] </pre>
          <div class="bg-[rgba(var(--c-accent-rgb),0.2)] rounded h-[3.5rem] w-[calc(100%+1rem)] -m-2 absolute top-[calc((var(--highlighted)-1)*3.125rem)] opacity-[var(--highlighted)] left-0"></div>
        </div>
        <div class="border-l-4 border-l-[rgba(var(--c-accent-rgb),0.2)] border-dotted ps-3 text-fg-primary font-semibold text-lg">
          <div class="whitespace-nowrap overflow-hidden w-[12ch]">
            <div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/ab.rə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/a<span class="text-accent">p</span>.rə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/ap.rə/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[12ch]">
            <div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kə.da.brə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kə.<span class="text-accent">t</span>a.<span class="text-accent">p</span>rə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/k<span class="text-accent">ɪ</span>.ta.prə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kɪ.<span class="text-accent">θ</span>a.prə/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kɪ.θa.prə/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[12ch]">
            <div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.kəs/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.k<span class="text-accent">ɪ</span>s/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.<span class="text-accent">x</span>ɪs/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/h<span class="text-accent">ʊ:</span>.xɪs/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[12ch]">
            <div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.kəs/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.k<span class="text-accent">ɪ</span>s/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.<span class="text-accent">x</span>ɪs/</div><!--
         --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/p<span class="text-accent">ʊ:</span>.xɪs/</div>
          </div>
        </div>
      </Code>
    </SideBySide>
    <SideBySide class="sm:mt-32 sm:pb-32">
      <div slot="left">
        <Heading rank={2}>Customizable</Heading>
        <P>Chronlang provides sensible defaults for phoneme glyphs, features and categories, but sometimes assumptions just won't do, no matter how sensible.</P>
        <P class="pt-4">Use the <InlineCode>trait</InlineCode> and <InlineCode>class</InlineCode> keywords to define your own phonemes and their features to create the most alien of languages.</P>
      </div>
      <Code slot="right">
        <pre><span class="text-accent">trait</span> <span class="text-complement">Place</span> {'{'} <span class="text-pink">manual</span>, <span class="text-pink">bipedal</span>, <span class="text-pink">glandular</span> {'}'}</pre>
        <pre> </pre>
        <pre><span class="text-accent">trait</span> <span class="text-complement">Moisture</span> {'{'} <span class="text-pink">dry</span>, <span class="text-pink">moist</span>, <span class="text-pink">overmoist</span> {'}'}</pre>
        <pre> </pre>
        <pre><span class="text-accent">class</span> <span class="text-analogue">X</span> <span class="text-accent">encodes</span> (<span class="text-complement">Moisture</span> <span class="text-complement">Place</span>) {'{'}</pre>
        <pre>  <span class="text-fg-emphasis">☼</span> = <span class="text-pink">moist</span> <span class="text-pink">glandular</span>,</pre>
        <pre>  <span class="text-fg-emphasis">b</span> = <span class="text-pink">dry</span> <span class="text-pink">bipedal</span>,</pre>
        <pre>  <span class="text-fg-emphasis">б</span> = <span class="text-pink">moist</span> <span class="text-pink">bipedal</span>,</pre>
        <pre>  <span class="text-fg-emphasis">ϐ</span> = <span class="text-pink">overmoist</span> <span class="text-pink">bipedal</span>,</pre>
        <pre>  ...</pre>
        <pre>{'}'}</pre>
        <pre> </pre>
        <pre><span class="text-accent">-</span> <span class="text-complement">flimflark</span> /<span class="text-fg-emphasis">ϐ☼b</span>/</pre>
        <pre><span class="text-accent">$</span> [<span class="text-analogue">X</span><span class="text-success">+glandular</span>] &gt; [<span class="text-success">+dry</span>] / <span class="text-fg-emphasis">_#</span></pre>
      </Code>
    </SideBySide>
  </div>
</main>
