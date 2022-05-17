import { FC } from "react"
import { publicPaddingCss } from "./style"
import { PanelSetterProps } from "./interface"
import { getSetterByType } from "../PanelSetters"
import { debounce } from "lodash"

const Setter: FC<PanelSetterProps> = (props) => {
  const { type, ...rest } = props
  const Comp = getSetterByType(type)

  const handleChange = (value: any, attrName?: string) => {
    console.log(value, attrName || props.attrName)
  }

  const debounceHandleChange = debounce(handleChange, 300)

  return Comp ? (
    <div css={publicPaddingCss}>
      <Comp {...rest} handleChange={debounceHandleChange} />
    </div>
  ) : null
}
export default Setter
