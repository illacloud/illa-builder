import { debounce } from "lodash"
import { FC, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { ILLACodeMirrorCore } from "@/components/CodeEditor/CodeMirror/core"
import { IExpressionShape } from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { githubLightScheme } from "@/components/CodeEditor/CodeMirror/theme"
import { CodeEditorProps } from "@/components/CodeEditor/interface"
import { getExecutionResultToCodeMirror } from "@/redux/currentApp/executionTree/executionSelector"
import { evaluateDynamicString } from "@/utils/evaluateDynamicString"
import { getStringSnippets } from "@/utils/evaluateDynamicString/dynamicConverter"
import { isDynamicString } from "@/utils/evaluateDynamicString/utils"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

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

const MAX_LEN_WITH_SNIPPETS = 1024

export const CodeEditor: FC<CodeEditorProps> = (props) => {
  const {
    value = "",
    onChange = () => {},
    showLineNumbers,
    placeholder,
    lang,
    sqlScheme,
    width,
    maxWidth,
    height,
    maxHeight,
    editable,
    readOnly,
    extensions,
    expectValueType,
    codeType,
    minWidth,
    minHeight,
    canShowCompleteInfo,
    wrapperCss,
    singleLine,
    wrappedCodeFunc,
  } = props
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<boolean>(false)
  const [resultType, setResultType] = useState(VALIDATION_TYPES.STRING)

  const executionResult = useSelector(getExecutionResultToCodeMirror)

  const stringSnippets = useMemo(() => {
    const realInput = wrappedCodeFunc ? wrappedCodeFunc(value) : value
    const dynamicStrings = getStringSnippets(realInput)
    const result: IExpressionShape[] = []
    const errors: string[] = []
    const calcResultArray: unknown[] = []
    const calcResultMap: Map<string, number[]> = new Map()
    dynamicStrings.forEach((dynamicString, index) => {
      if (
        dynamicString.length <= MAX_LEN_WITH_SNIPPETS &&
        isDynamicString(dynamicString)
      ) {
        try {
          const calcRes = evaluateDynamicString(
            "",
            dynamicString,
            executionResult,
          )
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
            isDynamicString(dynamicString) &&
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
  }, [wrappedCodeFunc, value, expectValueType, executionResult])

  const debounceHandleChange = debounce(onChange, 160)

  const customExtensions = useMemo(
    () => (extensions ? [extensions, githubLightScheme] : [githubLightScheme]),
    [extensions],
  )

  return (
    <ILLACodeMirrorCore
      showLineNumbers={showLineNumbers}
      placeholder={placeholder}
      value={value}
      onChange={debounceHandleChange}
      lang={lang}
      executionResult={executionResult}
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
      wrapperCss={wrapperCss}
      sqlScheme={sqlScheme}
      singleLine={singleLine}
    />
  )
}
