import {
  getStringSnippets,
  isDynamicStringSnippet,
} from "@illa-public/dynamic-string"
import { debounce } from "lodash-es"
import { FC, useCallback, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import OpenWindowIcon from "@/assets/public/openWindow.svg?react"
import { ILLACodeMirrorCore } from "@/components/CodeEditor/CodeMirror/core"
import {
  CODE_TYPE,
  IExpressionShape,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { githubLightScheme } from "@/components/CodeEditor/CodeMirror/theme"
import { ModalCodeMirror } from "@/components/CodeEditor/ModalCodeMirror"
import { CodeEditorProps } from "@/components/CodeEditor/interface"
import {
  ILLACodeMirrorWrapperStyle,
  openWindowIconHotspotStyle,
} from "@/components/CodeEditor/style"
import i18n from "@/i18n/config"
import {
  getExecutionResultToCurrentPageCodeMirror,
  getExecutionResultToGlobalCodeMirror,
} from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { LIMIT_MEMORY, estimateMemoryUsage } from "@/utils/calculateMemoryUsage"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import {
  removeIgnoredKeys,
  removeWidgetOrActionMethods,
} from "@/utils/executionTreeHelper/utils"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { fixedValue } from "./utils"

const getResultType = (result: unknown) => {
  if (Array.isArray(result)) {
    return VALIDATION_TYPES.ARRAY
  } else if (typeof result === "string") {
    return VALIDATION_TYPES.STRING
  } else if (typeof result === "number") {
    return VALIDATION_TYPES.NUMBER
  } else if (typeof result === "boolean") {
    return VALIDATION_TYPES.BOOLEAN
  } else if (typeof result === "undefined") {
    return VALIDATION_TYPES.UNDEFINED
  } else {
    return VALIDATION_TYPES.OBJECT
  }
}

const getShowResultType = (results: unknown[]) => {
  if (results.length === 0) {
    return VALIDATION_TYPES.STRING
  }
  if (results.length === 1) {
    return getResultType(results[0])
  } else {
    return VALIDATION_TYPES.STRING
  }
}

const getShowResult = (results: unknown[]) => {
  let calcResult: string = ""
  if (results.length === 0) {
    return ""
  } else {
    const memorySize = estimateMemoryUsage(results)
    if (LIMIT_MEMORY < memorySize) {
      return i18n.t("editor.global.size_exceed", {
        current_size: memorySize,
        limit_size: LIMIT_MEMORY,
      })
    }
    results.forEach((result) => {
      if (
        typeof result === "string" ||
        typeof result === "number" ||
        typeof result === "boolean"
      ) {
        calcResult += result
      } else if (result == undefined) {
        calcResult += result
      } else {
        calcResult += JSON.stringify(result)
      }
    })
  }
  return calcResult
}

export const MAX_LEN_WITH_SNIPPETS = 1024

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    value = "",
    modalTitle = "",
    modalDescription,
    onChange = () => {},
    showLineNumbers,
    placeholder,
    lang,
    sqlScheme,
    width,
    maxWidth,
    height,
    maxHeight,
    editable = true,
    readOnly,
    extensions,
    expectValueType,
    codeType = CODE_TYPE.EXPRESSION,
    minWidth,
    minHeight,
    canShowCompleteInfo,
    wrapperCss,
    singleLine,
    canExpand = true,
    scopeOfAutoComplete = "global",
    wrappedCodeFunc,
    onBlur = () => {},
    onFocus = () => {},
    className,
  } = props
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [resultType, setResultType] = useState(VALIDATION_TYPES.STRING)
  const [isExpanded, setIsExpanded] = useState(false)
  const popupContainerRef = useRef<HTMLDivElement>(null)
  const innerCanExpand = canExpand && !readOnly && editable

  const tmpCalcContext = useSelector<RootState, Record<string, unknown>>(
    (rootState) => {
      return scopeOfAutoComplete === "global"
        ? getExecutionResultToGlobalCodeMirror(rootState)
        : getExecutionResultToCurrentPageCodeMirror(rootState)
    },
  )
  const calcContext = useMemo(() => {
    if (codeType === CODE_TYPE.FUNCTION) {
      return removeIgnoredKeys(tmpCalcContext)
    } else {
      return removeIgnoredKeys(removeWidgetOrActionMethods(tmpCalcContext))
    }
  }, [codeType, tmpCalcContext])

  const stringSnippets = useMemo(() => {
    const result: IExpressionShape[] = []
    const realInput = wrappedCodeFunc ? wrappedCodeFunc(value) : value
    const dynamicStrings = getStringSnippets(realInput)
    const errors: string[] = []
    const calcResultArray: unknown[] = []
    const calcResultMap: Map<string, number[]> = new Map()
    dynamicStrings.forEach((dynamicString, index) => {
      if (isDynamicStringSnippet(dynamicString)) {
        try {
          const calcRes = evaluateDynamicString("", dynamicString, calcContext)
          calcResultArray.push(calcRes)
          const res = { value: dynamicString, hasError: false }
          result.push(res)
          if (calcResultMap.has(dynamicString)) {
            calcResultMap.get(dynamicString)?.push(index)
          } else {
            calcResultMap.set(dynamicString, [index])
          }
        } catch (e) {
          errors.push((e as Error).message)
          const res = { value: dynamicString, hasError: true }
          result.push(res)
          if (calcResultMap.has(dynamicString)) {
            calcResultMap.get(dynamicString)?.push(index)
          } else {
            calcResultMap.set(dynamicString, [index])
          }
        }
      } else {
        calcResultArray.push(dynamicString)
      }
    })
    if (errors.length > 0) {
      setError(true)
      setResult(errors[0])
      return result
    }
    const showResult = getShowResult(calcResultArray)
    const showResultType = getShowResultType(calcResultArray)
    setError(false)
    if (expectValueType) {
      setResultType(expectValueType)
      if (showResultType !== expectValueType && value) {
        dynamicStrings.forEach((dynamicString) => {
          if (
            dynamicString.length <= MAX_LEN_WITH_SNIPPETS &&
            isDynamicStringSnippet(dynamicString) &&
            calcResultMap.has(dynamicString)
          ) {
            const indexs = calcResultMap.get(dynamicString)
            indexs?.forEach((index) => {
              if (result[index]) {
                result[index].hasError = true
              }
            })
          }
        })

        setResult(`Expect ${expectValueType}, but got ${showResultType}`)
        setError(true)
      } else {
        setResult(
          showResult.length > MAX_LEN_WITH_SNIPPETS
            ? showResult.slice(0, MAX_LEN_WITH_SNIPPETS) + "..."
            : showResult,
        )
      }
    } else {
      setResultType(showResultType)
      setResult(
        showResult.length > MAX_LEN_WITH_SNIPPETS
          ? showResult.slice(0, MAX_LEN_WITH_SNIPPETS) + "..."
          : showResult,
      )
    }
    return result
  }, [wrappedCodeFunc, value, expectValueType, calcContext])

  const debounceHandleChange = useMemo(() => {
    return debounce(onChange, 160)
  }, [onChange])

  const customExtensions = useMemo(
    () => (extensions ? [extensions, githubLightScheme] : [githubLightScheme]),
    [extensions],
  )

  const handleOpenExpandModal = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const handleCloseExpandModal = useCallback(() => {
    setIsExpanded(false)
  }, [])

  return (
    <div css={[ILLACodeMirrorWrapperStyle, wrapperCss]} ref={popupContainerRef}>
      <ILLACodeMirrorCore
        className={className}
        showLineNumbers={showLineNumbers}
        placeholder={placeholder}
        value={fixedValue(value)}
        onChange={debounceHandleChange}
        lang={lang}
        expressions={stringSnippets}
        result={result}
        hasError={error}
        resultType={resultType}
        width={width}
        maxWidth={maxWidth}
        height={height}
        maxHeight={maxHeight}
        editable={editable}
        readOnly={readOnly}
        codeType={codeType}
        extensions={customExtensions}
        minWidth={minWidth}
        minHeight={minHeight}
        canShowCompleteInfo={canShowCompleteInfo}
        sqlScheme={sqlScheme}
        singleLine={singleLine}
        tooltipContainer={popupContainerRef ?? undefined}
        scopeOfAutoComplete={scopeOfAutoComplete}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {innerCanExpand && (
        <div
          css={openWindowIconHotspotStyle}
          className="open-window-icon-hotspot"
          onClick={handleOpenExpandModal}
        >
          <OpenWindowIcon />
        </div>
      )}
      {isExpanded && (
        <ModalCodeMirror
          title={modalTitle}
          onClose={handleCloseExpandModal}
          value={fixedValue(value)}
          onChange={onChange}
          expectValueType={expectValueType}
          lang={lang}
          description={modalDescription}
          placeholder={placeholder}
          wrappedCodeFunc={wrappedCodeFunc}
          onBlur={onBlur}
          onFocus={onFocus}
          scopeOfAutoComplete={scopeOfAutoComplete}
          codeType={codeType}
        />
      )}
    </div>
  )
}
