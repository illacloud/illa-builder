export type ILLAPanelType =
  | "none"
  | "dataWorkspace_component"
  | "dataWorkspace_action"
  | "action"
  | "canvas"
  | "widget_picker"
  | "components"

export class FocusManager {
  private static currentFocus: ILLAPanelType = "none"

  static switchFocus(illaPanelType: ILLAPanelType) {
    this.currentFocus = illaPanelType
  }

  static getFocus(): ILLAPanelType {
    return this.currentFocus
  }
}
