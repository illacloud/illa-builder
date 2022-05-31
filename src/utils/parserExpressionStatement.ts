const DATA_BIND_REGEX = /{{([\s\S]*?)}}/

const isDynamicValue = (value: string): boolean => DATA_BIND_REGEX.test(value)

function getDynamicStringSegments(dynamicString: string): string[] {
  let stringSegments: string[] = []
  const indexOfDoubleParanStart = dynamicString.indexOf("{{")
  if (indexOfDoubleParanStart === -1) {
    return [dynamicString]
  }
  //{{}}{{}}}
  const firstString = dynamicString.substring(0, indexOfDoubleParanStart)
  if (firstString) stringSegments.push(firstString)
  let rest = dynamicString.substring(
    indexOfDoubleParanStart,
    dynamicString.length,
  )
  //{{}}{{}}}
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
  // Protect against bad string parse
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

export const ScriptTemplate = "<<string>>"

export const getScriptToEval = (userScript: string): string => {
  const script = `
  function closedFunction () {
    const result = ${ScriptTemplate}
    return result;
  }
  closedFunction.call({})
  `
  const buffer = script.split(ScriptTemplate)
  return `${buffer[0]}${userScript}${buffer[1]}`
}

export function evalScript(script: string) {
  return (function () {
    let result: any

    // TODO: wait to a build GLOBAL_DATA function.
    const GlobalData = {
      builder: {
        user: "weichen",
        email: "weichen@illasolft.com",
      },
    }

    for (const entity in GlobalData) {
      // @ts-ignore: No types available
      self[entity] = GlobalData[entity]
    }

    const userScript = getScriptToEval(script)

    try {
      result = eval(userScript)
    } catch (e) {
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

export const getDynamicValue = (dynamicBinding: string) => {
  const { jsSnippets, stringSegments } = getDynamicBindings(dynamicBinding)
  if (stringSegments.length) {
    const values = jsSnippets.map((jsSnippet, index) => {
      if (jsSnippet) {
        return evalScript(jsSnippet)
      } else {
        return stringSegments[index]
      }
    })
    if (stringSegments.length === 1) {
      return values[0]
    }
    // TODO: wait to add type transform
    return values.join("")
  }
}
