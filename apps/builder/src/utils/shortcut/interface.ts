export interface ShortcutContextProp {
  showDeleteDialog: (
    displayName: string[],
    type?: "page" | "widget" | "action",
    options?: Record<string, any>,
  ) => void
}
