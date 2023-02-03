import { FC } from "react"
import { LockIcon, MinusIcon, PlusIcon, UnlockIcon } from "@illa-design/react"
import { PanelActionBarProps } from "./interface"
import {
  baseIconStyle,
  clickHotpotWrapperStyle,
  panelActionBarWrapperStyle,
} from "./style"

export const PanelActionBar: FC<PanelActionBarProps> = (props) => {
  const { isFixed, hasPanel, addPanelAction, deletePanelAction } = props
  return (
    <div css={panelActionBarWrapperStyle}>
      {/* {hasPanel ? (
        isFixed ? (
          <LockIcon css={baseIconStyle} />
        ) : (
          <UnlockIcon css={baseIconStyle} />
        )
      ) : null} */}
      {hasPanel ? (
        <div css={clickHotpotWrapperStyle} onClick={deletePanelAction}>
          <MinusIcon css={baseIconStyle} />
        </div>
      ) : (
        <div css={clickHotpotWrapperStyle} onClick={addPanelAction}>
          <PlusIcon css={baseIconStyle} />
        </div>
      )}
    </div>
  )
}
