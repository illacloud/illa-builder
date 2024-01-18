import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC, useContext } from "react"
import { useTranslation } from "react-i18next"
import {
  DropList,
  DropListItem,
  Dropdown,
  MoreIcon,
  getColor,
} from "@illa-design/react"
import { onCopyActionItem } from "@/page/App/components/Actions/api"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import store from "@/store"
import { CopyManager } from "@/utils/copyManager"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { MoreActionProps } from "./interface"

export const MoreAction: FC<MoreActionProps> = (props) => {
  const { displayName, actionType } = props
  const { t } = useTranslation()
  const shortcut = useContext(ShortCutContext)

  const handleClickDelete = () => {
    shortcut.showDeleteDialog([displayName], actionType)
  }

  const handleClickCopy = () => {
    switch (actionType) {
      case "action": {
        const actionList = getActionList(store.getState())
        const targetAction = actionList.find(
          (action) => action.displayName === displayName,
        )
        if (targetAction) {
          onCopyActionItem(targetAction)
        }
        break
      }
      case "widget": {
        CopyManager.copyComponentNodeByDisplayName([displayName])
        CopyManager.paste("duplicate")
        break
      }
    }
  }

  return (
    <Dropdown
      dropList={
        <DropList w="200px">
          <DropListItem
            value="duplicate"
            title={t("editor.action.action_list.contextMenu.duplicate")}
            onClick={handleClickCopy}
          />
          <DropListItem
            value="delete"
            title={t("editor.action.action_list.contextMenu.delete")}
            deleted
            onClick={handleClickDelete}
          />
        </DropList>
      }
    >
      <IconHotSpot inactiveColor={getColor("grayBlue", "02")}>
        <MoreIcon />
      </IconHotSpot>
    </Dropdown>
  )
}
