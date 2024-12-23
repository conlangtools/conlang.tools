import { type Language } from "@conlangtools/chronlang-engine"

export type Node = {
  language: Language,
  children: Node[]
}

export function buildLanguageTrees(langs: Map<string, Language>): Node[] {
  const nodes = new Map<string, Node>()
  const roots: string[] = []

  for (const [id, language] of langs) {
    nodes.set(id, {
      language,
      children: []
    })
  }

  for (const language of langs.values()) {
    if (language.parent === null) {
      roots.push(language.id)
    } else {
      const current = nodes.get(language.id)!;
      const parent = nodes.get(language.parent.id)!; 
      parent.children.push(current);
    }
  }

  return roots.map(id => nodes.get(id)!)
}