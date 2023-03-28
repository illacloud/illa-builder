import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { PlusIcon, Trigger, omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { customIconHotpotStyle } from "@/components/PanelBar/style"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import { getGlobalInfoExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { CreateGlobalStateModal } from "./createGlobalStateModal"

export const GlobalsSpaceTree: FC = () => {
  const { t } = useTranslation()

  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PanelBar
      title={`${t("editor.data_work_space.globals_title")}(${
        globalInfoList.length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("dataWorkspace_action")
      }}
      customIcon={
        <Trigger
          trigger="click"
          colorScheme="white"
          withoutPadding
          withoutShadow
          position="right"
          zIndex={10}
          showArrow={false}
          content={
            <CreateGlobalStateModal
              onClose={() => {
                setIsOpen(false)
              }}
              actionType="ADD"
            />
          }
          popupVisible={isOpen}
        >
          <div
            css={customIconHotpotStyle}
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(true)
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
          canEdit={data.displayName === "globalData"}
        />
      ))}
    </PanelBar>
  )
}

GlobalsSpaceTree.displayName = "GlobalsSpaceTree"
