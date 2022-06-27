export interface DragShadow {
  isConflict: boolean
  displayName: string
  renderX: number
  renderY: number
  w: number
  h: number
}

export interface DragShadowState {
  map: { [displayName: string]: DragShadow }
}

export const DragShadowInitialState: DragShadowState = {
  map: {},
}
