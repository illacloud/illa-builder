class ActionPerformance {
  private type: string

  constructor(type: string) {
    this.type = type
  }

  start(actionId: string): void {
    try {
      performance.mark(`${actionId}_${this.type}:start`)
    } catch (e) {
      console.error(e)
    }
  }

  end(actionId: string): void {
    try {
      performance.mark(`${actionId}_${this.type}:end`)
    } catch (e) {
      console.error(e)
    }
  }

  measure(actionId: string): number | void {
    try {
      const name = `${actionId}_${this.type}`
      performance.measure(name, `${name}:start`, `${name}:end`)

      return performance.getEntriesByName(name)[0].duration
    } catch (e) {
      console.error(e)
    }
  }
}

const prepareQueryPerformanceInstance = new ActionPerformance("prepareQuery")
export class PrepareQueryPerformance {
  static start(actionId: string) {
    prepareQueryPerformanceInstance.start(actionId)
  }

  static end(actionId: string) {
    prepareQueryPerformanceInstance.end(actionId)
  }

  static measure(actionId: string): number | void {
    return prepareQueryPerformanceInstance.measure(actionId)
  }
}

const handleResponsePerformanceInstance = new ActionPerformance(
  "handleResponse",
)
export class HandleResponsePerformance {
  static start(actionId: string) {
    handleResponsePerformanceInstance.start(actionId)
  }

  static end(actionId: string) {
    handleResponsePerformanceInstance.end(actionId)
  }

  static measure(actionId: string): number | void {
    return handleResponsePerformanceInstance.measure(actionId)
  }
}

const transformerPerformanceInstance = new ActionPerformance("transformer")
export class TransformerPerformance {
  static start(actionId: string) {
    transformerPerformanceInstance.start(actionId)
  }

  static end(actionId: string) {
    transformerPerformanceInstance.end(actionId)
  }

  static measure(actionId: string): number | void {
    return transformerPerformanceInstance.measure(actionId)
  }
}

const postProcessingPerformanceInstance = new ActionPerformance(
  "postProcessing",
)
export class PostProcessingPerformanceInstance {
  static start(actionId: string) {
    postProcessingPerformanceInstance.start(actionId)
  }

  static end(actionId: string) {
    postProcessingPerformanceInstance.end(actionId)
  }

  static measure(actionId: string): number | void {
    return postProcessingPerformanceInstance.measure(actionId)
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings
export function getResourcePerformance(
  resourceName: string,
  resourceIndex: number,
) {
  const {
    connectStart,
    connectEnd,
    requestStart,
    responseEnd,
    responseStart,
    encodedBodySize,
  } = performance.getEntriesByName(resourceName)[
    resourceIndex
  ] as PerformanceResourceTiming

  return {
    responseSize: encodedBodySize,
    executeResource: responseStart - requestStart,
    transferData: connectEnd - connectStart + (responseEnd - responseStart),
  }
}
