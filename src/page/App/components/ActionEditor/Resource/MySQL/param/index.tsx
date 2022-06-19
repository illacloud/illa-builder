import { CodeEditor } from "@/components/CodeEditor"
import { MySQLParamProps } from "../interface"
import { panelPaddingStyle } from "./style"

export const MySQLParam = (props: MySQLParamProps) => {
  const { onChange } = props
  return (
    <div css={panelPaddingStyle}>
      <CodeEditor
        onChange={(value) => {
          onChange && onChange({ query: value })
        }}
        mode="TEXT_SQL"
        expectedType="String"
        height="88px"
      />
    </div>
  )
}

MySQLParam.displayName = "MySQLParam"
