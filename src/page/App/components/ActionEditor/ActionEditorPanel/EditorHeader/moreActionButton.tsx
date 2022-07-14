import { FC, useCallback, useContext, useState } from "react"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { Button } from "@illa-design/button"
import { MoreIcon } from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { TriggerProps } from "@illa-design/trigger"
import { moreBtnMenuStyle, moreBtnStyle } from "./style"
import { ACTION_EDITOR_CONTEXT } from "@/page/App/components/ActionEditor/ActionEditorPanel/context/ActionEditorPanelContext"

const { Item } = DropList

const triggerProps: TriggerProps = {
  position: "br",
  clickOutsideToClose: true,
  closeOnClick: true,
  openDelay: 0,
  closeDelay: 0,
  showArrow: false,
}

const DropDownList: FC = () => {
  const { t } = useTranslation()

  const { onDuplicateActionItem, onDeleteActionItem } = useContext(
    ACTION_EDITOR_CONTEXT,
  )
  const onClickItemDropList = useCallback(
    (key: string) => {
      switch (key) {
        case "duplicate":
          onDuplicateActionItem()
          break
        case "delete":
          onDeleteActionItem()
          break
      }
    },
    [onDuplicateActionItem, onDeleteActionItem],
  )

  return (
    <DropList css={moreBtnMenuStyle} onClickItem={onClickItemDropList}>
      <Item
        key="duplicate"
        title={t("editor.action.panel.menu.more.duplicate")}
      />
      <Item
        key="delete"
        title={t("editor.action.panel.menu.more.delete")}
        fontColor={globalColor(`--${illaPrefix}-red-03`)}
      />
    </DropList>
  )
}

DropDownList.displayName = "DropDownList"

export const ActionEditorHeaderMoreButton: FC = () => {
  const [moreBtnMenuVisible, setMoreBtnMenuVisible] = useState(false)
  const activeActionItem = useSelector(getSelectedAction)

  return (
    <Dropdown
      dropList={<DropDownList />}
      trigger="click"
      popupVisible={moreBtnMenuVisible}
      onVisibleChange={setMoreBtnMenuVisible}
      disabled={activeActionItem.actionId === ""}
      triggerProps={triggerProps}
    >
      <Button
        css={moreBtnStyle}
        buttonRadius="8px"
        size="medium"
        leftIcon={<MoreIcon />}
        colorScheme="grayBlue"
      />
    </Dropdown>
  )
}

ActionEditorHeaderMoreButton.displayName = "ActionEditorHeaderMoreButton"
