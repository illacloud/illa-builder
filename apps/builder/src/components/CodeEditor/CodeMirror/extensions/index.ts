import {
  CompletionContext,
  CompletionResult,
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
  schemaCompletionSource,
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
import { dropCursor, keymap, lineNumbers, tooltips } from "@codemirror/view"
import { useMemo } from "react"
import { ternSeverCompletionSource } from "@/components/CodeEditor/CodeMirror/extensions/completionSources/TernServer"
import { buildIllaContextCompletionSource } from "@/components/CodeEditor/CodeMirror/extensions/completionSources/illaContext"
import { getHighlightExpressionExtension } from "@/components/CodeEditor/CodeMirror/extensions/heighLightJSExpression"
import {
  CODE_LANG,
  CODE_TYPE,
  ICodeMirrorOptions,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { ILLAEditorRuntimePropsCollectorInstance } from "@/utils/executionTreeHelper/runtimePropsCollector"
import { isObject } from "@/utils/typeHelper"

export const basicExtension: Extension = [
  history(),
  dropCursor(),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap]),
]

const buildSqlSchemeSources = (sqlScheme: Record<string, unknown>) => {
  const requiredScheme: { [table: string]: string[] } = {}
  Object.keys(sqlScheme).forEach((tableName) => {
    if (sqlScheme[tableName] && isObject(sqlScheme[tableName])) {
      requiredScheme[tableName] = Object.keys(
        sqlScheme[tableName] as Record<string, unknown>,
      )
    }
  })
  const completionSourceFunc = schemaCompletionSource({
    schema: requiredScheme,
  })
  return (context: CompletionContext) => {
    const completionSource = completionSourceFunc(context) as CompletionResult
    if (Array.isArray(completionSource?.options)) {
      completionSource.options = completionSource.options.map((option) => {
        return {
          ...option,
          type: "table",
        }
      })
    }

    return completionSource
  }
}

const buildSqlKeywordSources = (lang: CODE_LANG) => {
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
  canShowCompleteInfo: boolean,
  sqlScheme: Record<string, unknown>,
  executedResult: Record<string, unknown>,
) => {
  const ternSource = ternSeverCompletionSource(canShowCompleteInfo, codeType)
  const illaSources = buildIllaContextCompletionSource(
    canShowCompleteInfo,
    codeType,
    executedResult,
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
      const sqlKeywordsSources = buildSqlKeywordSources(lang)
      const sqlSchemeSources = buildSqlSchemeSources(sqlScheme)
      completionSources.push(sqlKeywordsSources, sqlSchemeSources)
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
  canShowCompleteInfo: boolean,
  sqlScheme: Record<string, unknown>,
  executedResult: Record<string, unknown>,
) => {
  const completionSources = buildCompletionSources(
    codeType,
    lang,
    canShowCompleteInfo,
    sqlScheme,
    executedResult,
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
    canShowCompleteInfo = false,
    sqlScheme = {},
    expressions = [],
    scopeOfAutoComplete = "global",
  } = options

  const executedResult =
    scopeOfAutoComplete === "global"
      ? ILLAEditorRuntimePropsCollectorInstance.getGlobalCalcContextWithLimit()
      : ILLAEditorRuntimePropsCollectorInstance.getCurrentPageCalcContext()

  const autocompletionExtension = useMemo(
    () =>
      getAutoCompletionExtension(
        codeType,
        lang,
        canShowCompleteInfo,
        sqlScheme,
        executedResult,
      ),
    [canShowCompleteInfo, codeType, executedResult, lang, sqlScheme],
  )

  const showLinNUmberExtension = useMemo(
    () => (showLineNumbers ? [lineNumbers()] : []),
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
    const isFunction = codeType === CODE_TYPE.FUNCTION
    return isFunction ? [] : getHighlightExpressionExtension(expressions)
  }, [codeType, expressions])

  const tooltipExtension = useMemo(() => {
    return tooltips({
      position: "absolute",
      parent:
        document.querySelector<HTMLElement>(".illaCodeMirrorWrapper") ||
        document.body,
    })
  }, [])

  const extensions = useMemo(
    () => [
      basicExtension,
      showLinNUmberExtension,
      langExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
      tooltipExtension,
    ],
    [
      showLinNUmberExtension,
      langExtension,
      autocompletionExtension,
      highlightJSExpressionExtension,
      tooltipExtension,
    ],
  )

  return extensions
}
