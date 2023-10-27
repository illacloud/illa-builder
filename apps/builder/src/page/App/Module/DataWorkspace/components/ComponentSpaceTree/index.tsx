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
import { FocusManager } from "@/utils/focusManager"
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

  const baseClickHandler = useCallback(
    (displayName: string) => {
      dispatch(configActions.updateSelectedComponent([displayName]))
    },
    [dispatch],
  )

  const handleClickOnModalSection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      if (type === "MODAL_WIDGET") {
        dispatch(
          executionActions.updateModalDisplayReducer({
            displayName,
            display: true,
          }),
        )
      }
      baseClickHandler(displayName)
    },
    [baseClickHandler, dispatch],
  )

  const handleClickOnHeaderSection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      baseClickHandler(displayName)
    },
    [baseClickHandler],
  )

  const handleClickOnBodySection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      baseClickHandler(displayName)
    },
    [baseClickHandler],
  )

  const handleClickOnLeftSection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      baseClickHandler(displayName)
    },
    [baseClickHandler],
  )

  const handleClickOnRightSection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      baseClickHandler(displayName)
    },
    [baseClickHandler],
  )

  const handleClickOnFooterSection = useCallback(
    (displayName: string, type: string) => {
      if (!type.endsWith("_WIDGET")) return
      baseClickHandler(displayName)
    },
    [baseClickHandler],
  )

  return (
    <PanelBar
      title={t("editor.data_work_space.components_title")}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_component")
      }}
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
                onClick={handleClickOnModalSection}
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
            onClick={handleClickOnBodySection}
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
                onClick={handleClickOnHeaderSection}
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
                onClick={handleClickOnLeftSection}
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
                onClick={handleClickOnRightSection}
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
                onClick={handleClickOnFooterSection}
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
