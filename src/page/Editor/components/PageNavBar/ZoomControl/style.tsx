import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {ZoomControl} from "@/page/Editor/components/PageNavBar/ZoomControl/index";

export const controlStyle = css`
  display: flex;
  align-items: center;
  margin-left: 9px;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const numStyle = css`
  margin: 0 4px;
`
