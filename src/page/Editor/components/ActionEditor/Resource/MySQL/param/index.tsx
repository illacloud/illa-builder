import { EditorInput } from "@/components/EditorInput"
import { MySQLParamProps } from "../interface"
import { panelPaddingCss } from "./style"

export const MySQLParam = (props: MySQLParamProps) => {
  const { onChange } = props
  return (
    <div css={panelPaddingCss}>
      <EditorInput
        onChange={(value) => {
          onChange && onChange({ query: value })
        }}
        mode="sql"
        height="88px"
      />
    </div>
  )
}

MySQLParam.displayName = "MySQLParam"
