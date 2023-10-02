export interface ShortcutContextProp {
  showDeleteDialog: (
    displayName: string[],
    type?: "page" | "widget" | "action" | "subpage" | "pageView" | "globalData",
    options?: Record<string, any>,
  ) => void
}
