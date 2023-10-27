export interface PageItemProps {
  isHomePage: boolean
  pageName: string
  level: number
  parentPageName?: string
  subPagePaths?: Set<string>
  currentSubPagePath?: string
  currentPagePath: string
}
