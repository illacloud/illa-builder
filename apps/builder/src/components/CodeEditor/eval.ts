export async function executeMultilineJS(code: string) {
  let result = {},
    error = null

  try {
    const AsyncFunction = new Function(
      `return Object.getPrototypeOf(async function(){}).constructor`,
    )()
    let evalFn = new AsyncFunction("components", code)
    result = {
      status: "ok",
      data: await evalFn(),
      // evalFn(currentState.components)
    }
  } catch (err) {
    error = err?.stack?.split?.("\n")?.[0]
    result = { status: "failed", data: { message: error, description: error } }
  }

  return result
}
