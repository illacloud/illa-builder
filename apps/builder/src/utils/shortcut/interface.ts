export interface ShortcutContextProp {
  showDeleteDialog: (
    displayName: string[],
    type?: "page" | "widget" | "action" | "subpage" | "pageView",
    options?: Record<string, any>,
  ) => void
}
