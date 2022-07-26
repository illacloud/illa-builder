export interface Transformer {
  rawData: string
  enable: boolean
}

export type ActionType =
  | "mysql"
  | "restapi"
  | "mongodb"
  | "redis"
  | "postgresql"
  | "transformer"

export type ActionTriggerMode = "manually" | "automate"

export interface ActionItem<T extends ActionContent> {
  actionId: string
  displayName: string
  actionType: ActionType
  transformer: Transformer
  triggerMode: ActionTriggerMode
  resourceId?: string
  content: T
}

export interface MysqlAction {
  sqlString: string
}

export interface RestApiAction<T extends BodyContent> {
  method: string
  urlParams: Record<string, string>
  headers: Record<string, string>
  cookies: Record<string, string>
  bodyType: BodyType
  body: T
}

export interface TransformerAction {
  transformerString: string
}

export type ActionContent =
  | MysqlAction
  | RestApiAction<BodyContent>
  | TransformerAction

export type BodyType = "JSON" | "none" | "form-data" | "x-www-form-urlencoded"

export type JSONBody = Record<string, string>

export type NoneBody = null

export type XWWWFormURLEncodedBody = Record<string, string>

export type FormDataBody = Record<string, string>

export type BodyContent =
  | JSONBody
  | NoneBody
  | FormDataBody
  | XWWWFormURLEncodedBody

export const actionInitialState: ActionItem<ActionContent>[] = []
