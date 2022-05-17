import { FC } from "react"
import { publicPaddingCss } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "../PanelSetters"

const Setter: FC<PanelSetterProps> = (props) => {
  const { type, ...rest } = props
  const Comp = getSetterByType(type) as FC
  return Comp ? (
    <div css={publicPaddingCss}>
      <Comp {...rest} />
    </div>
  ) : null
}
export default Setter
