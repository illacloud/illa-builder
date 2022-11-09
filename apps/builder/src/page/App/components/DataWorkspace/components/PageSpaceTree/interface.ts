export interface PageItemProps {
  isHomePage?: boolean
  isSelected?: boolean
  pageName: string
  index: number
  changeCurrentPageIndex: (index: number) => void
}
