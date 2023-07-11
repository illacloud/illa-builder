import { FC, memo, useCallback } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as ChangeLayout } from "@/assets/change-layout.svg"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  PageNodeProps,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { ChangeVerticalLayoutBarProps } from "./interface"
import {
  changeLayoutVerticalBarStyle,
  changeVerticalLayoutBarWrapperStyle,
  changeVerticalLayoutLeftIconStyle,
} from "./style"

const ChangeVerticalLayoutBar: FC<ChangeVerticalLayoutBarProps> = (props) => {
  const { direction, currentPosition, currentPageName, targetSectionName } =
    props

  const dispatch = useDispatch()

  const changeAction = useCallback(() => {
    const newProps: Partial<PageNodeProps> = {
      layout: "Custom",
    }

    switch (currentPosition) {
      case SECTION_POSITION.TOP:
      case SECTION_POSITION.BOTTOM: {
        if (targetSectionName === "leftSection") {
          newProps.leftPosition = SECTION_POSITION.FULL
        } else {
          newProps.rightPosition = SECTION_POSITION.FULL
        }
        break
      }
      case SECTION_POSITION.CENTER: {
        if (targetSectionName === "leftSection") {
          newProps.leftPosition =
            direction === "top" ? SECTION_POSITION.TOP : SECTION_POSITION.BOTTOM
        } else {
          newProps.rightPosition =
            direction === "top" ? SECTION_POSITION.TOP : SECTION_POSITION.BOTTOM
        }
        break
      }
    }
    dispatch(
      componentsActions.updateTargetPagePropsReducer({
        pageName: currentPageName,
        newProps: newProps,
      }),
    )
  }, [currentPageName, currentPosition, direction, dispatch, targetSectionName])

  return (
    <div
      css={changeVerticalLayoutBarWrapperStyle(direction)}
      onClick={changeAction}
    >
      <ChangeLayout css={changeVerticalLayoutLeftIconStyle(direction)} />
      <div css={changeLayoutVerticalBarStyle} />
    </div>
  )
}

ChangeVerticalLayoutBar.displayName = "ChangeVerticalLayoutBar"

export default memo(ChangeVerticalLayoutBar)
