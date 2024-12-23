import { compileModule, type Module, type ModuleResolver } from "@conlangtools/chronlang-engine"

type ResolutionResult =
| { ok: true; module: Module }
| { ok: false; error: string };

class Resolver implements ModuleResolver {
  constructor(
    private readonly sources: Map<string, string>,
  ) {}

  private resolve(sourceName: string): ResolutionResult {
    const source = this.sources.get(sourceName);

    if (source === undefined) {
      return {
        ok: false,
        error: `No source is defined with name '${sourceName}'`,
      };
    }

    return {
      ok: true,
      module: compileModule(source, sourceName, this),
    };
  }

  public resolveScoped(scope: string, path: string): ResolutionResult {
    return this.resolve(`@${scope}${path}`);
  }

  public resolveLocal(path: string, absolute: boolean): ResolutionResult {
    return this.resolve(absolute ? "/" : "" + path);
  }
}

const stdlib = new Map([
  ["@core/ipa", String.raw`
    trait Place { bilabial, labiodental, dental, alveolar, postalveolar, retroflex, palatal, velar, uvular, pharyngeal, glottal }
    trait Manner { plosive|stop, nasal, trill, tap|flap, affricate, fricative, lateralfricative, approximant, lateralapproximant }
    trait Voice { unvoiced|voiceless, voiced }

    class C encodes (Voice Place Manner) {
      p  = voiceless bilabial     plosive,
      b  = voiced    bilabial     plosive,
      t  = voiceless alveolar     plosive,
      d  = voiced    alveolar     plosive,
      ʈ  = voiceless retroflex    plosive,
      ɖ  = voiced    retroflex    plosive,
      c  = voiceless palatal      plosive,
      ɟ  = voiced    palatal      plosive,
      k  = voiceless velar        plosive,
      g  = voiced    velar        plosive,
      q  = voiceless uvular       plosive,
      m  = voiced    bilabial     nasal,
      ɱ  = voiced    labiodental  nasal,
      n  = voiced    alveolar     nasal,
      ɳ  = voiced    retroflex    nasal,
      ɲ  = voiced    palatal      nasal,
      ŋ  = voiced    velar        nasal,
      ɴ  = voiced    uvular       nasal,
      ʙ  = voiced    bilabial     trill,
      r  = voiced    alveolar     trill,
      ʀ  = voiced    uvular       trill,
      ⱱ  = voiced    labiodental  tap,
      ɾ  = voiced    alveolar     tap,
      ɽ  = voiced    retroflex    tap,
      t͡s = voiceless alveolar     affricate,
      d͡z = voiced    alveolar     affricate,
      t͡ʃ = voiceless postalveolar affricate,
      d͡ʒ = voiced    postalveolar affricate,
      ʈ͡ʂ = voiceless retroflex    affricate,
      ɖ͡ʐ = voiced    retroflex    affricate,
      ɸ  = voiceless bilabial     fricative,
      β  = voiced    bilabial     fricative,
      f  = voiceless labiodental  fricative,
      v  = voiced    labiodental  fricative,
      θ  = voiceless dental       fricative,
      ð  = voiced    dental       fricative,
      s  = voiceless alveolar     fricative,
      z  = voiced    alveolar     fricative,
      ʃ  = voiceless postalveolar fricative,
      ʒ  = voiced    postalveolar fricative,
      ʂ  = voiceless retroflex    fricative,
      ʐ  = voiced    retroflex    fricative,
      ç  = voiceless palatal      fricative,
      ʝ  = voiced    palatal      fricative,
      x  = voiceless velar        fricative,
      ɣ  = voiced    velar        fricative,
      χ  = voiceless uvular       fricative,
      ʁ  = voiced    uvular       fricative,
      ħ  = voiceless pharyngeal   fricative,
      ʕ  = voiced    pharyngeal   fricative,
      h  = voiceless glottal      fricative,
      ɦ  = voiced    glottal      fricative, 
      ɬ  = voiceless alveolar     lateralfricative,
      ɮ  = voiced    alveolar     lateralfricative,
      ʋ  = voiced    labiodental  approximant,
      ɹ  = voiced    alveolar     approximant,
      ɻ  = voiced    retroflex    approximant,
      j  = voiced    palatal      approximant,
      ɰ  = voiced    velar        approximant,
      l  = voiced    alveolar     lateralapproximant,
      ɭ  = voiced    retroflex    lateralapproximant,
      ʎ  = voiced    palatal      lateralapproximant,
      ʟ  = voiced    velar        lateralapproximant,
    }

    series F = [C+fricative]
    series L = { l, ɭ, ʎ, ʟ, ɬ, ɮ }
    series R = { r, ɾ, ɹ, ɻ, ʀ, ʁ, ɽ }

    trait Closeness { close, nearclose, closemid, mid, openmid, nearopen, open }
    trait Backness { front, nearfront, central, nearback, back }
    trait Roundness { unrounded, rounded }

    class V encodes (Closeness Backness Roundness) {
      i = close     front     unrounded,
      y = close     front     rounded,
      ɨ = close     central   unrounded,
      ʉ = close     central   rounded,
      ɯ = close     back      unrounded,
      u = close     back      rounded,
      ɪ = nearclose nearfront unrounded,
      ʏ = nearclose nearfront rounded,
      ʊ = nearclose nearback  rounded,
      e = closemid  front     unrounded,
      ø = closemid  front     rounded,
      ɘ = closemid  central   unrounded,
      ɵ = closemid  central   rounded,
      ɤ = closemid  back      unrounded,
      o = closemid  back      rounded,
      ə = mid       central   unrounded,
      ɛ = openmid   front     unrounded,
      œ = openmid   front     rounded,
      ɜ = openmid   central   unrounded,
      ɞ = openmid   central   rounded,
      ʌ = openmid   back      unrounded,
      ɔ = openmid   back      rounded,
      æ = nearopen  front     unrounded,
      ɐ = nearopen  central   unrounded,
      a = open      front     unrounded,
      ɶ = open      front     rounded,
      ɑ = open      back      unrounded,
      ɒ = open      back      rounded,
    }
  `]
])

export default async function compile(source: string, sourceName: string): Promise<Module> {
  return compileModule(source, sourceName, new Resolver(stdlib))
}