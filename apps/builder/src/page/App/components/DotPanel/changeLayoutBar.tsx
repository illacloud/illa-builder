import { FC } from "react"
import { ReactComponent as ChangeLayout } from "@/assets/change-layout.svg"
import { ChangeLayoutBarProps } from "./interface"
import {
  changeLayoutBottomBarWrapperStyle,
  changeLayoutBottomIconStyle,
  changeLayoutHorizontalBarStyle,
  changeLayoutLeftBarWrapperStyle,
  changeLayoutLeftIconStyle,
  changeLayoutRightBarWrapperStyle,
  changeLayoutRightIconStyle,
  changeLayoutTopBarWrapperStyle,
  changeLayoutVerticalBarStyle,
} from "./style"

export const ChangeLayoutTopBar: FC<ChangeLayoutBarProps> = (props) => {
  const { sectionName, changeAction, direction } = props

  return (
    <div
      css={changeLayoutTopBarWrapperStyle}
      onClick={() => {
        changeAction(sectionName, direction)
      }}
    >
      <ChangeLayout />
      <div css={changeLayoutHorizontalBarStyle} />
    </div>
  )
}

export const ChangeLayoutBottomBar: FC<ChangeLayoutBarProps> = (props) => {
  const { sectionName, changeAction, direction } = props

  return (
    <div
      css={changeLayoutBottomBarWrapperStyle}
      onClick={() => {
        changeAction(sectionName, direction)
      }}
    >
      <ChangeLayout css={changeLayoutBottomIconStyle} />
      <div css={changeLayoutHorizontalBarStyle} />
    </div>
  )
}

export const ChangeLayoutLeftBar: FC<ChangeLayoutBarProps> = (props) => {
  const { sectionName, changeAction, direction } = props
  return (
    <div
      css={changeLayoutLeftBarWrapperStyle}
      onClick={() => {
        changeAction(sectionName, direction)
      }}
    >
      <ChangeLayout css={changeLayoutLeftIconStyle} />
      <div css={changeLayoutVerticalBarStyle} />
    </div>
  )
}

export const ChangeLayoutRightBar: FC<ChangeLayoutBarProps> = (props) => {
  const { sectionName, changeAction, direction } = props

  return (
    <div
      css={changeLayoutRightBarWrapperStyle}
      onClick={() => {
        changeAction(sectionName, direction)
      }}
    >
      <ChangeLayout css={changeLayoutRightIconStyle} />
      <div css={changeLayoutVerticalBarStyle} />
    </div>
  )
}
