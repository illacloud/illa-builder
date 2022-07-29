import { FC } from "react"
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
} from "./style"
import { useTranslation } from "react-i18next"
import { BodyEditorProps } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/interface"

export const BodyEditor: FC<BodyEditorProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div css={bodyEditorContainerStyle}>
      <span css={bodyLabelStyle}>
        {t("editor.action.resource.rest_api.label.body")}
      </span>
      <div css={bodyChooserStyle}>
        <div></div>
        {}
      </div>
    </div>
  )
}

BodyEditor.displayName = "BodyEditor"
