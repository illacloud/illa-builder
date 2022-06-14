export interface BaseInspectState {
  widgetDisplayName: string
  widgetType: string

  [key: string]: any
}

export interface InspectState {
  [key: string]: BaseInspectState
}

// TODO: get config from request;
export const InspectStateInitial: InspectState = {}
