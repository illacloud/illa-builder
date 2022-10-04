import { FC } from "react"
import {
  codeMirrorStyle,
  transformRadioStyle,
  transformSpaceStyle,
  transformTitleStyle,
} from "@/page/App/components/Actions/ActionPanel/TransformerComponent/style"
import { CodeEditor } from "@/components/CodeEditor"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"
import { PanelLabel } from "@/page/App/components/InspectPanel/label"
import { useTranslation } from "react-i18next"
import { RadioGroup } from "@illa-design/radio"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const TransformerComponent: FC = () => {
  const action = useSelector(getSelectedAction)!!
  const { t } = useTranslation()
  const dispatch = useDispatch()

  return (
    <div>
      <div css={transformTitleStyle}>
        <PanelLabel labelName={t("editor.action.panel.label.transformer")} />
        <div css={transformSpaceStyle} />
        <RadioGroup
          css={transformRadioStyle}
          size="small"
          colorScheme="gray"
          value={action?.transformer?.enable ? "enable" : "disable"}
          type="button"
          options={[
            {
              value: "disable",
              label: t("editor.action.panel.btn.disable"),
            },
            {
              value: "enable",
              label: t("editor.action.panel.btn.enable"),
            },
          ]}
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...action,
                transformer: {
                  ...action.transformer,
                  enable: value === "enable",
                },
              }),
            )
          }}
        />
      </div>
      {action?.transformer?.enable && (
        <CodeEditor
          value={
            "// type your code here\n" +
            "// example: return data.filter(row => row.quantity > 20)\n" +
            "return data"
          }
          css={codeMirrorStyle}
          lineNumbers
          height="88px"
          expectedType={VALIDATION_TYPES.STRING}
          mode="JAVASCRIPT"
          onChange={(value) => {
            dispatch(
              configActions.updateSelectedAction({
                ...action,
                transformer: {
                  ...action.transformer,
                  rawData: value,
                },
              }),
            )
          }}
        />
      )}
    </div>
  )
}

TransformerComponent.displayName = "TransformerComponent"
