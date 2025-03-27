import { browser } from "$app/environment";
import { writable } from "svelte/store";

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
