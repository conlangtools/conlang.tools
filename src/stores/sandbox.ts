import { browser } from "$app/environment";
import compile, { SandboxResolver } from "$lib/chronlang/compile";
import { getTimeline } from "$lib/chronlang/tree";
import type { Module, Snapshot } from "@conlangtools/chronlang-engine";
import { get, readonly, writable } from "svelte/store";

export type SandboxFile = {
  path: string;
  content: string;
  isModuleRoot: boolean;
  hasErrors: boolean;
  hasWarnings: boolean;
}

export function createFile(data: Pick<SandboxFile, "path" | "content"> & Partial<SandboxFile>): SandboxFile {
  return {
    path: data.path,
    content: data.content,
    isModuleRoot: data.isModuleRoot ?? false,
    hasErrors: data.hasErrors ?? false,
    hasWarnings: data.hasWarnings ?? false,
  }
}

const LS_KEY = 'ct-sandbox-files';

const defaultFiles: SandboxFile[] = [
  createFile({
    isModuleRoot: true,
    path: 'module',
    content:
      "import { C, V } from @core/ipa\n" +
      "\n" +
      "lang TP: Toki Pona\n" +
      "lang DB < TP: Dutse Bon\n" +
      "\n" +
      "@ 0, TP\n" +
      "\n" +
      "- speech /toki/ {\n" +
      "    noun. speech, conversation, language\n" +
      "    adj. verbal, conversational\n" +
      "    verb. to speak, to talk, to use language, to think\n" +
      "}\n" +
      "\n" +
      "- good /pona/ {\n" +
      "    noun. good, simplicity\n" +
      "    adj. good, simple, friendly, peaceful\n" +
      "    verb. to improve, to fix\n" +
      "}\n" +
      "\n" +
      "- mushroom /soko/ {\n" +
      "    noun. mushroom, fungus\n" +
      "}\n" +
      "\n" +
      "@ 10, DB\n" +
      "\n" +
      "$ o > ʌ                         : /o/ becomes /ʌ/\n" +
      "$ [C+velar] > [+palatal] / _i   : velars are palatalised before /i/\n" +
      "$ [V-rounded] > ə               : unrounded vowels become ə word finally\n" +
      "\n" +
      "@ 20\n" +
      "\n" +
      "$ ə > e / [C+palatal]_              : ə becomes e after palatals\n" +
      "$ [C] > [+voiced] / #_              : consonants are voiced word initially\n" +
      "$ [V] > [+rounded] / [C+bilabial]_  : vowels are rounded following bilabials\n" +
      "\n" +
      "@ 30\n" +
      "\n" +
      "$ c > t͡s        : c lenites to t͡s\n" +
      "$ ə > [] / _#   : word-final schwa is lost\n"
  }),
]

export const files = writable<SandboxFile[]>(browser
  ? JSON.parse(localStorage.getItem(LS_KEY) ?? "null") ?? defaultFiles
  : []
)

if (browser) {
  files.subscribe((value) => localStorage.setItem(LS_KEY, JSON.stringify(value)))
}

export type Milestone = Module["milestones"][number]

const _module = writable<Module | null>(null);
export const module = readonly(_module);

type Selection = {
  milestone: Milestone | null,
  path: Milestone[]
}
const _milestoneSelection = writable<Selection>({
  milestone: null,
  path: []
});
export const milestoneSelection = readonly(_milestoneSelection)

const _snapshot = writable<Snapshot | null>(null);
export const snapshot = readonly(_snapshot);

export function setSelectedMilestone(milestone: Module['milestones'][number], shouldUpdatePath: boolean = false) {
  const mod = get(module)
  if (mod === null) return;

  const selection = get(milestoneSelection)
  const path = shouldUpdatePath
    ? getTimeline(mod.languages, milestone.language)
    : selection.path;

  _milestoneSelection.set({ milestone, path })
  _snapshot.set(mod.snapshot(milestone.language, milestone.starts + 0.0001));
}

export async function compileProject() {
  const $files = get(files)
  const root = $files.find(f => f.isModuleRoot);
  if (root === undefined) return;

  const mod = await compile(root.content, root.path, new SandboxResolver($files));
  _module.set(mod)
  
  const { milestone } = get(milestoneSelection)
  if (milestone === null) {
    if (mod.milestones.length > 0) setSelectedMilestone(mod.milestones.at(-1)!, true)
  } else if (!mod.hasMilestone(milestone)) {
    _milestoneSelection.set({
      milestone: null,
      path: []
    });
  }
  
  updateFileErrors()
}

function updateFileErrors() {
  const $files = get(files)
  const $module = get(module)

  if ($module === null) return;

  $files.forEach(file => {
    file.hasErrors = $module.errors.some(e => e.span.source === file.path);
    file.hasWarnings = $module.warnings.some(e => e.span.source === file.path)
  })

  for (const error of $module.errors) {
    const file = $files.find(f => f.path === error.span.source)
    if (file === undefined) continue;
    file.hasErrors = true;
  }
  
  for (const warning of $module.warnings) {
    const file = $files.find(f => f.path === warning.span.source)
    if (file === undefined) continue;
    file.hasWarnings = true;
  }

  files.set($files)
}
