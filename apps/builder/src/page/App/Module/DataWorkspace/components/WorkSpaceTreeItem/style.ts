import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const itemNameStyle: SerializedStyles = css`
  font-weight: 600;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 160px;
  vertical-align: bottom;
  display: inline-block;
`

export const itemNameDescStyle: SerializedStyles = css`
  display: inline-block;
  vertical-align: bottom;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const jsonContentStyle = css`
  font-family: "Fira Code", monospace;
  height: 0;
`

export const jsonNameStyle: SerializedStyles = css`
  display: inline-block;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export function applyJsonValueColorStyle(type: string) {
  let colorStyle = css``
  switch (type) {
    case "number": {
      colorStyle = css`
        color: #164;
      `
      break
    }
    case "boolean": {
      colorStyle = css`
        color: #219;
      `
      break
    }
    case "string": {
      colorStyle = css`
        color: #219;
      `
      break
    }
    case "undefined": {
      colorStyle = css`
        color: #708;
      `
      break
    }
    case "symbol": {
      colorStyle = css`
        color: #00c;
      `
      break
    }
    case "bigint": {
      colorStyle = css`
        color: #170;
      `
      break
    }
  }

  return css`
    ${colorStyle};
    word-break: break-all;
  `
}

export const editIconHotSpotStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
  font-size: 12px;
  margin-left: 4px;
  position: relative;
  color: ${getColor("grayBlue", "04")};
`

export const globalStateItemContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  width: calc(100% - 16px);
`

export const objectAndArrayTitleStyle = css`
  font-size: 12px;
  font-weight: 500;
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

export const applyObjectOrArrayContainerStyle = (level: number) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${level * 16}px;
  font-family: "Fira Code", monospace;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
    #copy-icon-hot-spot {
      visibility: visible;
    }
  }
  #copy-icon-hot-spot {
    visibility: hidden;
  }
`

export const applySimpleItemContainerStyle = (
  isSelected: boolean,
  level: number,
) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${level * 16}px;
  background-color: ${isSelected ? getColor("techPurple", "08") : ""};
  font-size: 12px;
  font-family: "Fira Code", monospace;
  :hover {
    .global-state-edit-icon-hot-spot {
      visibility: visible;
    }
    #copy-icon-hot-spot {
      visibility: visible;
    }
  }
  :last-child {
    padding-bottom: 4px;
  }
  #copy-icon-hot-spot {
    visibility: hidden;
  }
`

export const labelNameAndValueContainerStyle = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  justify-content: space-between;
`
