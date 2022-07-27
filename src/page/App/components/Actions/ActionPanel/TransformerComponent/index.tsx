import { FC } from "react"
import {
  codeMirrorStyle,
  transformTitleStyle,
} from "@/page/App/components/Actions/ActionPanel/TransformerComponent/style"
import { CodeEditor } from "@/components/CodeEditor"
import { useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"

export const TransformerComponent: FC = () => {
  const action = useSelector(getSelectedAction)!!

  return (
    <div>
      <div css={transformTitleStyle}></div>
      <CodeEditor
        value={
          "// type your code here\n" +
          "// example: return formatDataAsArray(data).filter(row => row.quantity > 20)\n" +
          "return data"
        }
        css={codeMirrorStyle}
        lineNumbers
        height="88px"
        expectedType="String"
        mode="JAVASCRIPT"
      />
    </div>
  )
}

TransformerComponent.displayName = "TransformerComponent"
