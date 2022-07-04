import { FC } from "react"
import { useSelector } from "react-redux"
import { CodeEditor } from "@/components/CodeEditor"
import { MySQLParamProps } from "@/page/App/components/ActionEditor/Resource/MySQL/interface"
import { getSelectedAction } from "@/redux/config/configSelector"
import { panelPaddingStyle } from "./style"

export const MySQLParam: FC<MySQLParamProps> = (props) => {
  const { onChange } = props
  const { query = "", mode = "sql" } =
    useSelector(getSelectedAction)?.actionTemplate ?? {}

  return (
    <div css={panelPaddingStyle}>
      <CodeEditor
        value={query}
        onChange={(value) => {
          // TODO: @spike Temporary Fix `mode` to `sql`, should support `gui` mode later
          onChange({ query: value, mode })
        }}
        mode="SQL_JS"
        expectedType="String"
        height="88px"
        lineNumbers
      />
    </div>
  )
}

MySQLParam.displayName = "MySQLParam"
