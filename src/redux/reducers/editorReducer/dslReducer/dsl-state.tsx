// base
export interface DslNode {
  readonly dslKey: string
  readonly version: string
  readonly type: string
  readonly category: string
  parentKey: string
  width: string
  height: string
  left: string
  top: string
  right: string
  bottom: string
  position:
    | "-webkit-sticky"
    | "absolute"
    | "fixed"
    | "relative"
    | "static"
    | "sticky"
}

export interface DslLayout extends DslNode {
  nodeChildren: DslNode[]
  background?: string
}

export interface DslState {
  root: DslLayout
}
