// import { EditorInput } from "@/components/EditorInput"
import { TextArea } from "@illa-design/input"
import { css } from "@emotion/react"
import {
  TextAreaCSS,
  TextAreaWrapperCSS,
} from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources/MySQL/style"

export const MySQLPanel = () => {
  return (
    <>
      <div css={TextAreaWrapperCSS}>
        <TextArea _css={TextAreaCSS} />
      </div>
    </>
  )
}
