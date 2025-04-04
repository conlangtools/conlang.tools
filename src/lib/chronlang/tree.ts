import { Module, type Language } from "@conlangtools/chronlang-engine"

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

function findAncestors(tree: Node, lang: Language, path: Language[] = []): Language[] | null {
  if (tree.language.id === lang.id) return [...path, lang]
  for (const child of tree.children) {
    const res = findAncestors(child, lang, [...path, tree.language])
    if (res !== null) return res
  }
  return null
}

type Milestone = Module['milestones'][number]
export function getTimeline(langs: Map<string, Language>, selectedLang: Language): Milestone[] {
  const trees = buildLanguageTrees(langs)
  for (const tree of trees) {
    const ancestors = findAncestors(tree, selectedLang)
    if (ancestors === null) continue
    return ancestors.flatMap(lang => lang.milestones)
  }

  return []
}
