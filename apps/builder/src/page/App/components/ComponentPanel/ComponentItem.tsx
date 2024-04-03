import { UpgradeIcon } from "@illa-public/icon"
import { isSubscribeForUseDrive } from "@illa-public/upgrade-modal/utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { isCloudVersion } from "@illa-public/utils"
import { FC, memo } from "react"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"
import { ComponentItemProps } from "@/page/App/components/ComponentPanel/interface"
import { getIsILLAEditMode } from "@/redux/config/configSelector"
import { getClientWidgetLayoutInfo } from "@/redux/currentApp/layoutInfo/layoutInfoSelector"
import { getGuideStatus } from "@/redux/guide/guideSelector"
import store from "@/store"
import { endDragMultiNodes, startDragMultiNodes } from "@/utils/drag/drag"
import { generateWidgetLayoutInfo } from "@/utils/generators/generateComponentNode"
import { DropResultInfo } from "../DotPanel/components/Canvas/interface"
import { DEFAULT_BODY_COLUMNS_NUMBER } from "../DotPanel/constant/canvas"
import { illaSnapshot } from "../DotPanel/constant/snapshotNew"
import { sendShadowMessageHandler } from "../DotPanel/utils/sendBinaryMessage"
import {
  DRAG_EFFECT,
  DragInfo,
} from "../ScaleSquare/components/DragContainer/interface"
import {
  iconStyle,
  itemContainerStyle,
  nameStyle,
  upgradeIconStyle,
} from "./style"

export const ComponentItem: FC<ComponentItemProps> = memo(
  (props: ComponentItemProps) => {
    const { widgetName, widgetType, icon, displayName, isPremiumWidget } = props

    const isEditMode = useSelector(getIsILLAEditMode)
    const isGuideOpen = useSelector(getGuideStatus)
    const teamInfo = useSelector(getCurrentTeamInfo)!

    const [, dragRef] = useDrag<DragInfo, DropResultInfo>(
      () => ({
        type: "components",
        canDrag: () => {
          return isEditMode
        },
        end: (draggedItem, monitor) => {
          const dropResultInfo = monitor.getDropResult()
          const { draggedComponents } = draggedItem
          sendShadowMessageHandler(-1, "", [], 0, 0, 0, 0, 0, 0, 0, 0)
          endDragMultiNodes(
            draggedComponents,
            !!dropResultInfo?.isDropOnCanvas,
            true,
          )
        },
        item: () => {
          const widgetLayoutInfo = generateWidgetLayoutInfo(
            widgetType,
            displayName,
          )
          if (!widgetLayoutInfo) {
            return {
              draggedComponents: [],
              dragEffect: DRAG_EFFECT.ADD,
              draggedDisplayName: "",
              unitWWhenDragged: 0,
              columnNumberWhenDragged: DEFAULT_BODY_COLUMNS_NUMBER,
            }
          }
          const rootState = store.getState()
          let allWidgetLayoutInfo = getClientWidgetLayoutInfo(rootState)
          illaSnapshot.setSnapshot(allWidgetLayoutInfo)
          startDragMultiNodes([widgetLayoutInfo])
          return {
            draggedComponents: [widgetLayoutInfo],
            dragEffect: DRAG_EFFECT.ADD,
            draggedDisplayName: widgetLayoutInfo.displayName,
            unitWWhenDragged: 0,
            columnNumberWhenDragged: DEFAULT_BODY_COLUMNS_NUMBER,
          }
        },
      }),
      [isEditMode],
    )

    return (
      <div
        css={itemContainerStyle}
        ref={dragRef}
        {...(isGuideOpen ? { "data-onboarding-element": widgetType } : {})}
      >
        <span
          css={iconStyle}
          {...(isGuideOpen ? { "data-onboarding-icon": widgetType } : {})}
        >
          {isPremiumWidget &&
            isCloudVersion &&
            !isSubscribeForUseDrive(teamInfo) && (
              <span css={upgradeIconStyle}>
                <UpgradeIcon />
              </span>
            )}
          {icon}
        </span>
        <span css={nameStyle}>{widgetName}</span>
      </div>
    )
  },
)

ComponentItem.displayName = "ComponentItem"
