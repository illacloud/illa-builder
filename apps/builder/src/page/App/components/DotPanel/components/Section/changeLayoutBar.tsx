import { FC, useCallback } from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as ChangeLayout } from "@/assets/change-layout.svg"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import {
  PageNodeProps,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import {
  ChangeVerticalLayoutBarProps,
  changeHorizontalLayoutBarProps,
} from "./interface"
import {
  changeHorizontalLayoutBarWrapperStyle,
  changeHorizontalLayoutLeftIconStyle,
  changeLayoutHorizontalBarStyle,
  changeLayoutVerticalBarStyle,
  changeVerticalLayoutBarWrapperStyle,
  changeVerticalLayoutLeftIconStyle,
} from "./style"

export const ChangeHorizontalLayoutBar: FC<changeHorizontalLayoutBarProps> = (
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

export const ChangeVerticalLayoutBar: FC<ChangeVerticalLayoutBarProps> = (
  props,
) => {
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
