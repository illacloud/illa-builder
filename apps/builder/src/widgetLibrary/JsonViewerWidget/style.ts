import { SerializedStyles, css } from "@emotion/react"
import { Variants } from "framer-motion"
import { getColor } from "@illa-design/react"

export const jsonViewContainer = css`
  height: 100%;
  width: 100%;
  padding: 8px;
  div,
  label {
    user-select: text;
  }
`

export const panelBarItemContainerAnimationVariants: Variants = {
  enter: {
    height: "auto",
    overflowY: "hidden",
    transitionEnd: { overflowY: "visible" },
  },
  exit: {
    height: 0,
    overflowY: "hidden",
    transitionEnd: { overflowY: "hidden" },
  },
}

export const applySimpleItemContainerStyle = (
  level: number,
  name?: string,
) => css`
  display: flex;
  align-items: center;
  padding-left: ${name !== undefined ? (level + 1) * 16 : 0}px;
  padding-right: 16px;
  flex-wrap: wrap;
  margin-top: 4px;
  font-size: 12px;
  gap: 8px;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
  }
  :last-child {
    padding-bottom: 4px;
  }
`

export const jsonNameStyle: SerializedStyles = css`
  display: inline-block;
  color: ${getColor("grayBlue", "02")};
`

export const jsonValueStyle: SerializedStyles = css`
  display: inline-block;
  word-break: break-all;
`
export const applyJsonContentStyle = css`
  font-family: "Fira Code", monospace;
  height: 0;
`

export const objectAndArrayTitleStyle = (isChild: boolean) => css`
  font-size: 12px;
  font-weight: 600;
  height: ${isChild ? "20px" : "24px"};
  line-height: ${isChild ? "20px" : "24px"};
  color: ${getColor("grayBlue", "02")};
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const objectAndArrayDescStyle = css`
  font-size: 12px;
  color: ${getColor("grayBlue", "04")};
`

export const applyObjectOrArrayContainerStyle = (
  level: number,
  isChild: boolean,
) => css`
  display: flex;
  align-items: center;
  padding-left: ${(level + 1) * 16}px;
  padding-right: 16px;
  min-height: ${isChild ? "20px" : "24px"};
  margin-top: ${isChild ? "4px" : "0px"};
  font-family: "Fira Code", monospace;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
  }
`

export const applyExpandIconStyle = (isExpanded: boolean) => css`
  font-size: 8px;
  line-height: 0;
  cursor: pointer;
  transform-origin: center;
  transform: rotate(${isExpanded ? 90 : 0}deg);
  transition: transform 200ms;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
`

export const applyTitleAndDescContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`
