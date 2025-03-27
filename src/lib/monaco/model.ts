import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export function toUri(path: string): monaco.Uri {
  return monaco.Uri.parse(`lang:/${path}`)
}

export function createModel(path: string, content: string): monaco.editor.ITextModel {
  return monaco.editor.createModel(content, "chronlang", toUri(path));
}

export function modelExistsByPath(path: string): boolean {
  return getModelByPath(path) !== null
}

export function getModelByPath(path: string): monaco.editor.ITextModel | null {
  return monaco.editor.getModel(toUri(path))
}
