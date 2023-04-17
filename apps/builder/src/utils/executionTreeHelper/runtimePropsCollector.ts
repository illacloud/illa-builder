import { merge } from "lodash"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"

export type RuntimeProp = Record<string, Function>

class ILLAEditorRuntimePropsCollector {
  private _runtimeProps: Record<string, RuntimeProp> = {}
  private static instance: ILLAEditorRuntimePropsCollector | null = null

  constructor() {
    this._runtimeProps = {}
  }

  public static getInstance(): ILLAEditorRuntimePropsCollector {
    if (!ILLAEditorRuntimePropsCollector.instance) {
      ILLAEditorRuntimePropsCollector.instance =
        new ILLAEditorRuntimePropsCollector()
    }
    return ILLAEditorRuntimePropsCollector.instance
  }

  public addRuntimeProp(displayName: string, runtimeProp: RuntimeProp) {
    this._runtimeProps[displayName] = runtimeProp
  }

  public deleteRuntimeProp(displayName: string) {
    if (!this._runtimeProps[displayName]) return
    delete this._runtimeProps[displayName]
  }

  public getRuntimeProps() {
    return this._runtimeProps
  }

  public getCalcContext(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResult(rootState)
    return merge({}, this._runtimeProps, executionResult, otherContext)
  }
}

export const ILLAEditorRuntimePropsCollectorInstance =
  ILLAEditorRuntimePropsCollector.getInstance()
