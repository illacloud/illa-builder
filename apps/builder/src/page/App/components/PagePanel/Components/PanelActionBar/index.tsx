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
        <div css={clickHotpotWrapperStyle}>
          <MinusIcon css={baseIconStyle} onClick={deletePanelAction} />
        </div>
      ) : (
        <div css={clickHotpotWrapperStyle}>
          <PlusIcon css={baseIconStyle} onClick={addPanelAction} />
        </div>
      )}
    </div>
  )
}
