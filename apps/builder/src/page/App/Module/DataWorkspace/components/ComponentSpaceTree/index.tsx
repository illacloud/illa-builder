import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeGroup } from "@/page/App/Module/DataWorkspace/components/WorkSpaceTreeGroup"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getCurrentPageBodyWidgetTree,
  getCurrentPageFooterWidgetTree,
  getCurrentPageHeaderWidgetTree,
  getCurrentPageLeftWidgetTree,
  getCurrentPageModalWidgetTree,
  getCurrentPageRightWidgetTree,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import {
  autoChangeContainersIndexWhenClick,
  autoChangeWhenClickOnCanvas,
} from "@/utils/componentNode/search"
import { ClickPosition, FocusManager } from "@/utils/focusManager"
import { BaseDataItem } from "../BaseDataItem"

export const ComponentSpaceTree: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const footerSectionTree = useSelector(getCurrentPageFooterWidgetTree)
  const leftSectionTree = useSelector(getCurrentPageLeftWidgetTree)
  const rightSectionTree = useSelector(getCurrentPageRightWidgetTree)
  const headerSectionTree = useSelector(getCurrentPageHeaderWidgetTree)
  const bodySectionTree = useSelector(getCurrentPageBodyWidgetTree)
  const modalSectionTree = useSelector(getCurrentPageModalWidgetTree)
  const selectedComponent = useSelector(getSelectedComponentDisplayNames)

  const handleClick = useCallback(
    (displayName: string, type: string) => {
      const clickPosition: ClickPosition = {
        displayName,
        type: "component",
        clickPosition: [],
      }
      if (type === "CANVAS") {
        displayName = autoChangeWhenClickOnCanvas(displayName)
        clickPosition.type = "inner_container"
        clickPosition.clickPosition = [0, 0]
      }
      FocusManager.switchFocus("data_component", clickPosition)
      if (type === "MODAL_WIDGET") {
        dispatch(
          executionActions.updateModalDisplayReducer({
            displayName,
            display: true,
          }),
        )
      }
      if (displayName) {
        dispatch(configActions.updateSelectedComponent([displayName]))
        autoChangeContainersIndexWhenClick(displayName)
        setTimeout(() => {
          const dom = document.querySelector(
            `[data-displayname="${displayName}"]`,
          )
          dom?.scrollIntoView({ behavior: "smooth", block: "center" })
        }, 160)
      }
    },
    [dispatch],
  )

  return (
    <PanelBar
      title={t("editor.data_work_space.components_title")}
      destroyChildrenWhenClose
    >
      {modalSectionTree.length > 0 && (
        <>
          <WorkSpaceTreeGroup
            title={t("editor.data_work_space.component_layer.floating")}
          >
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
                onClick={handleClick}
                selectedDisplayNames={selectedComponent}
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}
      <WorkSpaceTreeGroup title={t("editor.page.label_name.body")}>
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
            onClick={handleClick}
            selectedDisplayNames={selectedComponent}
          />
        ))}
      </WorkSpaceTreeGroup>

      {headerSectionTree.length > 0 && (
        <>
          <WorkSpaceTreeGroup title={t("editor.page.label_name.header")}>
            {headerSectionTree.map((tree) => (
              <BaseDataItem
                key={tree.displayName}
                title={tree.displayName}
                value={tree}
                level={0}
                dataType="widget"
                type={tree.$widgetType as string}
                canExpand={tree.$childrenNode.length > 0}
                onClick={handleClick}
                selectedDisplayNames={selectedComponent}
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      {leftSectionTree.length > 0 && (
        <>
          <WorkSpaceTreeGroup title={t("editor.page.label_name.left_panel")}>
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
                onClick={handleClick}
                selectedDisplayNames={selectedComponent}
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      {rightSectionTree.length > 0 && (
        <>
          <WorkSpaceTreeGroup title={t("editor.page.label_name.right_panel")}>
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
                onClick={handleClick}
                selectedDisplayNames={selectedComponent}
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}

      {footerSectionTree.length > 0 && (
        <>
          <WorkSpaceTreeGroup title={t("editor.page.label_name.footer")}>
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
                onClick={handleClick}
                selectedDisplayNames={selectedComponent}
              />
            ))}
          </WorkSpaceTreeGroup>
        </>
      )}
    </PanelBar>
  )
}

ComponentSpaceTree.displayName = "ComponentSpaceTree"
