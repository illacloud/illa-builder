export function isContainerType(type: string): boolean {
  return (
    type === "CONTAINER_WIDGET" ||
    type === "FORM_WIDGET" ||
    type === "MODAL_WIDGET" ||
    type === "LIST_WIDGET"
  )
}
