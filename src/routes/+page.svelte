<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Fa from 'svelte-fa';
  import IpaBackground from '../lib/components/IPABackground.svelte';
	import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
</script>

<style>
  .soft-backdrop {
    filter:
      drop-shadow(0 0 5px var(--c-primary))
      drop-shadow(0 0 5px var(--c-primary))
      drop-shadow(0 0 5px var(--c-primary))
      drop-shadow(0 0 5px var(--c-primary))
      drop-shadow(0 0 5px var(--c-primary));
  }

  #code-diachronic {
    --highlighted: 0;
    animation: code-diachronic--rotate-highlight 10s infinite;
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

  @keyframes code-diachronic--rotate-highlight {
    0%, 16% { --highlighted: 0; --abra-changed: 0; --cadabra-changed: 0; --hocus-changed: 0; --pocus-changed: 0; }
    21%, 37% { --highlighted: 1; --abra-changed: 1; --cadabra-changed: 1; --hocus-changed: 0; --pocus-changed: 0; }
    42%, 58% { --highlighted: 2; --abra-changed: 2; --cadabra-changed: 2; --hocus-changed: 1; --pocus-changed: 1; }
    63%, 79% { --highlighted: 3; --abra-changed: 2; --cadabra-changed: 3; --hocus-changed: 2; --pocus-changed: 2; }
    84%, 100% { --highlighted: 4; --abra-changed: 2; --cadabra-changed: 4; --hocus-changed: 3; --pocus-changed: 3; }
  }
</style>

<NavBar />
<main class="w-full relative pb-16 sm:pb-32">
  <IpaBackground />
  <section class="flex justify-center items-center w-full h-screen">
    <div class="pb-[8rem] px-4 pt-4 w-[min(72ch,100%)] max-w-full">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-black text-fg-emphasis mb-4 soft-backdrop">
        conlang<span class="text-accent">.</span>tools
      </h1>
      <p class="text-xl sm:text-2xl soft-backdrop">
        conlang.tools is a cohesive <a href="https://en.wikipedia.org/wiki/Constructed_language" target="_blank" class="text-accent underline hover:brightness-125 transition duration-300">conlanging</a> toolset with a focus on naturalistic language creation and evolution.
      </p>
      <div class="mt-8 max-w-full text-lg soft-backdrop">
        <p class="mb-4">The website is currently undergoing a facelift, and the engine itself is currently being re-written from scratch. For more information, or to find your old projects, head over to the <a href="https://old.conlang.tools/future" class="text-accent underline hover:brightness-125 transition duration-300">old site</a>.</p>
        <p class="font-semibold">
          Don't forget to <a href="https://en.wikipedia.org/wiki/Constructed_language" target="_blank" class="underline text-blurple hover:brightness-125 transition duration-300">join the Discord server</a> for development updates & support.
        </p>
      </div>
      <div class="grid justify-center pt-32 sm:pt-8">
        <a href="#about" class="inline-block aspect-square w-14 sm:w-10 rounded-full grid justify-center items-center bg-primary drop-shadow-[0_5px_10px_rgba(var(--c-accent-rgb),0.3)] hover:translate-y-1 hover:drop-shadow-[0_3px_3px_rgba(var(--c-accent-rgb),0.4)] transition-all">
          <Fa icon={faArrowDown} size="lg" color="var(--c-accent)"/>
        </a>
      </div>
    </div>
  </section>
  <section class="sm:flex justify-center items-center w-full py-8 relative" id="about">
    <div class="px-4">
      <div class="sm:w-[45%] sm:text-right">
        <h2 class="text-4xl font-black text-fg-emphasis mb-2 soft-backdrop">Familiar Syntax</h2>
        <p class="text-lg md:max-w-[120ch] soft-backdrop">Chronlang is a simple computer language that allows you to define sound changes in a syntax based on linguistic literature and familiar to users of other popular sound change appliers.</p>
      </div>
      <aside class="sm:absolute sm:left-1/2 sm:top-8 sm:max-w-[50%] max-w-full overflow-x-auto mt-2 p-4 bg-[rgba(var(--c-primary-rgb),0.3)] backdrop-blur-[3px] shadow-[0_12px_50px_-12px_rgba(var(--c-accent-rgb),0.3)] rounded">
        <code class="font-semibold text-fg-secondary">
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ɒ</span> -&gt; <span class="text-fg-emphasis">o</span></pre>
          <pre>  : <span class="text-fg-alt">/ɒ/ raises to /o/ unconditionally</span></pre>
          <pre> </pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+alveolar+stop</span>] -&gt; <span class="text-fg-emphasis">ɾ</span> / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
          <pre>  : <span class="text-fg-alt">alveolar stops lenite to flaps intervocalically</span></pre>
          <pre> </pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] -&gt; [<span class="text-success">+palatal</span>] / <span class="text-fg-emphasis">_</span>[<span class="text-analogue">V</span><span class="text-success">+high+front</span>]</pre>
          <pre>  : <span class="text-fg-alt">stops palatalize before high front vowels</span></pre>
        </code>
      </aside>
    </div>
  </section>
  <section class="sm:flex justify-center items-center w-full py-8 relative sm:mt-32">
    <div class="px-4">
      <div class="sm:w-[45%] sm:text-right">
        <h2 class="text-4xl font-black text-fg-emphasis mb-2 soft-backdrop">All-in-one</h2>
        <p class="text-lg md:max-w-[120ch] soft-backdrop">Chronlang doesn't just do sound changes - you can use it to define and derive words and affixes to build up lexicons for entire language families. </p>
        <p class="text-lg md:max-w-[120ch] pt-4 soft-backdrop">Build your proto-language's lexicon, then specify different sound changes for as many daughter languages as you like. Chronlang will generate the child-lang lexicons automatically.</p>
      </div>
      <aside class="sm:absolute sm:left-1/2 sm:top-8 sm:max-w-[50%] max-w-full overflow-x-auto mt-2 p-4 bg-[rgba(var(--c-primary-rgb),0.3)] backdrop-blur-[3px] shadow-[0_12px_50px_-12px_rgba(var(--c-accent-rgb),0.3)] rounded">
        <code class="font-semibold text-fg-secondary">
          <pre><span class="text-accent">lang</span> <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Proto-Auzger-Morlan</span></pre>
          <pre><span class="text-accent">-</span> <span class="text-complement">hello</span> /<span class="text-fg-emphasis">gek</span>.<span class="text-fg-emphasis">wit</span>/ <span class="text-analogue">int</span>. <span class="text-fg-alt">A greeting said when meeting someone</span></pre>
          <pre> </pre>
          <pre><span class="text-accent">lang</span> <span class="text-analogue">Aur</span> &lt;- <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Auriinaga</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">kw</span> -&gt; <span class="text-fg-emphasis">p</span></pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+alveolar+stop</span>] -&gt; [<span class="text-success">+affricate</span>] / [<span class="text-analogue">V</span><span class="text-success">+palatal</span>]<span class="text-fg-emphasis">_</span><span class="text-complement">#</span> </pre>
          <pre>// (PAM /gek.wit/ -&gt; Aur /ge.pit͡s/) </pre>
          <pre> </pre>
          <pre><span class="text-accent">lang</span> <span class="text-analogue">Mor</span> &lt;- <span class="text-analogue">PAM</span>: <span class="text-fg-alt">Morlanii</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-analogue">C</span> -&gt; [<span class="text-error">-voiced</span>] / <span class="text-fg-emphasis">_</span><span class="text-complement">#</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-analogue">V</span> -&gt; [<span class="text-success">+round+long</span>] / <span class="text-fg-emphasis">w</span><span class="text-fg-emphasis">_</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">w</span> -&gt; [] / <span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">k</span> -&gt; <span class="text-fg-emphasis">h</span> / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
          <pre>// (PAM /gek.wit/ -&gt; Mor /ke.hy:t/)</pre>
        </code>
      </aside>
    </div>
  </section>
  <section class="sm:flex justify-center items-center w-full py-8 relative sm:mt-32">
    <div class="px-4 pt-4">
      <div class="sm:w-[45%] sm:text-right">
        <h2 class="text-4xl font-black text-fg-emphasis mb-2 soft-backdrop">Diachronic</h2>
        <p class="text-lg md:max-w-[120ch] soft-backdrop">Language evolution doesn't happen all at once. Chronlang is concerned with the way in which languages tend to change incrementally over time, so allows you to set timeline milestones and view your language's lexicon at any point in its history.</p>
      </div>
      <aside class="sm:absolute sm:left-1/2 sm:top-8 sm:max-w-[50%] max-w-full overflow-x-auto mt-6 p-4 bg-[rgba(var(--c-primary-rgb),0.3)] backdrop-blur-[3px] shadow-[0_12px_50px_-12px_rgba(var(--c-accent-rgb),0.3)] rounded flex gap-6" id="code-diachronic">
        <code class="font-semibold text-fg-secondary relative">
          <pre><span class="text-accent">@</span> <span class="text-complement">100</span></pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] -&gt; [<span class="text-error">-voiced</span>]</pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">200</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ə</span> -&gt; <span class="text-fg-emphasis">ɪ</span> / <span class="text-fg-emphasis">k_</span></pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">500</span></pre>
          <pre><span class="text-accent">$</span> [<span class="text-analogue">C</span><span class="text-success">+stop</span>] -&gt; [<span class="text-success">+fricative</span>] / <span class="text-analogue">V</span><span class="text-fg-emphasis">_</span><span class="text-analogue">V</span></pre>
          <pre><span class="text-accent">@</span> <span class="text-complement">1250</span></pre>
          <pre><span class="text-accent">$</span> <span class="text-fg-emphasis">ə</span>[<span class="text-analogue">V</span><span class="text-cyan">:α</span>] -&gt; [<span class="text-cyan">α</span><span class="text-success">+long</span>] </pre>
          <div class="bg-[rgba(var(--c-accent-rgb),0.2)] rounded h-[3.5rem] w-[calc(100%+1rem)] -m-2 absolute top-[calc((var(--highlighted)-1)*3.125rem)] opacity-[var(--highlighted)] left-0"></div>
        </code>
        <div class="border-l-4 border-l-[rgba(var(--c-accent-rgb),0.2)] border-dotted ps-3 font-semibold text-lg">
          <div class="whitespace-nowrap overflow-hidden w-[10ch]">
               <div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/ab.rə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/a<span class="text-accent">p</span>.rə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--abra-changed)*-100%)]">/ap.rə/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[10ch]">
               <div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kə.da.brə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kə.<span class="text-accent">t</span>a.<span class="text-accent">p</span>rə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/k<span class="text-accent">ɪ</span>.ta.prə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kɪ.<span class="text-accent">θ</span>a.prə/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--cadabra-changed)*-100%)]">/kɪ.θa.prə/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[10ch]">
               <div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.kəs/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.k<span class="text-accent">ɪ</span>s/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/həʊ.<span class="text-accent">x</span>ɪs/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--hocus-changed)*-100%)]">/h<span class="text-accent">ʊ:</span>.xɪs/</div>
          </div>
          <div class="whitespace-nowrap overflow-hidden w-[10ch]">
               <div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.kəs/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.k<span class="text-accent">ɪ</span>s/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/pəʊ.<span class="text-accent">x</span>ɪs/</div><!--
            --><div class="inline-block w-full translate-x-[calc(var(--pocus-changed)*-100%)]">/p<span class="text-accent">ʊ:</span>.xɪs/</div>
          </div>
        </div>
      </aside>
    </div>
  </section>
  <section class="sm:flex justify-center items-center w-full py-8 relative sm:mt-20">
    <div class="px-4">
      <div class="sm:w-[45%] sm:text-right">
        <h2 class="text-4xl font-black text-fg-emphasis mb-2 soft-backdrop">Customizable</h2>
        <p class="text-lg md:max-w-[120ch] soft-backdrop">Chronlang provides sensible defaults for phoneme glyphs, features and categories, but sometimes assumptions just won't do, no matter how sensible.</p>
        <p class="text-lg md:max-w-[120ch] pt-4 soft-backdrop">Use the <code class="tracking-tighter bg-secondary rounded-sm border border-border px-1">trait</code> and <code class="tracking-tighter bg-secondary rounded-sm border border-border px-1">class</code> keywords to define your own phonemes and their features to create the most alien of languages.</p>
      </div>
      <aside class="sm:absolute sm:left-1/2 sm:top-8 sm:max-w-[50%] max-w-full overflow-x-auto mt-2 p-4 bg-[rgba(var(--c-primary-rgb),0.3)] backdrop-blur-[3px] shadow-[0_12px_50px_-12px_rgba(var(--c-accent-rgb),0.3)] rounded">
        <code class="font-semibold text-fg-secondary">
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
          <pre><span class="text-accent">$</span> [<span class="text-analogue">X</span><span class="text-success">+glandular</span>] -&gt; [<span class="text-success">+dry</span>] / <span class="text-fg-emphasis">_#</span></pre>
        </code>
      </aside>
    </div>
  </section>
</main>
