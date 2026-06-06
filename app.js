const version = '0.0.0';
let editor;

let decorationMap = {};
const wwords = [
  'LEFT', 'RIGHT', 'TOP', 'BOTTOM',
  'x', 'y',
  'nearestFood'
]

require.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@latest/min/vs"
  }
});
let updateH = null;
require(["vs/editor/editor.main"], function () {
  monaco.languages.typescript.javascriptDefaults.setModeConfiguration({
        completionItems: false,
        hovers: false,
        documentSymbols: false,
        diagnostics: false
      });
  
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        noLib: true,
        allowNonTsExtensions: true
      });
  editor = monaco.editor.create(document.getElementById("editor-container"), {
    value: lastSaved,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    wordWrap: "on"
  });
  let dynamicSuggestions = [];
  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: (model, position) => {
  
      const word = model.getWordUntilPosition(position);
  
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
  
      return {
        suggestions: dynamicSuggestions.map(s => ({
          ...s,
          range
        }))
      };
    }
  });
  function setSuggestions(newList) {
    dynamicSuggestions = newList;
  }
  setSuggestions([
    {
    label: "x",
    kind: monaco.languages.CompletionItemKind.Variable,
    insertText: "x"
    },
    {
    label: "y",
    kind: monaco.languages.CompletionItemKind.Variable,
    insertText: "y"
    },
    {
    label: "nearestFood",
    kind: monaco.languages.CompletionItemKind.Variable,
    insertText: "nearestFood"
    },
    {
      label: "random",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "random(0, 10)",
      documentation: "Returns random integer between 0 and 10"
    }
  ]);
  
  let decorationIds = [];
  
  function highlightWords(editor, words) {
    const model = editor.getModel();
    if (!model) return;
  
    let decorations = [];
  
    for (const word of words) {
      const matches = model.findMatches(
        '\\b' + word + '\\b',
        true,
        true,
        true,   // case sensitive
        null,
        false
      );
  
      for (const m of matches) {
        decorations.push({
          range: m.range,
          options: {
            inlineClassName: decorationMap[word] || "hlDefault"
          }
        });
      }
    }
  
    decorationIds = editor.deltaDecorations(decorationIds, decorations);
  }
  
  let timeout;
  
  updateH = function () { highlightWords(editor, wwords) };
  
  editor.onDidChangeModelContent(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      highlightWords(editor, wwords);
      localStorage.setItem('lvl_1_edit', editor.getModel().getValue());
    }, 150);
  });
});

const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
const canvasContainer = document.getElementById('canvas-container');
ctx.fillRect(90, 10, 20, 20);

let game = null;
let fn = null;

function runGame() {
  const code = editor.getValue();
  const output = document.getElementById('result');
  fn = new Function(
    'LEFT',
    'RIGHT',
    'TOP',
    'BOTTOM',
    'x',
    'y',
    'nearestFood',
    `
      return ({
      LEFT=0,
      RIGHT=0,
      TOP=0,
      BOTTOM=0,
      x=null,
      y=null,
      nearestFood=null
      }) => {
    `
    +
    code
    +
    `
      }
    `
  )();
  game = new Game(10, 10);
}

function runStep() {
  if (game !== null && fn !== null) {
    args = {
      LEFT: 2,
      RIGHT: 0,
      TOP: 1,
      BOTTOM: 3,
      x: game.playerX,
      y: game.playerY,
      nearestFood: game.getNearestFood()
    }
    game.step(fn(args));
    game.draw(draw);
  }
}

const draw = new Draw(gameCanvas, ctx);
function resizeWindow() {
  draw.updateScale(canvasContainer);
}
window.addEventListener('resize', resizeWindow);
resizeWindow();

