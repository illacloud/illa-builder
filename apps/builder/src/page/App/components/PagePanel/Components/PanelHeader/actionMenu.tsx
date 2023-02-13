import { FC, useCallback, useContext } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  DropList,
  DropListItem,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { defaultPageProps } from "@/utils/generators/generatePageOrSectionConfig"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { PanelHeaderActionProps } from "./interface"

export const ActionMenu: FC<PanelHeaderActionProps> = (props) => {
  const { pageDisplayName, pageKeys } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const shortcut = useContext(ShortCutContext)

  const handleClickDropListItem = useCallback(() => {
    if (!pageDisplayName) return
    const targetNode = searchDSLByDisplayName(pageDisplayName) as ComponentNode
    const newComponentNode: ComponentNode = {
      ...targetNode,
      props: {
        ...defaultPageProps,
      },
    }
    dispatch(componentsActions.resetComponentPropsReducer(newComponentNode))
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
