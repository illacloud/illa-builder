import { FC, memo, useCallback } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as ChangeLayout } from "@/assets/change-layout.svg"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  PageNodeProps,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { changeHorizontalLayoutBarProps } from "./interface"
import {
  changeHorizontalLayoutBarWrapperStyle,
  changeHorizontalLayoutLeftIconStyle,
  changeLayoutHorizontalBarStyle,
} from "./style"

const ChangeHorizontalLayoutBar: FC<changeHorizontalLayoutBarProps> = (
  props,
) => {
  const {
    sectionName,
    currentPosition,
    currentPageName,
    targetSectionName,
    direction,
  } = props

  const dispatch = useDispatch()

  const changeAction = useCallback(() => {
    const newProps: Partial<PageNodeProps> = {
      layout: "Custom",
    }

    switch (currentPosition) {
      case SECTION_POSITION.BOTTOM:
      case SECTION_POSITION.TOP: {
        if (targetSectionName === "leftSection") {
          newProps.leftPosition = SECTION_POSITION.CENTER
        } else {
          newProps.rightPosition = SECTION_POSITION.CENTER
        }
        break
      }
      case SECTION_POSITION.FULL: {
        if (targetSectionName === "leftSection") {
          newProps.leftPosition =
            sectionName === "headerSection"
              ? SECTION_POSITION.BOTTOM
              : SECTION_POSITION.TOP
        } else {
          newProps.rightPosition =
            sectionName === "headerSection"
              ? SECTION_POSITION.BOTTOM
              : SECTION_POSITION.TOP
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
  }, [
    currentPageName,
    currentPosition,
    dispatch,
    sectionName,
    targetSectionName,
  ])

  return (
    <div
      css={changeHorizontalLayoutBarWrapperStyle(direction)}
      onClick={changeAction}
    >
      <ChangeLayout css={changeHorizontalLayoutLeftIconStyle(direction)} />
      <div css={changeLayoutHorizontalBarStyle} />
    </div>
  )
}

ChangeHorizontalLayoutBar.displayName = "ChangeHorizontalLayoutBar"

export default memo(ChangeHorizontalLayoutBar)
