import { EditorInput } from "@/components/EditorInput"
import { panelPaddingCss } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"
import { MySQLPanelProps } from "./interface"

export const MySQLPanel = (props: MySQLPanelProps) => {
  const { onParamsChange } = props
  return (
    <div css={panelPaddingCss}>
      <EditorInput
        onChange={(value) => {
          onParamsChange({ query: value })
        }}
        mode="sql"
        height="88px"
      />
    </div>
  )
}
