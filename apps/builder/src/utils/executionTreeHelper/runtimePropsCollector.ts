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
import { runActionWithExecutionResult } from "../action/runAction"
import {
  copyToClipboard,
  downloadFile,
  goToURL,
  setRouter,
  showNotification,
} from "../eventHandlerHelper/utils/commonUtils"
import {
  downloadFromILLADrive,
  saveToILLADrive,
} from "../eventHandlerHelper/utils/driveUtils"
import {
  setGlobalDataIn,
  setGlobalDataValue,
} from "../eventHandlerHelper/utils/globalDataUtils"

const THIRD_PARTY_PACKAGES = {
  _: {
    ..._,
  },
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
class ILLAEditorRuntimePropsCollector {
  private _runtimeProps: Record<string, unknown> = {}
  private static instance: ILLAEditorRuntimePropsCollector | null = null

  constructor() {
    this._runtimeProps = {
      ...THIRD_PARTY_PACKAGES,
      utils: {
        goToURL,
        showNotification,
        copyToClipboard,
        setRouter,
        downloadFile,
        downloadFromILLADrive,
        saveToILLADrive,
        setGlobalDataIn,
        setGlobalDataValue,
      },
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

  public getThirdPartyPackages() {
    return THIRD_PARTY_PACKAGES
  }

  public getGlobalCalcContext(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResult(rootState)

    const formatedExecutionResult = Object.keys(executionResult).reduce(
      (acc, prevKey) => {
        const prev = executionResult[prevKey]
        if (!prev) {
          return acc
        }
        if (prev.$type === "ACTION") {
          return {
            ...acc,
            [prev.displayName]: {
              ...prev,
              trigger: async () => {
                return await runActionWithExecutionResult(prev, false)
              },
            },
          }
        }
        return {
          ...acc,
          [prevKey]: prev,
        }
      },
      {} as Record<string, any>,
    )
    return merge({}, this._runtimeProps, formatedExecutionResult, otherContext)
  }

  public getCurrentPageCalcContext(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResultToCurrentPageCodeMirror(
      rootState,
    ) as Record<string, any>
    const formatedExecutionResult = Object.keys(executionResult).reduce(
      (acc, prevKey) => {
        const prev = executionResult[prevKey]

        if (!prev) {
          return acc
        }

        if (
          (Object.hasOwn && Object.hasOwn(prev, "actionType")) ||
          Object.prototype.hasOwnProperty.call(prev, "actionType")
        ) {
          return {
            ...acc,
            [prev.displayName]: {
              ...prev,
              trigger: async () => {
                return await runActionWithExecutionResult(prev, false)
              },
            },
          }
        }
        return {
          ...acc,
          [prevKey]: prev,
        }
      },
      {} as Record<string, any>,
    )
    return merge({}, this._runtimeProps, formatedExecutionResult, otherContext)
  }

  public getGlobalCalcContextWithLimit(otherContext?: Record<string, unknown>) {
    const rootState = store.getState()
    const executionResult = getExecutionResultToGlobalCodeMirror(rootState)
    return merge({}, this._runtimeProps, executionResult, otherContext)
  }
}

export const ILLAEditorRuntimePropsCollectorInstance =
  ILLAEditorRuntimePropsCollector.getInstance()
