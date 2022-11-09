export interface PageItemProps {
  isHomePage?: boolean
  isSelected?: boolean
  pageName: string
  index: number
  allKeys: string[]
  changeCurrentPageIndex: (index: number) => void
}
