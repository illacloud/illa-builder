import { getIconFromWidgetType } from "@illa-public/icon"
import { FC, useState } from "react"
import useMeasure from "react-use-measure"
import { CaretRightIcon, getColor } from "@illa-design/react"
import { ReactComponent as LocateIcon } from "@/assets/dataWorkspace/locate.svg"
import { ReactComponent as StateIcon } from "@/assets/dataWorkspace/state.svg"
import IconHotSpot from "@/components/IconHotSpot"
import { MovableModal } from "@/components/Modal/movableModal"
import { MoreAction } from "../MoreAction"
import { WorkSpaceTreeNode } from "../WorkSpaceTreeItem/WorkSpaceTreeNode"
import { BaseDataItemProps } from "./interface"
import {
  applyExpandIconStyle,
  expendContainerStyle,
  iconContainerStyle,
  itemContainerStyle,
  modalBodyContainerStyle,
  outerContainerStyle,
  rectangleStyle,
  titleAndIconContainerStyle,
  titleStyle,
} from "./style"

export const BaseDataItem: FC<BaseDataItemProps> = (props) => {
  const {
    title,
    type,
    level,
    canExpand,
    canFocused,
    haveMoreAction,
    value,
    onClick,
    dataType,
    selectedDisplayNames,
  } = props
  const [isOpenCodeModal, setIsOpenCodeModal] = useState(false)
  const [measureRef, rect] = useMeasure()

  const isSelected = selectedDisplayNames?.includes(title) ?? false

  const handleClickOnContainer = () => {
    onClick?.(title, type ?? "")
  }

  return (
    <>
      <div
        css={outerContainerStyle(isSelected)}
        ref={measureRef}
        onClick={handleClickOnContainer}
      >
        <div css={itemContainerStyle(level)}>
          <div css={expendContainerStyle}>
            <span css={applyExpandIconStyle(false, !!canExpand)}>
              <CaretRightIcon />
            </span>
            {!!type && level >= 1 && <div css={rectangleStyle} />}
            <div css={titleAndIconContainerStyle}>
              {!!type && getIconFromWidgetType(type, "16px")}
              <span css={titleStyle}> {title}</span>
            </div>
          </div>
          <div css={iconContainerStyle} id="action-bar">
            {canFocused && (
              <IconHotSpot inactiveColor={getColor("grayBlue", "02")}>
                <LocateIcon />
              </IconHotSpot>
            )}
            <IconHotSpot onClick={() => setIsOpenCodeModal(true)}>
              <StateIcon />
            </IconHotSpot>
            {haveMoreAction && (
              <MoreAction displayName={title} actionType={dataType} />
            )}
          </div>
        </div>
      </div>
      {dataType === "widget" &&
        Array.isArray(value.$childrenNode) &&
        value.$childrenNode.map((item) => (
          <BaseDataItem
            key={item.displayName}
            title={item.displayName}
            value={item}
            level={level + 1}
            dataType="widget"
            type={item.$widgetType as string}
            canExpand={item.$childrenNode.length > 0}
            haveMoreAction={item.$widgetType.endsWith("_WIDGET")}
            canFocused={item.$widgetType.endsWith("_WIDGET")}
            selectedDisplayNames={selectedDisplayNames}
            onClick={onClick}
          />
        ))}
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
          docLink={`${value.type}` ?? ""}
          defaultPosition={{
            x: rect.right,
            y: rect.top,
            width: 320,
            height: 214,
          }}
        />
      )}
    </>
  )
}
