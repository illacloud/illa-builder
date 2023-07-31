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
  const pageDisplayNameMapViewDisplayName: Record<string, Set<string>> = {}
  const pageNodes = rootNode.$childrenNode as string[]
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

  return Object.keys(pageDisplayNameMapViewDisplayName).map(
    (pageDisplayName) => {
      const subPagePaths = Array.from(
        pageDisplayNameMapViewDisplayName[pageDisplayName],
      )
      return {
        pagePath: `/${pageDisplayName}`,
        subPagePath: subPagePaths.map((path) => {
          return {
            [path]: `/${pageDisplayName}/${path}`,
          }
        }),
      }
    },
  )
}
