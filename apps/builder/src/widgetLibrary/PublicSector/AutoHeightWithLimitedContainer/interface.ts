export interface AutoHeightWithLimitedContainerProps {
  dynamicMaxHeight: number
  dynamicMinHeight: number
  containerHeight: number
  displayName: string
  handleUpdateComponentHeight: (height: number) => void
}
