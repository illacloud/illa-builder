const DATA_BIND_REGEX = /{{([\s\S]*?)}}/

const isDynamicValue = (value: string): boolean => DATA_BIND_REGEX.test(value)

export enum EvaluationScriptType {
  EXPRESSION = "EXPRESSION",
  ASYNC_ANONYMOUS_FUNCTION = "ASYNC_ANONYMOUS_FUNCTION",
}

export const ScriptTemplate = "<<string>>"

export const EvaluationScripts: Record<EvaluationScriptType, string> = {
  [EvaluationScriptType.EXPRESSION]: `
  function closedFunction () {
    const result = ${ScriptTemplate}
    return result;
  }
  closedFunction.call(THIS_CONTEXT)
  `,
  [EvaluationScriptType.ASYNC_ANONYMOUS_FUNCTION]: `
  async function callback (script) {
    const userFunction = script;
    const result = await userFunction?.apply(THIS_CONTEXT, ARGUMENTS);
    return result;
  }
  callback(${ScriptTemplate})
  `,
}

function getDynamicStringSegments(dynamicString: string): string[] {
  let stringSegments: string[] = []
  const indexOfDoubleParenStart = dynamicString.indexOf("{{")
  if (indexOfDoubleParenStart === -1) {
    return [dynamicString]
  }
  const firstString = dynamicString.substring(0, indexOfDoubleParenStart)
  if (firstString) stringSegments.push(firstString)
  let rest = dynamicString.substring(
    indexOfDoubleParenStart,
    dynamicString.length,
  )
  let sum = 0
  for (let i = 0; i <= rest.length - 1; i++) {
    const char = rest[i]
    const prevChar = rest[i - 1]

    if (char === "{") {
      sum++
    } else if (char === "}") {
      sum--
      if (prevChar === "}" && sum === 0) {
        stringSegments.push(rest.substring(0, i + 1))
        rest = rest.substring(i + 1, rest.length)
        if (rest) {
          stringSegments = stringSegments.concat(getDynamicStringSegments(rest))
          break
        }
      }
    }
  }
  if (sum !== 0 && dynamicString !== "") {
    return [dynamicString]
  }
  return stringSegments
}

export const getDynamicBindings = (
  dynamicString: string,
): { stringSegments: string[]; jsSnippets: string[] } => {
  if (!dynamicString || typeof dynamicString !== "string") {
    return { stringSegments: [], jsSnippets: [] }
  }
  const sanitisedString = dynamicString.trim()
  let stringSegments, paths: any
  // Get the {{binding}} bound values
  stringSegments = getDynamicStringSegments(sanitisedString)
  // Get the "binding" path values
  paths = stringSegments.map((segment) => {
    const length = segment.length
    const matches = isDynamicValue(segment)
    if (matches) {
      return segment.substring(2, length - 2)
    }
    return ""
  })

  return { stringSegments: stringSegments, jsSnippets: paths }
}

export const getScriptToEval = (
  userScript: string,
  isTriggerBased: boolean = false,
): string => {
  const scriptType = getScriptType(isTriggerBased)
  const buffer = EvaluationScripts[scriptType].split(ScriptTemplate)
  return `${buffer[0]}${userScript}${buffer[1]}`
}

const createGlobalData = (
  dataTree: Record<string, any>,
  context?: Record<string, any>,
) => {
  const GLOBAL_DATA: Record<string, any> = {}
  GLOBAL_DATA.THIS_CONTEXT = {}
  if (context) {
    GLOBAL_DATA.THIS_CONTEXT = context
  }
  Object.keys(dataTree).forEach((datum) => {
    GLOBAL_DATA[datum] = dataTree[datum]
  })

  return GLOBAL_DATA
}

const getScriptType = (isTriggerBased = false): EvaluationScriptType => {
  let scriptType = EvaluationScriptType.EXPRESSION
  if (isTriggerBased) {
    scriptType = EvaluationScriptType.ASYNC_ANONYMOUS_FUNCTION
  }
  return scriptType
}

function evalScript(
  script: string,
  dataTree: Record<string, any>,
  isTriggerBased: boolean,
): any {
  return (function () {
    let result: any

    const GlobalData = createGlobalData(dataTree)

    for (const entity in GlobalData) {
      // @ts-ignore: No types available
      self[entity] = GlobalData[entity]
    }

    const userScript = getScriptToEval(script, isTriggerBased)

    try {
      result = eval(userScript)
    } catch (e) {
      // TODO: add error handler
      console.log(e)
    } finally {
      for (const entity in GlobalData) {
        // @ts-ignore: No types available
        delete self[entity]
      }
    }
    return result
  })()
}

export const getDynamicValue = (
  dynamicBinding: string,
  dataTree: Record<string, any>,
  isTriggerBased: boolean = false,
) => {
  const { jsSnippets, stringSegments } = getDynamicBindings(dynamicBinding)
  if (stringSegments.length) {
    const values = jsSnippets.map((jsSnippet, index) => {
      if (jsSnippet) {
        return evalScript(jsSnippet, dataTree, isTriggerBased)
      } else {
        return stringSegments[index]
      }
    })
    if (stringSegments.length === 1) {
      return values[0]
    }
    // TODO: add values handler.
    return values.join("")
  }
}
