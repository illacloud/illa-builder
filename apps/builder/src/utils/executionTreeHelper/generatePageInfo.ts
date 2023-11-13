import { WidgetSeedShape } from "./interface"

export const generateCurrentPageInfo = () => {
  return {
    pagePath: "{{root.pageSortedKey[root.currentPageIndex]}}",
    subPagePath: "{{root.currentSubPagePath}}",
    $dynamicAttrPaths: ["pagePath", "subPagePath"],
  }
}

export const generatePageInfos = (widgets: WidgetSeedShape) => {
  const rootNode = widgets.root
  if (!rootNode) return []
  const pageDisplayNameMapViewDisplayName: Record<string, Set<string>> = {}
  const pageNodes = rootNode.$childrenNode as string[]
  const homepageDisplayName: string =
    rootNode.homepageDisplayName ?? pageNodes[0]
  pageNodes.forEach((pageNodeDisplayName) => {
    pageDisplayNameMapViewDisplayName[pageNodeDisplayName] = new Set()
    const pageNode = widgets[pageNodeDisplayName]
    const sectionNodes = pageNode.$childrenNode as string[]
    sectionNodes.forEach((sectionNodeDisplayName) => {
      const sectionNode = widgets[sectionNodeDisplayName]
      const sectionConfigs =
        (sectionNode.sectionViewConfigs as Record<string, string>[]) ?? []
      sectionConfigs.forEach((sectionConfig: Record<string, string>) => {
        pageDisplayNameMapViewDisplayName[pageNodeDisplayName].add(
          sectionConfig.path,
        )
      })
    })
  })
  const result: {
    pagePath: string
    subPagePath?: string
    pageName: string
    subPageName?: string
    isHomePage: boolean
    subPageGroup: string
  }[] = []
  Object.keys(pageDisplayNameMapViewDisplayName).forEach((pageDisplayName) => {
    const subPagePaths = Array.from(
      pageDisplayNameMapViewDisplayName[pageDisplayName],
    )
    if (subPagePaths.length > 0) {
      subPagePaths.forEach((path, index, array) => {
        if (array.length === 1) {
          result.push({
            pagePath: `/${pageDisplayName}`,
            subPagePath: `/${pageDisplayName}/${path}`,
            pageName: pageDisplayName,
            subPageName: path,
            isHomePage: pageDisplayName === homepageDisplayName,
            subPageGroup: "",
          })
        } else {
          result.push({
            pagePath: `/${pageDisplayName}`,
            subPagePath: `/${pageDisplayName}/${path}`,
            pageName: pageDisplayName,
            subPageName: path,
            isHomePage: pageDisplayName === homepageDisplayName,
            subPageGroup: pageDisplayName,
          })
        }
      })
    } else {
      result.push({
        pagePath: `/${pageDisplayName}`,
        pageName: pageDisplayName,
        isHomePage: pageDisplayName === homepageDisplayName,
        subPageGroup: "",
      })
    }
  })
  return result
}
