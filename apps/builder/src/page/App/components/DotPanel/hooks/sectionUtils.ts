export const getCurrentDisplayName = (
  sectionViewConfigs: any[],
  viewSortedKey: string[],
  defaultViewKey: string,
  isProduction: boolean,
  viewPath: string | undefined,
  currentViewIndex: number,
) => {
  if (!Array.isArray(sectionViewConfigs) || !Array.isArray(viewSortedKey))
    return "View 1"
  const defaultedViewConfig = sectionViewConfigs.find(
    (item) => item.key === defaultViewKey,
  )
  const defaultedViewKey = viewSortedKey.includes(
    defaultedViewConfig?.viewDisplayName,
  )
    ? defaultedViewConfig?.viewDisplayName
    : viewSortedKey[0]

  if (isProduction) {
    let targetViewDisplayName = defaultedViewKey
    if (viewPath) {
      const targetViewName = sectionViewConfigs.find(
        (config) => config.path === decodeURIComponent(viewPath),
      )
      targetViewDisplayName =
        targetViewName?.viewDisplayName || defaultedViewKey
    }

    return targetViewDisplayName
  } else {
    return viewSortedKey[currentViewIndex] || defaultedViewKey
  }
}
