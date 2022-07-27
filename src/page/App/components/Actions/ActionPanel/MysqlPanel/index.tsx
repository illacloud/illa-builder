import { FC } from "react"
import {
  mysqlContainerStyle,
  sqlInputStyle,
} from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { CodeEditor } from "@/components/CodeEditor"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"

export const MysqlPanel: FC = () => {
  const action = useSelector(getSelectedAction)!!
  const dispatch = useDispatch()

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
      <CodeEditor
        tables={action.content}
        placeholder="select * from users;"
        lineNumbers={true}
        height="88px"
        css={sqlInputStyle}
        mode="SQL_JS"
        expectedType="String"
        onChange={(value, calcResult) => {
          console.log(value)
          console.log(calcResult)
        }}
      />
      <TransformerComponent />
    </div>
  )
}

MysqlPanel.displayName = "MysqlPanel"
