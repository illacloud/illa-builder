import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { ComponentTreeNode } from "@illa-public/public-types"
import { PayloadAction } from "@reduxjs/toolkit"
import { searchDSLByDisplayName } from "@/redux/currentApp/components/componentsSelector"
import { RootState } from "@/store"
import { trackInEditor } from "@/utils/mixpanelHelper"

export const componentsOperationReport = (
  reduxAction: string,
  currentAppID: string,
  action: PayloadAction<any>,
  teamID: string,
  uid: string,
  prevRootState: RootState,
  _nextRootState: RootState,
) => {
  switch (reduxAction) {
    case "addComponentReducer": {
      const payload = action.payload as ComponentTreeNode[]
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.ADD, {
        element: "component",
        parameter1: payload.map((node) => node.type),
      })
      break
    }
    case "deleteComponentNodeReducer": {
      const payload = action.payload.displayNames as string[]
      const source = action.payload.source
      const nodes = payload
        .map((displayName) =>
          searchDSLByDisplayName(displayName, prevRootState),
        )
        .filter((node) => node)
      const types = nodes.map((node) => node.type)
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.DELETE, {
        element: "component",
        parameter1: types,
        parameter3: source,
      })
      break
    }
  }
}
