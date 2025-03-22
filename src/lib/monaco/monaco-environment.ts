import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"

export default {
  getWorker: function (_moduleId, label) {
    function getWorkerModule(moduleUrl: string, label: string) {
      if (self.MonacoEnvironment === undefined || self.MonacoEnvironment.getWorkerUrl === undefined)
        throw new Error("Invalid MonacoEnvironment.");

      return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl, label), {
        name: label,
        type: 'module'
      });
    };

    switch (label) {
      case 'json':
        return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
      case 'css':
      case 'scss':
      case 'less':
        return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
      case 'html':
      case 'handlebars':
      case 'razor':
        return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
      case 'typescript':
      case 'javascript':
        return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
      default:
        return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
    }
  },
} satisfies monaco.Environment;
