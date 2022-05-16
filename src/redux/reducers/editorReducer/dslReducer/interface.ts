export interface DropInfo {
  parent: Object
  hasDropped: boolean
}

// base
export interface DslNode {
  readonly id: string
  readonly version: string
  readonly type: string
  readonly category: string
  parentId: string
  props: {
    background?: string
    width: string
    height: string
    leftColumn: string
    topRow: string
    rightColumn?: string
    bottomRow?: string
    position:
      | "-webkit-sticky"
      | "absolute"
      | "fixed"
      | "relative"
      | "static"
      | "sticky"
  }
}

export interface DslLayout extends DslNode {
  nodeChildren: DslNode[]
}

export interface DslState {
  root: DslLayout
}

export interface DslView extends DslNode {}

// layout
export interface DslFrame extends DslLayout {}

export interface DslStack extends DslLayout {
  orientation: string
}

// view
export interface DslText extends DslView {
  props: DslNode["props"] & {
    nodeText: string
  }
}

export interface DslImage extends DslView {
  imageUrl: string
}
