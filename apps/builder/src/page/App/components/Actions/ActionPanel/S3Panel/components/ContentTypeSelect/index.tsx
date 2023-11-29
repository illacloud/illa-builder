import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FxIcon } from "@illa-design/react"
import { SingleTypeComponent } from "@/page/App/components/Actions/ActionPanel/SingleTypeComponent"
import { InputEditor } from "@/page/App/components/Actions/InputEditor"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { ContentTypeOptions } from "../../constants"
import { ContentTypeSelectProps } from "./interface"
import { containerStyle, getFxIconStyle } from "./style"

export const ContentTypeSelect: FC<ContentTypeSelectProps> = (props) => {
  const { value, onChange, fx } = props
  const { t } = useTranslation()

  const handleOnClick = () => {
    onChange("fx")(!fx)
  }

  return (
    <div css={containerStyle}>
      {fx ? (
        <InputEditor
          title={t("editor.action.panel.s3.content_type")}
          value={value}
          onChange={onChange("contentType")}
          expectedType={VALIDATION_TYPES.STRING}
        />
      ) : (
        <SingleTypeComponent
          title={t("editor.action.panel.s3.content_type")}
          componentType="select"
          value={value}
          onChange={onChange("contentType")}
          options={ContentTypeOptions}
        />
      )}
      <FxIcon onClick={handleOnClick} css={getFxIconStyle(fx)} />
    </div>
  )
}
ContentTypeSelect.displayName = "ContentTypeSelect"
export default ContentTypeSelect
