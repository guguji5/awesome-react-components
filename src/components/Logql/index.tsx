// https://github.com/grafana/grafana/blob/main/public/app/plugins/datasource/loki/components/monaco-query-field/MonacoQueryField.tsx
// 做了部分裁剪，因为我们没有lebel value的suggestion，部分documentation也依赖过深

import React, { useRef, useEffect } from 'react';
import { css } from '@emotion/css';
import Editor, { loader } from '@monaco-editor/react';
import { languageConfiguration, monarchlanguage } from '@grafana/monaco-logql';
const EDITOR_HEIGHT_OFFSET = 2;
import { v4 as uuidv4 } from 'uuid';
import { getOverrideServices } from './getOverrideServices';
import { CompletionDataProvider } from './monaco-completion-provider/CompletionDataProvider';
import { getCompletionProvider, getSuggestOptions } from './monaco-completion-provider/completionUtils';
// 因为我用vite，所以有下边这些代码，如果是webpack是其他的方法，具体见：https://www.npmjs.com/package/@monaco-editor/react
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};
loader.config({ monaco });
const LANG_ID = 'logql';
let LANGUAGE_SETUP_STARTED = false;

function ensureLogQL(monaco) {
  if (LANGUAGE_SETUP_STARTED === false) {
    LANGUAGE_SETUP_STARTED = true;
    monaco.languages.register({ id: LANG_ID });

    monaco.languages.setMonarchTokensProvider(LANG_ID, monarchlanguage);
    monaco.languages.setLanguageConfiguration(LANG_ID, {
      ...languageConfiguration,
      wordPattern: /(-?\d*\.\d\w*)|([^`~!#%^&*()+\[{\]}\\|;:',.<>\/?\s]+)/g,
      // Default:  /(-?\d*\.\d\w*)|([^`~!#%^&*()\-=+\[{\]}\\|;:'",.<>\/?\s]+)/g
      // Removed `"`, `=`, and `-`, from the exclusion list, so now the completion provider can decide to overwrite any matching words, or just insert text at the cursor
    });
  }
}

const options = {
  codeLens: false,
  contextmenu: false,
  // we need `fixedOverflowWidgets` because otherwise in grafana-dashboards
  // the popup is clipped by the panel-visualizations.
  fixedOverflowWidgets: true,
  folding: false,
  fontSize: 12,
  lineDecorationsWidth: 8, // used as "padding-left"
  lineNumbers: 'off',
  minimap: { enabled: false },
  overviewRulerBorder: false,
  overviewRulerLanes: 0,
  padding: {
    // these numbers were picked so that visually this matches the previous version
    // of the query-editor the best
    top: 4,
    bottom: 5,
  },
  renderLineHighlight: 'none',
  scrollbar: {
    vertical: 'hidden',
    verticalScrollbarSize: 8, // used as "padding-right"
    horizontal: 'hidden',
    horizontalScrollbarSize: 0,
    alwaysConsumeMouseWheel: false,
  },
  scrollBeyondLastLine: false,
  suggest: { showWords: false },
  suggestFontSize: 12,
  wordWrap: 'on',
};

const setPlaceholder = (monaco, editor, placeholder) => {
  const placeholderDecorators = [
    {
      range: new monaco.Range(1, 1, 1, 1),
      options: {
        className: css`
          ::after {
            content: '${placeholder}';
            opacity: 0.3;
            font-size: 12px;
          }
        `,
        isWholeLine: true,
      },
    },
  ];

  let decorators: string[] = [];

  const checkDecorators: () => void = () => {
    const model = editor.getModel();

    if (!model) {
      return;
    }

    const newDecorators = model.getValueLength() === 0 ? placeholderDecorators : [];
    decorators = model.deltaDecorations(decorators, newDecorators);
  };

  checkDecorators();
  editor.onDidChangeModelContent(checkDecorators);
};

export default function lokiInput({
  isDark,
  value,
  onChange,
  placeholder = 'Enter a Loki query. Press Enter for newlines',
}: {
  isDark?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readonly?: boolean;
}) {
  const overrideServicesRef = useRef(getOverrideServices());
  const id = uuidv4();
  const editorRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteCleanupCallback = useRef<(() => void) | null>(null);
  useEffect(() => {
    loader.init();
    // when we unmount, we unregister the autocomplete-function, if it was registered
    return () => {
      autocompleteCleanupCallback.current?.();
    };
  }, []);
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const isEditorFocused = editor.createContextKey('isEditorFocused' + id, false);
    editor.onDidBlurEditorWidget(() => {
      isEditorFocused.set(false);
    });

    const dataProvider = new CompletionDataProvider({}, { current: [] }, undefined);
    const completionProvider = getCompletionProvider(monaco, dataProvider);

    // completion-providers in monaco are not registered directly to editor-instances,
    // they are registered to languages. this makes it hard for us to have
    // separate completion-providers for every query-field-instance
    // (but we need that, because they might connect to different datasources).
    // the trick we do is, we wrap the callback in a "proxy",
    // and in the proxy, the first thing is, we check if we are called from
    // "our editor instance", and if not, we just return nothing. if yes,
    // we call the completion-provider.
    const filteringCompletionProvider = {
      ...completionProvider,
      provideCompletionItems: (model, position, context, token) => {
        // if the model-id does not match, then this call is from a different editor-instance,
        // not "our instance", so return nothing
        if (editor.getModel()?.id !== model.id) {
          return { suggestions: [] };
        }
        return completionProvider.provideCompletionItems(model, position);
      },
    };

    const { dispose } = monaco.languages.registerCompletionItemProvider(LANG_ID, filteringCompletionProvider);

    autocompleteCleanupCallback.current = dispose;

    const handleResize = () => {
      const containerDiv = containerRef.current;
      if (containerDiv !== null) {
        const pixelHeight = editor.getContentHeight();
        containerDiv.style.height = `${pixelHeight + EDITOR_HEIGHT_OFFSET}px`;
        const pixelWidth = containerDiv.clientWidth;
        editor.layout({ width: pixelWidth, height: pixelHeight });
      }
    };
    editor.onDidFocusEditorText(() => {
      isEditorFocused.set(true);
      if (editor.getValue().trim() === '') {
        editor.trigger('', 'editor.action.triggerSuggest', {});
      }
    });
    editor.onDidContentSizeChange(handleResize);
    handleResize();

    setPlaceholder(monaco, editor, placeholder);
  }

  return (
    <div ref={containerRef}>
      <Editor
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        overrideServices={overrideServicesRef.current}
        theme={isDark ? 'vs-dark' : 'vs'}
        // @ts-ignore
        options={options}
        beforeMount={(monaco) => {
          ensureLogQL(monaco);
        }}
        language={LANG_ID}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
