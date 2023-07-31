import { Diff } from "deep-diff"
import { LayoutInfo } from "@/redux/currentApp/editor/components/componentsPayload"
import { CONTAINER_TYPE } from "../editor/components/componentsState"

export enum ExecutionErrorType {
  EVALUATED = "EVALUATED",
  LINT = "LINT",
  VALIDATION = "VALIDATION",
}

export interface ErrorShape {
  errorType: ExecutionErrorType
  errorMessage: string
  errorLine?: number
  errorColumn?: number
  errorName?: string
}
export type DependenciesState = Record<string, string[]>

export interface WidgetLayoutInfo {
  displayName: string
  widgetType: string
  layoutInfo: LayoutInfo
  parentNode: string
  containerType: CONTAINER_TYPE
  childrenNode: string[]
}

export interface ExecutionState {
  dependencies: DependenciesState
  result: Record<string, any>
  error: Record<string, ErrorShape[]>
  debuggerData: Record<string, ErrorShape[]>
  independencies: DependenciesState
  widgetsLayoutInfo: Record<string, WidgetLayoutInfo>
  draggingComponentIDs: string[]
  resizingComponentIDs: string[]
}

export const executionInitialState: ExecutionState = {
  dependencies: {},
  result: {},
  error: {},
  debuggerData: {},
  independencies: {},
  widgetsLayoutInfo: {},
  draggingComponentIDs: [],
  resizingComponentIDs: [],
}

export interface setExecutionResultPayload {
  updates: Diff<Record<string, any>, Record<string, any>>[]
}

export interface UpdateExecutionByDisplayNamePayload {
  displayName: string
  value: Record<string, any>
}

export interface UpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
  parentNode: string
  effectRows?: number
}

export interface BatchUpdateWidgetLayoutInfoPayload {
  displayName: string
  layoutInfo: Partial<LayoutInfo>
}

export interface UpdateCurrentPagePathPayload {
  pageDisplayName: string
  subPagePath?: string
}
