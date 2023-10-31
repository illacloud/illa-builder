import {
  DEFAULT_ASIDE_COLUMNS_NUMBER,
  DEFAULT_BODY_COLUMNS_NUMBER,
} from "@/page/App/components/DotPanel/constant/canvas"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/components/componentsState"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { WidgetLayoutInfo } from "@/redux/currentApp/executionTree/executionState"
import store from "@/store"

export const searchForefatherSectionNodeDisplayName = (
  currentDisplayName: string,
): string | null => {
  const rootState = store.getState()
  const widgetsLayoutInfo = getExecutionWidgetLayoutInfo(rootState)
  const currentLayoutInfo = widgetsLayoutInfo[currentDisplayName]
  if (currentLayoutInfo && currentLayoutInfo.widgetType !== "SECTION_NODE") {
    if (currentLayoutInfo.parentNode === "root") {
      return null
    }
    return searchForefatherSectionNodeDisplayName(currentLayoutInfo.parentNode)
  } else {
    return currentLayoutInfo ? currentLayoutInfo.displayName : null
  }
}

export const getCurrentSectionColumnNumberByChildDisplayName = (
  displayName: string,
): number => {
  const rootState = store.getState()
  const currentSectionDisplayName =
    searchForefatherSectionNodeDisplayName(displayName)
  if (!currentSectionDisplayName) {
    return DEFAULT_BODY_COLUMNS_NUMBER
  }

  const executionResult = getExecutionResult(rootState)

  const pageDisplayName =
    executionResult[currentSectionDisplayName]?.$parentPageName

  if (!pageDisplayName) {
    return DEFAULT_BODY_COLUMNS_NUMBER
  }

  const currentNode = searchDSLByDisplayName(
    currentSectionDisplayName,
  ) as ComponentNode

  const pageProps = executionResult[pageDisplayName]
  switch (currentNode.showName) {
    case "bodySection": {
      return pageProps?.bodyColumns || DEFAULT_BODY_COLUMNS_NUMBER
    }
    case "headerSection": {
      return pageProps?.headerColumns || DEFAULT_BODY_COLUMNS_NUMBER
    }
    case "leftSection": {
      return pageProps?.leftColumns || DEFAULT_ASIDE_COLUMNS_NUMBER
    }
    case "rightSection": {
      return pageProps?.rightColumns || DEFAULT_ASIDE_COLUMNS_NUMBER
    }
    case "footerSection": {
      return pageProps?.footerColumns || DEFAULT_BODY_COLUMNS_NUMBER
    }
    case "modalSection": {
      return pageProps?.bodyColumns || DEFAULT_BODY_COLUMNS_NUMBER
    }
    default: {
      return DEFAULT_BODY_COLUMNS_NUMBER
    }
  }
}

export function searchParent(
  displayName: string,
  widgetLayoutInfo: Record<string, WidgetLayoutInfo>,
): string[] {
  const parent = widgetLayoutInfo[displayName]?.parentNode
  if (parent) {
    return [parent, ...searchParent(parent, widgetLayoutInfo)]
  }
  return []
}

export const autoChangeContainersIndexWhenClick = (
  currentDisplayName: string,
) => {
  const rootState = store.getState()
  const widgetsLayoutInfo = getExecutionWidgetLayoutInfo(rootState)
  const canvasForeFatherDisplayNames = searchParent(
    currentDisplayName,
    widgetsLayoutInfo,
  ).filter(
    (displayName) => widgetsLayoutInfo[displayName]?.widgetType === "CANVAS",
  )
  const containerDisplayNames = canvasForeFatherDisplayNames
    .map((displayName) => ({
      displayName,
      parentDisplayName: widgetsLayoutInfo[displayName]?.parentNode,
    }))
    .filter(
      ({ parentDisplayName }) =>
        widgetsLayoutInfo[parentDisplayName]?.widgetType === "CONTAINER_WIDGET",
    )
    .map(({ displayName, parentDisplayName }) => {
      const childrenNode =
        widgetsLayoutInfo[parentDisplayName]?.childrenNode ?? []
      const currentIndex = childrenNode.indexOf(displayName)
      return {
        displayName: parentDisplayName,
        value: {
          currentIndex,
        },
      }
    })

  store.dispatch(
    executionActions.updateExecutionByMultiDisplayNameReducer(
      containerDisplayNames,
    ),
  )

  return canvasForeFatherDisplayNames
}
