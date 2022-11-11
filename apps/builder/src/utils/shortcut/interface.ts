export interface ShortcutContextProp {
  showDeleteDialog: (
    displayName: string[],
    type?: "page" | "widget",
    options?: Record<string, any>,
  ) => void
}
