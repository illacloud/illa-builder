import {
  acceptCompletion,
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  closeCompletion,
  moveCompletionSelection,
} from "@codemirror/autocomplete"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { html, htmlCompletionSource } from "@codemirror/lang-html"
import { javascript } from "@codemirror/lang-javascript"
import { json } from "@codemirror/lang-json"
import {
  Cassandra,
  MSSQL,
  MariaSQL,
  MySQL,
  PLSQL,
  SQLite,
  StandardSQL,
  keywordCompletionSource,
  sql,
} from "@codemirror/lang-sql"
import { xml } from "@codemirror/lang-xml"
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language"
import { Extension, Prec } from "@codemirror/state"
import {
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  dropCursor,
  keymap,
  lineNumbers,
} from "@codemirror/view"
import { useMemo } from "react"
import { ternSeverCompletionSource } from "@/components/NewCodeEditor/CodeMirror/extensions/completionSources/TernServer"
import { buildIllaContextCompletionSource } from "@/components/NewCodeEditor/CodeMirror/extensions/completionSources/illaContext"
import { getDecoration } from "@/components/NewCodeEditor/CodeMirror/extensions/heighlightJSExpression"
import {
  CODE_LANG,
  CODE_TYPE,
  ICodeMirrorOptions,
  IExpressionShape,
} from "@/components/NewCodeEditor/CodeMirror/extensions/interface"

export const basicExtension: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
]

export const getLineNumberExtension = (showLineNumbers?: boolean) =>
  showLineNumbers ? [lineNumbers()] : []

export const getHighlightExpressionExtension = (
  codeType: CODE_TYPE,
  expressions?: IExpressionShape[],
) => {
  const isFunction = codeType === CODE_TYPE.FUNCTION
  return isFunction
    ? []
    : ViewPlugin.fromClass(
        class {
          decoration: DecorationSet
          constructor(view: EditorView) {
            this.decoration = getDecoration(view, expressions)
          }
          update(update: ViewUpdate) {
            this.decoration = getDecoration(update.view, expressions)
          }
        },
        {
          decorations: (v) => v.decoration,
        },
      )
}

const buildSqlSources = (lang: CODE_LANG) => {
  switch (lang) {
    case CODE_LANG.PLSQL: {
      return keywordCompletionSource(PLSQL)
    }
    case CODE_LANG.CASSANDRA: {
      return keywordCompletionSource(Cassandra)
    }
    case CODE_LANG.SQLite: {
      return keywordCompletionSource(SQLite)
    }
    case CODE_LANG.MSSQL: {
      return keywordCompletionSource(MSSQL)
    }
    case CODE_LANG.MARIASQL: {
      return keywordCompletionSource(MariaSQL)
    }
    case CODE_LANG.MYSQL: {
      return keywordCompletionSource(MySQL)
    }
    case CODE_LANG.PGSQL: {
      return keywordCompletionSource(StandardSQL)
    }
    default:
    case CODE_LANG.SQL: {
      return keywordCompletionSource(StandardSQL)
    }
  }
}

const buildCompletionSources = (
  codeType: CODE_TYPE,
  lang: CODE_LANG,
  executionResult: Record<string, unknown>,
) => {
  const ternSource = ternSeverCompletionSource(lang, codeType)
  const sqlSources = buildSqlSources(lang)
  const illaSources = buildIllaContextCompletionSource(
    lang,
    codeType,
    executionResult,
  )
  const completionSources = [ternSource, illaSources]

  switch (lang) {
    case CODE_LANG.HTML: {
      completionSources.push(htmlCompletionSource)
      break
    }
    case CODE_LANG.PGSQL:
    case CODE_LANG.MARIASQL:
    case CODE_LANG.MSSQL:
    case CODE_LANG.SQLite:
    case CODE_LANG.CASSANDRA:
    case CODE_LANG.PLSQL:
    case CODE_LANG.MYSQL:
    case CODE_LANG.SQL: {
      completionSources.push(sqlSources)
      break
    }
    default: {
      break
    }
  }
  return completionSources
}
const keyMapExtensions = Prec.highest(
  keymap.of([
    { key: "Escape", run: closeCompletion },
    { key: "ArrowDown", run: moveCompletionSelection(true) },
    { key: "ArrowUp", run: moveCompletionSelection(false) },
    { key: "PageDown", run: moveCompletionSelection(true, "page") },
    { key: "PageUp", run: moveCompletionSelection(false, "page") },
    { key: "Tab", run: acceptCompletion },
    { key: "Enter", run: acceptCompletion },
  ]),
)

const getAutoCompletionExtension = (
  codeType: CODE_TYPE,
  lang: CODE_LANG,
  executionResult: Record<string, unknown>,
) => {
  const completionSources = buildCompletionSources(
    codeType,
    lang,
    executionResult,
  )
  return [
    autocompletion({
      override: completionSources,
      defaultKeymap: false,
      closeOnBlur: false,
    }),
    keyMapExtensions,
  ]
}

export const useBasicSetup = (options: ICodeMirrorOptions) => {
  const {
    showLineNumbers,
    lang = CODE_LANG.JAVASCRIPT,
    codeType = CODE_TYPE.EXPRESSION,
    executionResult = {},
    expressions = [],
  } = options

  const autocompletionExtension = useMemo(
    () => getAutoCompletionExtension(codeType, lang, executionResult),
    [codeType, executionResult, lang],
  )

  const showLinNUmberExtension = useMemo(
    () => getLineNumberExtension(showLineNumbers),
    [showLineNumbers],
  )

  const langExtension = useMemo(() => {
    const plugins: Extension[] = [
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    ]
    switch (lang) {
      case CODE_LANG.PGSQL:
      case CODE_LANG.MARIASQL:
      case CODE_LANG.MSSQL:
      case CODE_LANG.SQLite:
      case CODE_LANG.CASSANDRA:
      case CODE_LANG.PLSQL:
      case CODE_LANG.MYSQL:
      case CODE_LANG.SQL: {
        plugins.push(sql())
        break
      }
      case CODE_LANG.HTML: {
        plugins.push(html())
        break
      }
      case CODE_LANG.JSON: {
        plugins.push(json())
        break
      }
      case CODE_LANG.XML: {
        plugins.push(xml())
        break
      }
      case CODE_LANG.JAVASCRIPT:
      default: {
        plugins.push(javascript())
        break
      }
    }
    return plugins
  }, [lang])

  const highlightJSExpressionExtension = useMemo(() => {
    return getHighlightExpressionExtension(codeType, expressions)
  }, [codeType, expressions])

  const extensions = useMemo(
    () => [
      basicExtension,
      showLinNUmberExtension,
      langExtension,
      highlightJSExpressionExtension,
      autocompletionExtension,
    ],
    [
      autocompletionExtension,
      highlightJSExpressionExtension,
      langExtension,
      showLinNUmberExtension,
    ],
  )

  return extensions
}
