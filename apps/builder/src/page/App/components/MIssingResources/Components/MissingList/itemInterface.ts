export interface ItemProps {
  actionIDs: string[]
  resourceType: string
  replacementResourceID: string | undefined
  status: "missing" | "completed"
  tutorialHref?: string
  handleChangePlaceInfo: (
    index: string,
    resourceID: string,
    actionIDs: string[],
  ) => void
  index: string
}
