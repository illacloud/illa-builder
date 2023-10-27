import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeGroup } from "@/page/App/Module/DataWorkspace/components/WorkSpaceTreeGroup"
import {
  getCurrentPageBodyWidgetTree,
  getCurrentPageFooterWidgetTree,
  getCurrentPageHeaderWidgetTree,
  getCurrentPageLeftWidgetTree,
  getCurrentPageModalWidgetTree,
  getCurrentPageRightWidgetTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { BaseDataItem } from "../BaseDataItem"
import { dividerStyle } from "./style"

export const ComponentSpaceTree: FC = () => {
  const { t } = useTranslation()
  // const dispatch = useDispatch()

  // const modalWidgetExecutionArray = useSelector(
  //   getCurrentPageModalWidgetExecutionResultArray,
  // )
  const footerSectionTree = useSelector(getCurrentPageFooterWidgetTree)

  const leftSectionTree = useSelector(getCurrentPageLeftWidgetTree)

  const rightSectionTree = useSelector(getCurrentPageRightWidgetTree)

  const headerSectionTree = useSelector(getCurrentPageHeaderWidgetTree)

  const bodySectionTree = useSelector(getCurrentPageBodyWidgetTree)
  const modalSectionTree = useSelector(getCurrentPageModalWidgetTree)
  console.log("modalSectionTree", modalSectionTree)
  // const selectedComponents = useSelector(getSelectedComponentDisplayNames)

  // const handleGeneralComponentSelect = useCallback(
  //   (selectedKeys: string[]) => {
  //     dispatch(configActions.updateSelectedComponent(selectedKeys))
  //   },
  //   [dispatch],
  // )

  // const handleModalComponentSelect = useCallback(
  //   (selectedKeys: string[]) => {
  //     dispatch(
  //       executionActions.updateModalDisplayReducer({
  //         displayName: selectedKeys[0],
  //         display: true,
  //       }),
  //     )
  //     dispatch(configActions.updateSelectedComponent(selectedKeys))
  //   },
  //   [dispatch],
  // )

  return (
    <PanelBar
      title={t("editor.data_work_space.components_title") + `(${0})`}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_component")
      }}
      destroyChildrenWhenClose
    >
      {modalSectionTree.length > 0 && (
        <WorkSpaceTreeGroup title="Modal">
          {modalSectionTree.map((tree) => (
            <BaseDataItem
              key={tree.displayName}
              title={tree.displayName}
              value={tree}
              level={0}
              dataType="widget"
              type={tree.$widgetType as string}
              canExpand
              haveMoreAction
              canFocused
            />
          ))}
        </WorkSpaceTreeGroup>
      )}
      {headerSectionTree.length > 0 && (
        <>
          <Divider css={dividerStyle} />
          <WorkSpaceTreeGroup title="Header">
            {headerSectionTree.map((tree) => (
              <BaseDataItem
                key={tree.displayName}
                title={tree.displayName}
                value={tree}
                level={0}
                dataType="widget"
                type={tree.$widgetType as string}
                canExpand={tree.$childrenNode.length > 0}
                canFocused
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      <Divider css={dividerStyle} />
      <WorkSpaceTreeGroup title="Body">
        {bodySectionTree.map((tree) => (
          <BaseDataItem
            key={tree.displayName}
            title={tree.displayName}
            value={tree}
            level={0}
            dataType="widget"
            type={tree.$widgetType as string}
            canExpand={tree.$childrenNode.length > 0}
            haveMoreAction
            canFocused
          />
        ))}
      </WorkSpaceTreeGroup>

      {leftSectionTree.length > 0 && (
        <>
          <Divider css={dividerStyle} />
          <WorkSpaceTreeGroup title="Left Panel">
            {leftSectionTree.map((tree) => (
              <BaseDataItem
                key={tree.displayName}
                title={tree.displayName}
                value={tree}
                level={0}
                dataType="widget"
                type={tree.$widgetType as string}
                canExpand={tree.$childrenNode.length > 0}
                haveMoreAction
                canFocused
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      {rightSectionTree.length > 0 && (
        <>
          <Divider css={dividerStyle} />
          <WorkSpaceTreeGroup title="Right Panel">
            {rightSectionTree.map((tree) => (
              <BaseDataItem
                key={tree.displayName}
                title={tree.displayName}
                value={tree}
                level={0}
                dataType="widget"
                type={tree.$widgetType as string}
                canExpand={tree.$childrenNode.length > 0}
                haveMoreAction
                canFocused
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      {footerSectionTree.length > 0 && (
        <>
          <Divider css={dividerStyle} />

          <WorkSpaceTreeGroup title="Footer Panel">
            {footerSectionTree.map((tree) => (
              <BaseDataItem
                key={tree.displayName}
                title={tree.displayName}
                value={tree}
                level={0}
                dataType="widget"
                type={tree.$widgetType as string}
                canExpand={tree.$childrenNode.length > 0}
                haveMoreAction
                canFocused
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}
    </PanelBar>
  )
}

ComponentSpaceTree.displayName = "ComponentSpaceTree"
