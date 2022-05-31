import { EditorInput } from "@/components/EditorInput"
import { MySQLParamProps } from "../interface"
import { panelPaddingStyle } from "./style"

export const MySQLParam = (props: MySQLParamProps) => {
  const { onChange } = props
  return (
    <div css={panelPaddingStyle}>
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
