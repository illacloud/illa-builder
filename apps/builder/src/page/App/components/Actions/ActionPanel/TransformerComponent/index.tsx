import {
  TransformerInitial,
  TransformerInitialTrue,
} from "@illa-public/public-configs"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { RadioGroup } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import {
  CODE_LANG,
  CODE_TYPE,
} from "@/components/CodeEditor/CodeMirror/extensions/interface"
import { TransformComponentProps } from "@/page/App/components/Actions/ActionPanel/TransformerComponent/interface"
import {
  codeMirrorStyle,
  getCodeMirrorContainerStyle,
  transformRadioStyle,
  transformSpaceStyle,
  transformTitle,
  transformTitleStyle,
} from "@/page/App/components/Actions/ActionPanel/TransformerComponent/style"
import { PanelLabel } from "@/page/App/components/InspectPanel/components/Label"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const TransformerComponent: FC<TransformComponentProps> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { fullWidth } = props
  const cachedAction = useSelector(getCachedAction)
  const selectedAction = useSelector(getSelectedAction)

  return (
    <>
      {cachedAction && (
        <div css={transformTitleStyle}>
          {fullWidth ? (
            <PanelLabel
              labelName={t("editor.action.panel.label.transformer")}
            />
          ) : (
            <span css={transformTitle}>
              {t("editor.action.panel.label.transformer")}
            </span>
          )}
          <div css={transformSpaceStyle} />
          <RadioGroup
            css={transformRadioStyle}
            forceEqualWidth={true}
            size="medium"
            colorScheme="gray"
            value={cachedAction.transformer.enable}
            type="button"
            options={[
              {
                value: false,
                label: t("editor.action.panel.btn.disable"),
              },
              {
                value: true,
                label: t("editor.action.panel.btn.enable"),
              },
            ]}
            onChange={(value) => {
              let transformer = TransformerInitial
              if (
                selectedAction &&
                selectedAction.transformer.enable === value
              ) {
                transformer = selectedAction.transformer || ""
              } else {
                if (value) {
                  transformer = TransformerInitialTrue
                }
              }
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  transformer: transformer,
                }),
              )
            }}
          />
        </div>
      )}
      {cachedAction && cachedAction.transformer.enable && (
        <div css={getCodeMirrorContainerStyle(!!fullWidth)}>
          {fullWidth ? null : <span css={transformTitle} />}
          <CodeEditor
            value={cachedAction.transformer.rawData}
            wrapperCss={codeMirrorStyle}
            showLineNumbers
            canShowCompleteInfo
            height="88px"
            expectValueType={VALIDATION_TYPES.STRING}
            lang={CODE_LANG.JAVASCRIPT}
            codeType={CODE_TYPE.NO_METHOD_FUNCTION}
            modalTitle={t("editor.action.panel.label.transformer")}
            onChange={(value) => {
              dispatch(
                configActions.updateCachedAction({
                  ...cachedAction,
                  transformer: {
                    ...cachedAction.transformer,
                    rawData: value,
                  },
                }),
              )
            }}
          />
        </div>
      )}
    </>
  )
}

TransformerComponent.displayName = "TransformerComponent"
