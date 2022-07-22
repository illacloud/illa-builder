import { FC } from "react"
import { CaretRightIcon, MoreIcon } from "@illa-design/icon"
import {
  actionTitleBarDisplayNameStyle,
  actionTitleBarRunStyle,
  actionTitleBarSpaceStyle,
  actionTitleBarStyle,
} from "@/page/App/components/Actions/ActionPanel/style"
import { Button } from "@illa-design/button"
import { WrappedEditableText } from "@/widgetLibrary/EditableWidget"
import { ActionTitleBarProps } from "@/page/App/components/Actions/ActionPanel/ActionTitleBar/interface"
import { useTranslation } from "react-i18next"
import { Dropdown, DropList } from "@illa-design/dropdown"
import { globalColor, illaPrefix } from "@illa-design/theme"

const Item = DropList.Item

export const ActionTitleBar: FC<ActionTitleBarProps> = (props) => {
  const { action } = props

  const { t } = useTranslation()

  return (
    <div css={actionTitleBarStyle}>
      <WrappedEditableText
        css={actionTitleBarDisplayNameStyle}
        colorScheme={"techPurple"}
        value={action.displayName}
        handleUpdateDsl={() => {}}
      />
      <div css={actionTitleBarSpaceStyle} />
      <Dropdown
        position="br"
        trigger="click"
        dropList={
          <DropList width={"184px"}>
            <Item
              key={"duplicate"}
              title={t("editor.action.action_list.contextMenu.duplicate")}
            />
            <Item
              key={"delete"}
              title={t("editor.action.action_list.contextMenu.delete")}
              fontColor={globalColor(`--${illaPrefix}-red-03`)}
            />
          </DropList>
        }
      >
        <Button colorScheme="grayBlue" leftIcon={<MoreIcon size="14px" />} />
      </Dropdown>
      <Button
        _css={actionTitleBarRunStyle}
        colorScheme="techPurple"
        variant="light"
        size="medium"
        leftIcon={<CaretRightIcon />}
      >
        {t("editor.action.panel.btn.run")}
      </Button>
    </div>
  )
}

ActionTitleBar.displayName = "ActionTitleBar"
