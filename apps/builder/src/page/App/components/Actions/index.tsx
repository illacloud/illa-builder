import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { FC, HTMLAttributes, useRef } from "react"
import { Divider } from "@illa-design/react"
import { DragBar } from "@/page/App/components/Actions/DragBar"
import { FocusManager } from "@/utils/focusManager"
import { resourceContextHelper } from "@/utils/mixpanelHelper"
import { ActionList } from "./ActionList"
import { ActionPanel } from "./ActionPanel"
import { applyActionEditorStyle, contentContainerStyle } from "./styles"

const ActionEditorDefaultHeight = 300

export const ActionEditor: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, ...rest } = props
  const panelRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className={className}
      css={applyActionEditorStyle(ActionEditorDefaultHeight)}
      onClick={() => {
        FocusManager.switchFocus("action")
      }}
      ref={panelRef}
      {...rest}
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
        <MixpanelTrackProvider
          pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
          basicTrack={resourceContextHelper("editor_resource_new")}
        >
          <ActionPanel />
        </MixpanelTrackProvider>
      </div>
    </div>
  )
}

ActionEditor.displayName = "ActionEditor"
