import { FC, SyntheticEvent } from "react"
import { useDispatch } from "react-redux"
import { css } from "@emotion/react"
import { ACTION_TYPE, PanelHeaderActionProps } from "./interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { configActions } from "@/redux/config/configSlice"
import {
  actionMenuContaninterStyle,
  baseActionMenuItemStyle,
  deleteActionMenuItemStyle,
} from "./style"
import { useTranslation } from "react-i18next"

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const {
    widgetDisplayName,
    componentType,
    widgetParentDisplayName,
    handleCloseMenu,
  } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const handleClickMenuItem = (e: SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      handleCloseMenu()
      return
    }
    const key = e.target.dataset["key"]
    switch (key) {
      case ACTION_TYPE.VIEW_DOCUMENT: {
        //  TODO: wait for redux to find componentType map docs;
        // getComponentDoc(componentType)
        window.open("https://www.baidu.com")
        break
      }
      case ACTION_TYPE.SWITCH_COMPONENT: {
        //  TODO: wait to do smt
        console.log("SwitchComponent")
        break
      }
      case ACTION_TYPE.RESET_STATE: {
        //  TODO: wait for componentDSL to change redux DSL
        console.log("ResetState")
        break
      }
      case ACTION_TYPE.DELETE: {
        dispatch(
          componentsActions.deleteComponentNodeReducer({
            displayName: widgetDisplayName,
            parentDisplayName: widgetParentDisplayName,
          }),
        )
        dispatch(configActions.clearSelectedComponent())
        break
      }
    }
    handleCloseMenu()
  }

  return (
    <div css={actionMenuContaninterStyle} onClick={handleClickMenuItem}>
      <div css={baseActionMenuItemStyle} data-key={ACTION_TYPE.VIEW_DOCUMENT}>
        {t("editor.inspect.header.action_menu.view_documentation")}
      </div>
      <div css={baseActionMenuItemStyle} data-key={ACTION_TYPE.RESET_STATE}>
        {t("editor.inspect.header.action_menu.reset_state")}
      </div>
      <div
        css={css(baseActionMenuItemStyle, deleteActionMenuItemStyle)}
        data-key={ACTION_TYPE.DELETE}
      >
        {t("editor.inspect.header.action_menu.delete")}
      </div>
    </div>
  )
}

ActionMenu.displayName = "ActionMenu"
