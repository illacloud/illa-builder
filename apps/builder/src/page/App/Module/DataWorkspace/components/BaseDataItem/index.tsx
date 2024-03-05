import { getIconFromWidgetType } from "@illa-public/icon"
import IconHotSpot from "@illa-public/icon-hot-spot"
import { getDocLink } from "@illa-public/public-configs"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CaretRightIcon } from "@illa-design/react"
import StateIcon from "@/assets/dataWorkspace/state.svg?react"
import { MovableModal } from "@/components/Modal/movableModal"
import { panelBarItemContainerAnimationVariants } from "@/components/PanelBar/style"
import { ViewItemShape } from "@/page/App/components/InspectPanel/PanelSetters/TabsSetter/TabListSetter/interface"
import { getExpandedWidgets } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { MoreAction } from "../MoreAction"
import { WorkSpaceTreeNode } from "../WorkSpaceTreeItem/WorkSpaceTreeNode"
import { BaseDataItemProps } from "./interface"
import {
  applyExpandIconStyle,
  expendContainerStyle,
  iconContainerStyle,
  itemContainerStyle,
  itemContentStyle,
  modalBodyContainerStyle,
  outerContainerStyle,
  rectangleStyle,
  titleAndIconContainerStyle,
  titleStyle,
} from "./style"

const formatModalTitle = (index: number) => {
  switch (index) {
    case 0: {
      return "header"
    }
    case 1: {
      return "body"
    }
    case 2: {
      return "footer"
    }
    default: {
      return "container"
    }
  }
}

export const BaseDataItem: FC<BaseDataItemProps> = (props) => {
  const {
    title,
    fakeTitle,
    type,
    level,
    canExpand,
    haveMoreAction,
    value,
    onClick,
    dataType,
    selectedDisplayNames,
  } = props
  const [isOpenCodeModal, setIsOpenCodeModal] = useState(false)
  const expandedStatus = useSelector(getExpandedWidgets)
  const isExpanded = (canExpand ?? false) && (expandedStatus?.[title] ?? false)

  const isSelected = selectedDisplayNames?.includes(title) ?? false
  const dispatch = useDispatch()
  const handleClickOnContainer = () => {
    onClick?.(title, type ?? "")
  }

  const handleClickOnExpandIcon = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isExpanded) {
      dispatch(configActions.addExpandedWidgetReducer([title]))
    } else {
      dispatch(configActions.removeExpandWidgetReducer([title]))
    }
  }

  return (
    <>
      <div
        css={outerContainerStyle(isSelected, !!canExpand)}
        onClick={handleClickOnContainer}
        id={`${title}-baseDataItemContainer`}
      >
        <div css={itemContainerStyle(level)}>
          <div css={expendContainerStyle}>
            <span
              css={applyExpandIconStyle(isExpanded, !!canExpand, isSelected)}
              onClick={handleClickOnExpandIcon}
              id="expand-icon"
            >
              <CaretRightIcon />
            </span>
            {!!type && level >= 1 && <div css={rectangleStyle} />}
            <div css={titleAndIconContainerStyle}>
              {!!type && getIconFromWidgetType(type, "16px")}
              <span css={titleStyle}>{fakeTitle ?? title}</span>
            </div>
          </div>
          <div css={iconContainerStyle} id="action-bar">
            {((dataType === "widget" &&
              (value.$widgetType as string).endsWith("_WIDGET")) ||
              dataType !== "widget") && (
              <IconHotSpot onClick={() => setIsOpenCodeModal(true)}>
                <StateIcon />
              </IconHotSpot>
            )}
            {haveMoreAction && (
              <MoreAction displayName={title} actionType={dataType} />
            )}
          </div>
        </div>
      </div>

      {dataType === "widget" && Array.isArray(value.$childrenNode) && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              css={itemContentStyle}
              variants={panelBarItemContainerAnimationVariants}
              animate={isExpanded ? "enter" : "exit"}
              transition={{ duration: 0.2 }}
              exit="exit"
            >
              {value.$childrenNode.map((item, index) => {
                if (value.$widgetType === "CONTAINER_WIDGET") {
                  if (!(value.viewList as ViewItemShape[])[index]) return null
                  return (
                    <BaseDataItem
                      key={item.displayName}
                      title={item.displayName}
                      fakeTitle={
                        (value.viewList as ViewItemShape[])[index].label
                      }
                      value={item}
                      level={level + 1}
                      dataType="widget"
                      type={item.$widgetType as string}
                      canExpand={item.$childrenNode.length > 0}
                      haveMoreAction={item.$widgetType.endsWith("_WIDGET")}
                      selectedDisplayNames={selectedDisplayNames}
                      onClick={onClick}
                    />
                  )
                }
                if (
                  value.$widgetType === "MODAL_WIDGET" ||
                  value.$widgetType === "FORM_WIDGET"
                ) {
                  return (
                    <BaseDataItem
                      key={item.displayName}
                      title={item.displayName}
                      fakeTitle={formatModalTitle(index)}
                      value={item}
                      level={level + 1}
                      dataType="widget"
                      type={item.$widgetType as string}
                      canExpand={item.$childrenNode.length > 0}
                      haveMoreAction={item.$widgetType.endsWith("_WIDGET")}
                      selectedDisplayNames={selectedDisplayNames}
                      onClick={onClick}
                    />
                  )
                }
                if (
                  value.$widgetType === "LIST_WIDGET" ||
                  value.$widgetType === "GRID_LIST_WIDGET"
                )
                  return (
                    <BaseDataItem
                      key={item.displayName}
                      title={item.displayName}
                      fakeTitle="list template"
                      value={item}
                      level={level + 1}
                      dataType="widget"
                      type={item.$widgetType as string}
                      canExpand={item.$childrenNode.length > 0}
                      haveMoreAction={item.$widgetType.endsWith("_WIDGET")}
                      selectedDisplayNames={selectedDisplayNames}
                      onClick={onClick}
                    />
                  )

                return (
                  <BaseDataItem
                    key={item.displayName}
                    title={item.displayName}
                    value={item}
                    level={level + 1}
                    dataType="widget"
                    type={item.$widgetType as string}
                    canExpand={item.$childrenNode.length > 0}
                    haveMoreAction={item.$widgetType.endsWith("_WIDGET")}
                    selectedDisplayNames={selectedDisplayNames}
                    onClick={onClick}
                  />
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {isOpenCodeModal && (
        <MovableModal
          title={title}
          bodyContent={
            <div css={modalBodyContainerStyle}>
              {Object.keys(value)
                .filter((key) => !key.startsWith("$"))
                .map((key) => {
                  return (
                    <WorkSpaceTreeNode
                      key={key}
                      name={key}
                      value={value[key]}
                      itemKey={key}
                      level={0}
                      parentKey={title}
                    />
                  )
                })}
            </div>
          }
          onClose={() => {
            setIsOpenCodeModal(false)
          }}
          docLink={getDocLink(dataType, type)}
          defaultPosition={{
            x:
              document
                .querySelector(`#${title}-baseDataItemContainer`)
                ?.getBoundingClientRect().right ?? 0,
            y:
              document
                .querySelector(`#${title}-baseDataItemContainer`)
                ?.getBoundingClientRect().top ?? 0,
            width: 320,
            height: 214,
          }}
        />
      )}
    </>
  )
}
