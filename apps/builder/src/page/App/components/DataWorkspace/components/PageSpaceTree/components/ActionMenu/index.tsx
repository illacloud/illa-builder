import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { DropList, DropListItem } from "@illa-design/react"
import { getCurrentPageSortedKeys } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { ActionMenuProps } from "./interface"

export const ActionMenu: FC<ActionMenuProps> = (props) => {
  const { pageDisplayName, isParentPage, parentPageName, openRenameModal } =
    props
  const { t } = useTranslation()

  const pageDisplayNames = useSelector(getCurrentPageSortedKeys)

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
      element: "manage_page",
    })
  }, [])

  const handleClickSetHomePage = useCallback(() => {
    if (!pageDisplayName) return
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "set_home_page",
    })
    if (isParentPage) {
      dispatch(
        componentsActions.updateRootNodePropsReducer({
          homepageDisplayName: pageDisplayName,
        }),
      )
    }
    if (!isParentPage && parentPageName) {
      dispatch(
        componentsActions.updateDefaultSubPagePathReducer({
          pageName: parentPageName,
          subPagePath: pageDisplayName,
        }),
      )
    }
  }, [dispatch, isParentPage, pageDisplayName, parentPageName])

  const handleDeletePage = useCallback(() => {
    if (isParentPage && pageDisplayNames.length > 1) {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "delete_page",
      })
      shortcut.showDeleteDialog([pageDisplayName], "page", {
        originPageSortedKey: pageDisplayNames,
      })
    }
    if (!isParentPage && parentPageName) {
      shortcut.showDeleteDialog([pageDisplayName], "subpage", {
        parentPageName: parentPageName,
      })
    }
  }, [
    isParentPage,
    pageDisplayName,
    pageDisplayNames,
    parentPageName,
    shortcut,
  ])

  const handleClickRename = useCallback(() => {
    openRenameModal()
  }, [openRenameModal])

  return (
    <DropList minW="184px">
      <DropListItem
        value="setHomePage"
        title={
          isParentPage
            ? t("editor.page.label_name.set_as_homepage")
            : t("editor.page.label_name.set_as_default_subpage")
        }
        onClick={handleClickSetHomePage}
      />
      <DropListItem
        value="RenameURL"
        title={
          isParentPage
            ? t("widget.page.label.rename_page_url")
            : t("widget.page.label.rename_url")
        }
        onClick={handleClickRename}
      />
      <DropListItem
        value="delete"
        title={t("editor.inspect.header.action_menu.delete")}
        deleted
        onClick={handleDeletePage}
      />
    </DropList>
  )
}

ActionMenu.displayName = "ActionMenu"
