import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { PlusIcon, Trigger, omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { customIconHotpotStyle } from "@/components/PanelBar/style"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import {
  getGlobalDataExecutionResult,
  getGlobalInfoExecutionResult,
} from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { GlobalStateTreeNode } from "../WorkSpaceTreeItem/globalStateTreeNode"
import { CreateGlobalStateModal } from "./createGlobalStateModal"

export const GlobalsSpaceTree: FC = () => {
  const { t } = useTranslation()

  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
  const globalStateList = useSelector(getGlobalDataExecutionResult)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PanelBar
      title={`${t("editor.data_work_space.globals_title")}(${
        globalInfoList.length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_global_state")
      }}
      customIcon={
        <Trigger
          trigger="click"
          colorScheme="white"
          withoutPadding
          withoutShadow
          position="right"
          showArrow={false}
          clickOutsideToClose
          content={
            <CreateGlobalStateModal
              onClose={() => {
                setIsOpen(false)
              }}
              actionType="ADD"
            />
          }
          popupVisible={isOpen}
          onVisibleChange={(visible) => {
            if (visible) {
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
                element: "global_modal",
                parameter2: "add",
              })
            }
            setIsOpen(visible)
          }}
        >
          <div
            css={customIconHotpotStyle}
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(true)
              trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
                element: "global_add",
              })
            }}
          >
            <PlusIcon />
          </div>
        </Trigger>
      }
      destroyChildrenWhenClose
    >
      {globalInfoList.map((data) => (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
          level={0}
          parentKey={data.displayName}
        />
      ))}
      <GlobalStateTreeNode
        title="globalData"
        level={0}
        data={globalStateList}
        parentKey="globalData"
      />
    </PanelBar>
  )
}

GlobalsSpaceTree.displayName = "GlobalsSpaceTree"
