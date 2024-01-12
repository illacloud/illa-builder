import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { SectionViewShape } from "@illa-public/public-types"
import { klona } from "klona/json"
import { set } from "lodash-es"
import { FC, useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ShortCutContext } from "@/utils/shortcut/shortcutProvider"
import { BodyProps } from "./interface"
import { Item } from "./item"
import { viewsListBodyWrapperStyle } from "./style"

export const ListBody: FC<BodyProps> = (props) => {
  const {
    sectionViewConfigs,
    viewSortedKey,
    parentNodeDisplayName,
    sectionName,
  } = props
  const dispatch = useDispatch()
  const shortcut = useContext(ShortCutContext)

  const handleDeleteSectionView = useCallback(
    (index: number) => {
      if (index > sectionViewConfigs.length) return
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "delete_view",
        parameter2: sectionName.slice(0, -7),
      })
      const config = sectionViewConfigs[index] as SectionViewShape
      const viewDisplayName = config.viewDisplayName
      shortcut.showDeleteDialog([config.path], "pageView", {
        parentNodeName: parentNodeDisplayName,
        originPageSortedKey: viewSortedKey,
        viewDisplayName: viewDisplayName,
      })
    },
    [
      parentNodeDisplayName,
      sectionName,
      sectionViewConfigs,
      shortcut,
      viewSortedKey,
    ],
  )

  const handleUpdateItem = useCallback(
    (path: string, value: string) => {
      const newSectionViewConfigs = klona(sectionViewConfigs)
      set(newSectionViewConfigs, path, value)
      dispatch(
        componentsActions.updateSectionViewPropsReducer({
          parentNodeName: parentNodeDisplayName,
          newProps: {
            sectionViewConfigs: newSectionViewConfigs,
          },
        }),
      )
    },
    [dispatch, parentNodeDisplayName, sectionViewConfigs],
  )

  return (
    <div css={viewsListBodyWrapperStyle}>
      {sectionViewConfigs.map((config: SectionViewShape, index: number) => {
        const otherPaths = (
          sectionViewConfigs.map(
            (views: SectionViewShape, i: number) => views.path || i,
          ) as string[]
        ).filter((key: string, i: number) => i != index)
        return (
          <Item
            key={config.id}
            otherPaths={otherPaths}
            path={config.path}
            viewDisplayName={config.viewDisplayName}
            index={index}
            attrPath={`${index}`}
            handleDeleteSectionView={handleDeleteSectionView}
            handleUpdateItem={handleUpdateItem}
            parentNodeDisplayName={parentNodeDisplayName}
          />
        )
      })}
    </div>
  )
}
