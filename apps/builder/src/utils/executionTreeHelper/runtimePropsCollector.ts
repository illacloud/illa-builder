import dayjs from "dayjs"
import { merge } from "lodash"
import _ from "lodash"
import numbro from "numbro"
import Papa from "papaparse"
import { NIL, parse, stringify, v1, v3, v4, v5, validate, version } from "uuid"
import {
  getExecutionResult,
  getExecutionResultToCurrentPageCodeMirror,
  getExecutionResultToGlobalCodeMirror,
} from "@/redux/currentApp/executionTree/executionSelector"
import store from "@/store"

class ILLAEditorRuntimePropsCollector {
  private _runtimeProps: Record<string, unknown> = {}
  private static instance: ILLAEditorRuntimePropsCollector | null = null

  constructor() {
    this._runtimeProps = {
      _,
      uuid: {
        NIL,
        parse,
        stringify,
        v1,
        v3,
        v4,
        v5,
        validate,
        version,
      },
      dayjs,
      numbro,
      Papa,
    }
  }

  public static getInstance(): ILLAEditorRuntimePropsCollector {
    if (!ILLAEditorRuntimePropsCollector.instance) {
      ILLAEditorRuntimePropsCollector.instance =
        new ILLAEditorRuntimePropsCollector()
    }
    return ILLAEditorRuntimePropsCollector.instance
  }

  public addRuntimeProp(displayName: string, runtimeProp: unknown) {
    this._runtimeProps[displayName] = runtimeProp
  }

  public deleteRuntimeProp(displayName: string) {
    if (!this._runtimeProps[displayName]) return
    delete this._runtimeProps[displayName]
  }

  public getRuntimeProps() {
    return this._runtimeProps
  }

  public getMergedRuntimeProps(otherProps: Record<string, unknown>) {
    return merge({}, this._runtimeProps, otherProps)
  }

  public getGlobalCalcContext(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResult(rootState)
    return merge({}, this._runtimeProps, executionResult, otherContext)
  }

  public getCurrentPageCalcContext(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResultToCurrentPageCodeMirror(rootState)
    return merge({}, this._runtimeProps, executionResult, otherContext)
  }

  public getGlobalCalcContextWithLimit(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResultToGlobalCodeMirror(rootState)
    return merge({}, this._runtimeProps, executionResult, otherContext)
  }
}

export const ILLAEditorRuntimePropsCollectorInstance =
  ILLAEditorRuntimePropsCollector.getInstance()
