import { css } from "@emotion/react"
import { CMWrapperCSS } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources/MySQL/style"
import { EditorInput } from "@/components/EditorInput"
import { PanelPaddingCSS } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/style"

export const MySQLPanel = () => {
  return (
    <div css={PanelPaddingCSS}>
      <EditorInput mode="sql" height="88px" />
    </div>
  )
}
