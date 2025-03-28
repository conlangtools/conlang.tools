import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"

export const xSampaMap = {
  "a": "a",
  "A": "ɑ",
  "b": "b",
  "b_d": "b̪",
  "b_<": "ɓ",
  "B": "β",
  "B\\": "ʙ",
  "B_o": "β̞",
  "c": "c",
  "C": "ç",
  "d": "d",
  "dz)": "d͡z",
  "dz\\)": "d͡ʑ",
  "dZ)": "d͡ʒ",
  "d'": "ɖ",
  "d_<": "ɗ",
  "D": "ð",
  "e": "e",
  "E": "ɛ",
  "f": "f",
  "F": "ɱ",
  "g": "ɡ",
  "gb)": "g͡b",
  "g_<": "ɠ",
  "G": "ɣ",
  "G\\": "ɢ",
  "G\\_<": "ʛ",
  "h": "h",
  "h\\": "ɦ",
  "H": "ɥ",
  "H\\": "ʜ",
  "i": "i",
  "i\\": "Ɨ",
  "I": "ɪ",
  "I\\": "ɪ¨",
  "j": "j",
  "j\\": "ʝ",
  "J": "ɲ",
  "J\\": "ɟ",
  "J\\_<": "ʄ",
  "k": "k",
  "kp)": "k͡p",
  "k_>": "kʼ",
  "K": "ɬ",
  "K'": "ɬ̢",
  "K\\": "ɮ",
  "l": "l",
  "l'": "ɭ",
  "l\\": "ɺ",
  "l\\`": "ɺ̢",
  "L": "ʎ",
  "L\\": "ʟ",
  "L_0_r": "ʎ̥˔",
  "L\\_0_r": "ʟ̝̊",
  "L_X": "ʎ̯",
  "L\\_X": "ʟ̆",
  "m": "m",
  "M": "ɯ",
  "M\\": "ɰ",
  "n": "n",
  "n'": "ɳ",
  "N": "ŋ",
  "Nm)": "ŋ͡m",
  "N\\": "ɴ",
  "o": "o",
  "O": "ɔ",
  "O\\": "ʘ",
  "p": "p",
  "p\\": "ɸ",
  "p_d": "p̪",
  "p_>": "pʼ",
  "P": "ʋ",
  "q": "q",
  "Q": "ɒ",
  "r": "r",
  "r'": "ɽ",
  "r'r)": "ɽ͡r",
  "r\\": "ɹ",
  "r\\'": "ɻ",
  "R": "ʁ",
  "R\\": "ʀ",
  "s": "s",
  "s'": "ʂ",
  "s\\": "ɕ",
  "s_>": "sʼ",
  "S": "ʃ",
  "t": "t",
  "ts)": "t͡s",
  "ts\\)": "t͡ɕ",
  "tK)": "t͡ɬ",
  "tS)": "t͡ʃ",
  "t'": "ʈ",
  "t_>": "tʼ",
  "T": "θ",
  "u": "u",
  "u\\": "ʉ",
  "U": "ʊ",
  "U\\": "ʊ¨",
  "v": "v",
  "v\\": "ʋ",
  "v_X": "v̆",
  "v_X_+": "v̟̆",
  "V": "ʌ",
  "w": "w",
  "W": "ʍ",
  "x": "x",
  "x\\": "ɧ",
  "X": "χ",
  "X\\": "ħ",
  "y": "y",
  "Y": "ʏ",
  "z": "z",
  "z'": "ʐ",
  "z\\": "ʑ",
  "Z": "ʒ",
  "1": "Ɨ",
  "2": "ø",
  "3": "ɜ",
  "3\\": "ɞ",
  "4": "ɾ",
  "5": "ɫ",
  "6": "ɐ",
  "7": "ɤ",
  "8": "ɵ",
  "9": "œ",
  "!\\":	"!",
  "&": "æ",
  "&\\": "ɶ",
  "<\\": "ʢ",
  "=\\": "ǂ",
  ">\\": "ʡ",
  ">\\:": "Я",
  ">\\_X": "ʡ̯",
  "?": "ʔ",
  "?\\": "ʕ",
  "@": "Ə",
  "@\\": "ɘ",
  "|\\": "ǀ",
  "|\\|\\": "ǁ",
} as const;

type XSampaSegment = keyof typeof xSampaMap;

type ConversionResult = {
  input: string
  output: string
  segments: { isXSampa: boolean; text: string }[]
  containsInvalidSegments: boolean
}

function matchXSampa(input: string): readonly [XSampaSegment | null, string] {
  let match: XSampaSegment | null = null;
  for (const seg of Object.keys(xSampaMap) as XSampaSegment[]) {
    if (!input.startsWith(seg)) continue;
    if (match === null || seg.length > match.length) {
      match = seg
    }
  }
  if (match !== null) return [match, input.slice(match.length)]
  return [null, input]
}

function convertToIPA(input: string): ConversionResult {
  const segments: ConversionResult["segments"] = []
  let rest = input;
  while (rest.length > 0) {
    let match, remaining;
    let i = -1;
    do {
      i += 1;
      [match, remaining] = matchXSampa(rest.slice(i))
    } while (match === null && remaining.length > 0);

    if (i > 0) {
      segments.push({
        isXSampa: false,
        text: rest.slice(0, i)
      })
    }

    if (match !== null) {
      segments.push({
        isXSampa: true,
        text: xSampaMap[match]
      })
    }

    rest = remaining;
  }
  
  return {
    input,
    output: segments.map(s => s.text).join(""),
    segments,
    containsInvalidSegments: segments.some(s => !s.isXSampa)
  };
}


let xSampaWidget: monaco.editor.IContentWidget | null = null;

function cancelXSampaWidget(editor: monaco.editor.ICodeEditor) {
  if (xSampaWidget !== null) {
    editor.removeContentWidget(xSampaWidget)
    const { position } = xSampaWidget.getPosition()!
    editor.setSelection({
      startColumn: position!.column,
      startLineNumber: position!.lineNumber,
      endColumn: position!.column,
      endLineNumber: position!.lineNumber,
    })
    editor.focus()
    xSampaWidget = null
  }
}

export default function applyXSampaExtension(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.addCommand(9 /* Escape */, ed => {
    cancelXSampaWidget(ed)
  })

  editor.addAction({
    id: "ct.action.summon-xsampa-widget",
    label: "Insert IPA with X-SAMPA",
    keybindings: [93 /* Backslash */],
    contextMenuGroupId: "navigation",
    run(ed) {
      if (xSampaWidget !== null) return;


      const wOutElement = document.createElement("output")
      wOutElement.className = "rounded bg-secondary text-accent font-normal font-mono absolute pt-[calc(1lh-2px)]"

      const wInElement = document.createElement("input")
      wInElement.type = "text"
      wInElement.className = "rounded bg-alt text-fg-primary font-semibold font-mono focus:outline-none w-[1ch] absolute -top-px"
      wInElement.addEventListener("blur", () => cancelXSampaWidget(ed))
      wInElement.addEventListener("input", () => {
        const res = convertToIPA(wInElement.value)
        wOutElement.innerHTML = res.segments.map(s => `<span class="whitespace-pre ${s.isXSampa ? "text-fg-secondary" : "text-error underline decoration-current"}">${s.text}</span>`).join("")
        wInElement.style.width = Math.max(1, wInElement.value.length) + "ch"
      })

      const widgetElement = document.createElement("form")
      widgetElement.className = ""
      widgetElement.appendChild(wOutElement)
      widgetElement.appendChild(wInElement)
      widgetElement.addEventListener("submit", evt => {
        evt.preventDefault();
        evt.stopPropagation();
        ed.removeContentWidget(xSampaWidget!)
        const { position } = xSampaWidget!.getPosition()!
        const range = {
          startColumn: position!.column,
          startLineNumber: position!.lineNumber,
          endColumn: position!.column,
          endLineNumber: position!.lineNumber,
        }
        const res = convertToIPA(wInElement.value)
        ed.executeEdits("ct.xsampa.widget", [{
          range,
          text: res.output,
          forceMoveMarkers: true,
        }])
        const column = range.startColumn + res.output!.length
        ed.setSelection({
          ...range,
          startColumn: column,
          endColumn: column,
        })
        ed.focus()
        xSampaWidget = null
      })

      xSampaWidget = {
        getId() {
          return "ct.xsampa.widget"
        },
        getDomNode() {
          return widgetElement;
        },
        getPosition() {
          return {
            position: {
              lineNumber: editor.getPosition()!.lineNumber,
              column: editor.getPosition()!.column
            },
            preference: [0 /* EXACT */]
          }
        },
        afterRender() {
          wInElement.focus();
        }
      }

      editor.addContentWidget(xSampaWidget)
    }
  })
}
