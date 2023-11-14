import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { FC, useRef } from "react"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import ActionGuidePanel from "@/page/App/components/Actions/ActionGuidePanel"
import { ActionList } from "@/page/App/components/Actions/ActionList"
import { ActionPanel } from "@/page/App/components/Actions/ActionPanel"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { getActionMixedList } from "@/redux/currentApp/action/actionSelector"
import { FocusManager } from "@/utils/focusManager"
import { resourceContextHelper } from "@/utils/mixpanelHelper"
import { applyActionEditorStyle, contentContainerStyle } from "./styles"

const ActionEditorDefaultHeight = 320

export const ActionEditor: FC = () => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const actionLists = useSelector(getActionMixedList)

  return (
    <div
      css={applyActionEditorStyle(ActionEditorDefaultHeight)}
      onClick={() => {
        FocusManager.switchFocus("action")
      }}
      ref={panelRef}
      data-onboarding-action="actionEditor"
    >
      <DragBar resizeRef={panelRef} minHeight={ActionEditorDefaultHeight} />
      <Divider direction="horizontal" />
      <div css={contentContainerStyle}>
        <MixpanelTrackProvider
          basicTrack={resourceContextHelper("editor_new")}
          pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
        >
          <ActionList />
        </MixpanelTrackProvider>
        {actionLists.length > 0 ? (
          <MixpanelTrackProvider
            pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
            basicTrack={resourceContextHelper("editor_resource_new")}
          >
            <ActionPanel />
          </MixpanelTrackProvider>
        ) : (
          <ActionGuidePanel />
        )}
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
