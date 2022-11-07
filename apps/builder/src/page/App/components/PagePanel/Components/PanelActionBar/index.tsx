import { FC } from "react"
import { baseIconStyle, panelActionBarWrapperStyle } from "./style"
import { LockIcon, UnlockIcon, MinusIcon, PlusIcon } from "@illa-design/react"
import { PanelActionBarProps } from "./interface"

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
        <MinusIcon css={baseIconStyle} onClick={deletePanelAction} />
      ) : (
        <PlusIcon css={baseIconStyle} onClick={addPanelAction} />
      )}
    </div>
  )
}
