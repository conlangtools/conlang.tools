import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"
import compile from "$lib/chronlang/compile";

export default {
  getLegend() {
    return {
      tokenTypes: [
        "label"
      ],
      tokenModifiers: [
        "external",
        "internal"
      ]
    }
  },
  async provideDocumentSemanticTokens(model, _lastResultId, _token) {
    const content = model.getValue()
    const module = await compile(content, "")
    
    const data = module.getEntities().values().flatMap(_entity => [/* TODO: return a list of semantic tokens inside an entity */]);

    return {
			data: new Uint32Array(data),
			resultId: undefined,
		};
  },
  releaseDocumentSemanticTokens() {
    return;
  }
} satisfies monaco.languages.DocumentSemanticTokensProvider
