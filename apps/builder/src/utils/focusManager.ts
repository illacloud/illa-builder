export type ILLAPanelType =
  | "none"
  | "data_component"
  | "data_action"
  | "data_page"
  | "data_global_state"
  | "action"
  | "canvas"
  | "widget_picker"
  | "components_config"
  | "page_config"
export interface ClickPosition {
  displayName: string
  type: "inner_container" | "component" | "group"
  clickPosition: number[]
}

export class FocusManager {
  private static currentFocus: ILLAPanelType = "none"
  private static currentClickPosition?: ClickPosition

  static switchFocus(
    illaPanelType: ILLAPanelType,
    clickPosition?: ClickPosition,
  ) {
    this.currentFocus = illaPanelType
    this.currentClickPosition = clickPosition
  }

  static getClickPosition(): ClickPosition | undefined {
    return this.currentClickPosition
  }

  static getFocus(): ILLAPanelType {
    return this.currentFocus
  }
}
