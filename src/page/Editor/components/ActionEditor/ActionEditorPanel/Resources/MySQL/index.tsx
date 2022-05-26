import { EditorInput } from "@/components/EditorInput"
import { panelPaddingCss } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"

export const MySQLPanel = () => {
  return (
    <div css={panelPaddingCss}>
      <EditorInput mode="sql" height="88px" />
    </div>
  )
}
