/* Common CSS for all form */
import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { LEFT_PANEL_WIDTH, RIGHT_PANEL_WIDTH } from "@/style"

export const formStyle = css`
  overflow: auto;
  padding: 0 24px;
  max-height: 716px;
`

/* form grid */
export const gridContainerStyle = css`
  display: grid;
  grid: auto/repeat(auto-fit, 152px minmax(280px, 1fr));
  grid-gap: 16px;
  white-space: nowrap;
  overflow: auto;
`

export const gridRowContainerStyle = css`
  grid-gap: 8px 16px;
  grid-column: span 2;
  grid: auto/repeat(auto-fit, 152px minmax(280px, 1fr));
  display: grid;
`

export const paramGridRowContainerStyle = css`
  grid-gap: 8px 16px;
  display: grid;
  grid: auto/repeat(auto-fit, minmax(15%, min-content) minmax(280px, 1fr));
`

export function applyGridRowContainerInSmallWidthStyle(
  leftPanelVisible: boolean,
  rightPanelVisible: boolean,
): SerializedStyles {
  return applyMediaQueryStyle(
    leftPanelVisible,
    rightPanelVisible,
    css`
      display: grid;
      gap: 8px;
      grid: auto/auto;
    `,
  )
}

export function applyLabelTextInSmallWidthStyle(
  leftPanelVisible: boolean,
  rightPanelVisible: boolean,
): SerializedStyles {
  return applyMediaQueryStyle(
    leftPanelVisible,
    rightPanelVisible,
    css`
      text-align: left;
      justify-content: start;
    `,
  )
}

function applyMediaQueryStyle(
  leftPanelVisible: boolean,
  rightPanelVisible: boolean,
  style: SerializedStyles,
): SerializedStyles {
  const MEDIA_QUERY_WIDTH = 1600
  const WIDTH_THRESHOLD = 1000

  const active =
    MEDIA_QUERY_WIDTH -
      (leftPanelVisible ? LEFT_PANEL_WIDTH : 0) -
      (rightPanelVisible ? RIGHT_PANEL_WIDTH : 0) <=
    WIDTH_THRESHOLD

  if (!active) {
    return css``
  }

  return css`
    @media screen and (max-width: ${MEDIA_QUERY_WIDTH}px) {
      ${style}
    }
  `
}

export const gridRowCenterItemStyle = css`
  align-items: center;
`

export function applyGridColIndex(index: number): SerializedStyles {
  return css`
    grid-column-start: ${index};
  `
}

export const emptyFillingStyle = css`
  grid-column: span 2;
`

export const splitLineStyle = css`
  display: inline-block;
  grid-column: span 2;
  height: 1px;
  width: 100%;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
`

export const labelTextStyle = css`
  display: flex;
  justify-content: end;
  align-items: flex-start;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  line-height: 32px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  white-space: pre;
`

export const labelTextAlignSelfStartStyle = css`
  align-self: flex-start;
  /* vertical center to input, lineHeight same with input */
  line-height: 30px;
`

export const dynamicLabelTextStyle = css`
  display: flex;
  justify-content: end;
  padding-top: 5px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  white-space: pre;
`

export const connectTextStyle = css`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  white-space: pre;
`

export const requiredLabelTextStyle = css`
  ${labelTextStyle};
  position: relative;

  &:before {
    content: "*";
    margin-right: 5px;
    font-weight: 500;
    color: ${globalColor(`--${illaPrefix}-red-03`)};
  }
`

export const groupTitleStyle = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  font-weight: 500;
  text-align: right;
  margin: 0;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  grid-column: span 2;
`

export const actionTextStyle = css`
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  transition: color 0.2s ease-in-out;
  justify-self: start;
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;

  &:hover {
    color: ${globalColor(`--${illaPrefix}-techPurple-03`)};
  }
`

export const checkboxStyle = css`
  justify-content: flex-start !important;

  & > input {
    margin: 0;
  }
`

export const labelTextVerticalStyle = css`
  flex-direction: column;
  align-items: normal;
`

export const labelTextSmallSizeStyle = css`
  font-size: 12px;
  line-height: 1;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`
export const displayNoneStyle = css`
  display: none;
`
export const descriptionStyle = css`
  display: grid;
  align-items: center;
  font-size: 14px;
  line-height: 1.57;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  margin: 0;
`

export const errorMessageStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-red-03`)};
  line-height: 1.57;
`

export const configContainerStyle = css`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap;
`

export const hostnamePortStyle = css`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 1fr 142px;
`

export const usernamePasswordStyle = css`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: 1fr 1fr;
`

export const switchAreaStyle = css`
  display: flex;
  align-items: center;
`
export const switchDescriptionStyle = css`
  display: inline-block;
  margin-left: 8px;
`

export const formPaddingStyle = css`
  padding: 8px 0;
`
