import { FC, useCallback, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { DropList, DropListItem } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { defaultPageProps } from "@/utils/generators/generatePageOrSectionConfig"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { PanelHeaderActionProps } from "./interface"

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { pageDisplayName, pageKeys } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "manage_page",
    })
  }, [])

  const handleClickDropListItem = useCallback(() => {
    if (!pageDisplayName) return
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "reset_page",
    })
    dispatch(
      componentsActions.updateComponentPropsReducer({
        displayName: pageDisplayName,
        updateSlice: defaultPageProps as unknown as Record<string, unknown>,
      }),
    )
  }, [dispatch, pageDisplayName])

  return (
    <DropList w="184px">
      <DropListItem
        value="reset"
        title={t("editor.inspect.header.action_menu.reset_state")}
        onClick={handleClickDropListItem}
      />
      {pageKeys.length > 1 && (
        <DropListItem
          value="delete"
          title={t("editor.inspect.header.action_menu.delete")}
          deleted
          onClick={() => {
            if (pageKeys.length === 1) {
              return
            }
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
              element: "delete_page",
            })
            shortcut.showDeleteDialog([pageDisplayName], "page", {
              originPageSortedKey: pageKeys,
            })
          }}
        />
      )}
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
