import { FC, useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { DropList, globalColor, illaPrefix } from "@illa-design/react"
import { PanelHeaderActionProps } from "./interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { defaultPageProps } from "@/utils/generators/generatePageOrSectionConfig"

const { Item } = DropList

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
    <DropList width="184px">
      <Item
        key="reset"
        title={t("editor.inspect.header.action_menu.reset_state")}
        onClick={handleClickDropListItem}
      />
      {pageKeys.length > 1 && (
        <Item
          key="delete"
          title={t("editor.inspect.header.action_menu.delete")}
          fontColor={globalColor(`--${illaPrefix}-red-03`)}
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
