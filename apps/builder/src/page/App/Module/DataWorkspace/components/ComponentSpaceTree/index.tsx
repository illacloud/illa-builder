import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
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
import { BaseDataItemContextProvider } from "../BaseDataItem/context"
import { dividerStyle } from "./style"

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

  const handleOnClick = useCallback(
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
      dispatch(configActions.updateSelectedComponent([displayName]))
    },
    [dispatch],
  )

  const handleOnFocus = useCallback((displayName: string) => {
    const dom = document.querySelector(`#${displayName}`)
    if (dom) {
      dom.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <PanelBar
      title={t("editor.data_work_space.components_title")}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_component")
      }}
      destroyChildrenWhenClose
    >
      <BaseDataItemContextProvider>
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
                onClick={handleOnClick}
                selectedDisplayNames={selectedComponent}
                onFocus={handleOnFocus}
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
                  onClick={handleOnClick}
                  selectedDisplayNames={selectedComponent}
                  onFocus={handleOnFocus}
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
              onClick={handleOnClick}
              selectedDisplayNames={selectedComponent}
              onFocus={handleOnFocus}
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
                  onClick={handleOnClick}
                  selectedDisplayNames={selectedComponent}
                  onFocus={handleOnFocus}
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
                  onClick={handleOnClick}
                  selectedDisplayNames={selectedComponent}
                  onFocus={handleOnFocus}
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
                  onClick={handleOnClick}
                  selectedDisplayNames={selectedComponent}
                  onFocus={handleOnFocus}
                />
              ))}
            </WorkSpaceTreeGroup>
          </>
        )}
      </BaseDataItemContextProvider>
    </PanelBar>
  )
}

ComponentSpaceTree.displayName = "ComponentSpaceTree"
