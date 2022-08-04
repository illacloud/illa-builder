export interface DragShadow {
  parentNode: string
  isConflict: boolean
  displayName: string
  renderX: number
  renderY: number
  w: number
  h: number
}

export interface DragShadowState {
  [key: string]: DragShadow
}

export const DragShadowInitialState: DragShadowState = {}
