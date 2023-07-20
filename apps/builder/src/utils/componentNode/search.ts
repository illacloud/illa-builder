import {
  DEFAULT_ASIDE_COLUMNS_NUMBER,
  DEFAULT_BODY_COLUMNS_NUMBER,
} from "@/page/App/components/DotPanel/constant/canvas"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import {
  getExecutionResult,
  getExecutionWidgetLayoutInfo,
} from "@/redux/currentApp/executionTree/executionSelector"
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
