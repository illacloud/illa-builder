import IconHotSpot from "@illa-public/icon-hot-spot"
import { FC } from "react"
import { MinusIcon, PlusIcon } from "@illa-design/react"
import { PanelActionBarProps } from "./interface"
import { panelActionBarWrapperStyle } from "./style"

export const PanelActionBar: FC<PanelActionBarProps> = (props) => {
  const { hasPanel, addPanelAction, deletePanelAction } = props
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
        <IconHotSpot onClick={deletePanelAction}>
          <MinusIcon />
        </IconHotSpot>
      ) : (
        <IconHotSpot onClick={addPanelAction}>
          <PlusIcon />
        </IconHotSpot>
      )}
    </div>
  )
}
