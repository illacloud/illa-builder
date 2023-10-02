import { FC } from "react"
import { MinusIcon, PlusIcon } from "@illa-design/react"
import IconHotSpot from "@/components/IconHotSpot"
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
