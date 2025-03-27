import type * as monaco from "monaco-editor/esm/vs/editor/editor.api"
export default {
  brackets: [
    { open: '{', close: '}', token: 'delimiter' },
    { open: '[', close: ']', token: 'delimiter' },
    { open: '(', close: ')', token: 'delimiter' },
  ],
  includeLF: true,
  tokenizer: {
    root: [
      ["import", "keyword", "@import"],
      ["lang", "keyword", "@language"],
      [/@/, "keyword", "@milestone"],
      ["-", "keyword", "@word"],
      [/\$/, "keyword", "@soundChange"],
      ["trait", "keyword", "@trait"],
      ["class", "keyword", "@class"],
      ["series", "keyword", "@series"],
      [/\/\/[^\n\r]+/, "comment"],
      [/[.>/{}[\]()]/, "delimiter"],
    ],
    import: [
      ["from", "keyword", "@importPath"],
      [/\{/, "@brackets", "@importList"],
      [/\*/, "label.external"],
      ["\n", "", "@pop"]
    ],
    importList: [
      [/[^,}\s]+/, "label.external"],
      [/,/, "delimiter"],
      [/\}/, "@brackets", "@pop"],
    ],
    importPath: [
      [/((@[a-zA-Z0-9-]+)|\/)?(\.\.|\.|[A-Za-z0-9.-_]+)(\/(\.\.|\.|[A-Za-z0-9.-_]+))*/, "modulePath", "@pop"],
    ],
    language: [
      [/:/, "delimiter", "@description"],
      [/[a-zA-Z0-9]+/, "label"],
      [/</, "delimiter"],
      [/\n/, "", "@pop"]
    ],
    milestone: [
      [/[0-9]+/, "number"],
      [/[a-zA-Z0-9]+/, "label"],
      [/,/, "delimiter"],
      [/\n/, "", "@pop"]
    ],
    word: [
      [/\//, "delimiter", "@transcription"],
      [/[a-zA-Z0-9]+/, "label"],
      [/:/, "delimiter", "@description"],
      [/{/, "@brackets", "@wordDefs"],
      [/\n/, "", "@pop"]
    ],
    transcription: [
      [/[^/]+/, "transcription"],
      [/\//, "delimiter", "@pop"]
    ],
    wordDefs: [
      [/}/, "@brackets", "@pop"],
      [/[a-zA-Z0-9]+(?=\.)/, "partOfSpeech"],
      [/\./, "delimiter", "@description"],
    ],
    soundChange: [
      [/\[\]/, "delimiter"],
      [/\[/, "delimiter", "@category"],
      [/\n/, "", "@pop"],
      [/>/, "delimiter"],
      [/\//, "delimiter"],
      [/_/, "label"],
      [/#/, "keyword"],
      [/:/, "delimiter", "@description"],
      [/\S+/, "transcription"],
      [/\n/, "", "@pop"],
    ],
    category: [
      [/\]/, "delimiter", "@pop"],
      [/\+[a-zA-Z0-9]+/, "modifier.positive"],
      [/-[a-zA-Z0-9]+/, "modifier.negative"],
      [/[a-zA-Z0-9]+/, "label"]
    ],
    trait: [
      [/\{/, "@brackets", "@traitMembers"],
      [/[a-zA-Z0-9]+/, "label"],
      ["\n", "", "@pop"]
    ],
    traitMembers: [
      [/}/, "@brackets", "@pop"],
      [/[,\|]/, "delimiter"],
      [/[a-zA-Z0-9]+/, "trait.member"],
    ],
    class: [
      [/\n/, "", "@pop"],
      ["encodes", "keyword"],
      ["annotates", "keyword"],
      [/[a-zA-Z0-9]+/, "label"],
      [/\(/, "@brackets", "@traitListItem1"],
      [/\{/, "@brackets", "@classPhonemes"],
    ],
    traitListItem: [
      [/\)/, "@brackets", "@pop"]
    ],
    traitListItem1: [
      { include: "@traitListItem" },
      [/[a-zA-Z0-9]+/, { token: "trait.label.1", switchTo: "@traitListItem2" }],
    ],
    traitListItem2: [
      { include: "@traitListItem" },
      [/[a-zA-Z0-9]+/, { token: "trait.label.2", switchTo: "@traitListItem3" }],
    ],
    traitListItem3: [
      { include: "@traitListItem" },
      [/[a-zA-Z0-9]+/, { token: "trait.label.3", switchTo: "@traitListItem1" }],
    ],
    classPhonemes: [
      [/}/, "@brackets", "@pop"],
      [/[^=\s]+/, "transcription"],
      [/=/, { token: "delimiter", switchTo: "@classPhonemeTrait1" }],
    ],
    classPhonemeTrait: [
      [/,/, { token: "delimiter", switchTo: "@classPhonemes"}],
      [/}/, "@brackets", "@pop"]
    ],
    classPhonemeTrait1: [
      { include: "@classPhonemeTrait" },
      [/[a-zA-Z0-9]+/, { token: "trait.member.1", switchTo: "@classPhonemeTrait2" }],
    ],
    classPhonemeTrait2: [
      { include: "@classPhonemeTrait" },
      [/[a-zA-Z0-9]+/, { token: "trait.member.2", switchTo: "@classPhonemeTrait3" }],
    ],
    classPhonemeTrait3: [
      { include: "@classPhonemeTrait" },
      [/[a-zA-Z0-9]+/, { token: "trait.member.3", switchTo: "@classPhonemeTrait1" }],
    ],
    series: [
      [/[^=\s]+/, "label"],
      [/=/, "delimiter", "@seriesRHS"],
      [/\n/, "", "@pop"],
    ],
    seriesRHS: [
      [/\[/, { token: "@brackets", switchTo: "@category" }],
      [/\{/, { token: "@brackets", switchTo: "@seriesList" }]
    ],
    seriesList: [
      [/}/, "@brackets", "@pop"],
      [/,/, "delimiter"],
      [/[^\s,}]+/, "transcription"]
    ],
    description: [
      [/[^\n]+/, "description", "@pop"],
    ]
  }
} satisfies monaco.languages.IMonarchLanguage
