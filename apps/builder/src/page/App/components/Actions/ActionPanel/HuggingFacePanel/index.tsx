import { FC, useCallback } from "react"
import { Trans, useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox, Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import {
  bodyChooserStyle,
  bodyEditorContainerStyle,
  bodyLabelStyle,
  bodySelectorStyle,
  codeEditorStyle,
} from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/style"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { InputEditor } from "@/page/App/components/InputEditor"
import { TextLink } from "@/page/User/components/TextLink"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
  HuggingFaceParametesType,
  InputInitial,
  PairsBodyInitital,
  ParametersTypeMap,
} from "@/redux/currentApp/action/huggingFaceAction"
import { Params } from "@/redux/resource/restapiResource"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  actionItemContainer,
  actionItemLabelStyle,
  actionItemStyle,
  checkboxContentContainerStyle,
  checkboxTipsStyle,
  checkoutContentStyle,
  restapiPanelContainerStyle,
  textCodeEditorStyle,
} from "./style"

export const HuggingFacePanel: FC = () => {
  const { t } = useTranslation()

  const cachedAction = useSelector(getCachedAction) as ActionItem<
    HuggingFaceAction<HuggingFaceBodyContent>
  >
  const selectedAction = useSelector(getSelectedAction) as ActionItem<
    HuggingFaceAction<HuggingFaceBodyContent>
  >

  const content =
    cachedAction.content as HuggingFaceAction<HuggingFaceBodyContent>
  const currentParameterType = content?.inputs?.type || "text"
  const dispatch = useDispatch()

  const handleValueChange = useCallback(
    (value: string | boolean, key: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            [key]: value,
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleParameterChange = useCallback(
    (value: HuggingFaceParametesType) => {
      let newBody = value === "pairs" ? PairsBodyInitital : InputInitial
      if (
        selectedAction.resourceId === cachedAction.resourceId &&
        selectedAction.content?.inputs?.type === value
      ) {
        newBody = selectedAction.content.inputs.content
      }
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            inputs: {
              type: value,
              content: newBody,
            },
          },
        }),
      )
    },
    [
      cachedAction,
      content,
      dispatch,
      selectedAction.content.inputs,
      selectedAction.resourceId,
    ],
  )

  const handleOnAddKeys = useCallback(() => {
    let newList: Params[] = [
      ...((content.inputs.content as Params[]) ?? [{ key: "", value: "" }]),
      { key: "", value: "" } as Params,
    ]
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...content,
          inputs: {
            type: content.inputs.type,
            content: newList,
          },
        },
      }),
    )
  }, [cachedAction, content, dispatch])

  const handleOnChangeKey = useCallback(
    (index: number, key: string, value: string) => {
      let newList: Params[] = [
        ...((content.inputs.content as Params[]) ?? [{ key: "", value: "" }]),
      ]
      newList[index] = { key, value: value } as Params
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            inputs: {
              type: content.inputs.type,
              content: newList,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleOnChangeValue = useCallback(
    (index: number, key: string, value: string) => {
      let newList: Params[] = [
        ...((content.inputs.content as Params[]) ?? [{ key: "", value: "" }]),
      ]
      newList[index] = { key, value: value } as Params
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            inputs: {
              type: content.inputs.type,
              content: newList,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleOnDeleteKey = useCallback(
    (index: number, record: Params) => {
      let newList: Params[] = [
        ...((content.inputs.content as Params[]) ?? [{ key: "", value: "" }]),
      ]
      newList.splice(index, 1)
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            inputs: {
              type: content.inputs.type,
              content: newList,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleParametersValueChange = useCallback(
    (value: string, key: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            detailParams: {
              ...content.detailParams,
              [key]: value,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  const handleInputsValueChange = useCallback(
    (value: string) => {
      dispatch(
        configActions.updateCachedAction({
          ...cachedAction,
          content: {
            ...content,
            inputs: {
              type: content.inputs.type,
              content: value,
            },
          },
        }),
      )
    },
    [cachedAction, content, dispatch],
  )

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <InputEditor
          title={t("editor.action.panel.hugging_face.mode_id")}
          value={content.modelID ?? ""}
          onChange={(value) => handleValueChange(value, "modelID")}
          expectedType={VALIDATION_TYPES.STRING}
          tips={
            <Trans
              t={t}
              i18nKey="editor.action.panel.hugging_face.tips.mode_id"
              components={[
                <TextLink
                  key="go-to-model"
                  onClick={() =>
                    window.open(
                      "https://huggingface.co/docs/api-inference/detailed_parameters",
                      "_blank",
                    )
                  }
                />,
              ]}
            />
          }
        />
        <div css={bodyEditorContainerStyle}>
          <span css={bodyLabelStyle}>
            {t("editor.action.panel.hugging_face.parameter")}
          </span>
          <div css={bodyChooserStyle}>
            <div css={bodySelectorStyle}>
              <Select
                colorScheme="techPurple"
                showSearch={true}
                defaultValue={content?.inputs?.type || "text"}
                value={content?.inputs?.type || "text"}
                width="100%"
                placeholder={t(
                  "editor.action.panel.firebase.placeholder.select_an_action",
                )}
                onChange={handleParameterChange}
                options={ParametersTypeMap}
              />
            </div>
            {currentParameterType === "pairs" && (
              <RecordEditor
                label=""
                records={
                  (content.inputs.content as Params[]) ?? [
                    { key: "", value: "" },
                  ]
                }
                onChangeKey={handleOnChangeKey}
                onChangeValue={handleOnChangeValue}
                onDelete={handleOnDeleteKey}
                onAdd={handleOnAddKeys}
              />
            )}
            {(currentParameterType === "binary" ||
              currentParameterType === "json") && (
              <div css={codeEditorStyle}>
                <CodeEditor
                  mode="TEXT_JS"
                  lineNumbers
                  value={(content.inputs.content as string) ?? ""}
                  expectedType={VALIDATION_TYPES.STRING}
                  height="88px"
                  placeholder={
                    currentParameterType === "binary"
                      ? t("editor.action.panel.hugging_face.placeholder.binary")
                      : t("editor.action.panel.hugging_face.placeholder.json")
                  }
                  onChange={handleInputsValueChange}
                />
              </div>
            )}
            {currentParameterType === "text" && (
              <CodeEditor
                css={textCodeEditorStyle}
                mode={"TEXT_JS"}
                value={content?.inputs.content ?? ""}
                onChange={handleInputsValueChange}
                expectedType={VALIDATION_TYPES.STRING}
                placeholder={
                  t(
                    "editor.action.panel.hugging_face.placeholder.text",
                  ) as string
                }
              />
            )}
          </div>
        </div>

        {currentParameterType !== "binary" && (
          <>
            <div css={actionItemStyle}>
              <span css={actionItemLabelStyle}></span>
              <div css={checkboxContentContainerStyle}>
                <div css={checkoutContentStyle}>
                  <Checkbox
                    colorScheme="techPurple"
                    checked={content.withDetailParams ?? false}
                    ml="16px"
                    onChange={(value) =>
                      handleValueChange(value, "withDetailParams")
                    }
                  />
                  <span css={actionItemLabelStyle}>
                    {t(
                      "editor.action.panel.hugging_face.use_detail_parameters",
                    )}
                  </span>
                </div>
                <div css={checkboxTipsStyle}>
                  <Trans
                    t={t}
                    i18nKey="editor.action.panel.hugging_face.tips.use_detail_parameters"
                    components={[
                      <TextLink
                        key="go-to-parameters"
                        onClick={() =>
                          window.open(
                            "https://huggingface.co/docs/api-inference/detailed_parameters",
                            "_blank",
                          )
                        }
                      />,
                    ]}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {content.withDetailParams &&
          [
            {
              title: t("editor.action.panel.hugging_face.use_cache"),
              name: "useCache",
              value: content?.detailParams?.useCache,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.use_cache",
              ),
            },
            {
              title: t("editor.action.panel.hugging_face.wait_for_model"),
              name: "waitForModel",
              value: content?.detailParams?.waitForModel,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.use_cache",
              ),
            },
            {
              title: t("editor.action.panel.hugging_face.min_length"),
              name: "minLength",
              value: content?.detailParams?.minLength,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.min_length",
              ),
            },
            {
              title: t("editor.action.panel.hugging_face.max_length"),
              name: "maxLength",
              value: content?.detailParams?.maxLength,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.min_length",
              ),
            },

            {
              title: t("editor.action.panel.hugging_face.top_k"),
              name: "topK",
              value: content?.detailParams?.topK,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.top_k",
              ),
            },
            {
              title: t("editor.action.panel.hugging_face.top_p"),
              name: "topP",
              value: content?.detailParams?.topP,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.top_p",
              ),
            },

            {
              title: t("editor.action.panel.hugging_face.temperature"),
              name: "temperature",
              value: content?.detailParams?.temperature,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.temperature",
              ),
              tips: t("editor.action.panel.hugging_face.tips.temperature"),
            },
            {
              title: t("editor.action.panel.hugging_face.repetition_penalty"),
              name: "repetitionPenalty",
              value: content?.detailParams?.repetitionPenalty,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.repetition_penalty",
              ),
              tips: t(
                "editor.action.panel.hugging_face.tips.repetition_penalty",
              ),
            },
            {
              title: t("editor.action.panel.hugging_face.max_time"),
              name: "maxTime",
              value: content?.detailParams?.maxTime,
              placeholder: t(
                "editor.action.panel.hugging_face.placeholder.max_time",
              ),
            },
          ].map(
            (
              {
                title,
                name,
                value,
                placeholder,
                tips,
              }: {
                title: string
                name: string
                value: string
                placeholder?: string
                tips?: string
              },
              index: number,
            ) => (
              <InputEditor
                key={index}
                title={title}
                value={value ?? ""}
                onChange={(value) => handleParametersValueChange(value, name)}
                expectedType={VALIDATION_TYPES.STRING}
                placeholder={placeholder ?? ""}
                tips={tips ?? ""}
              />
            ),
          )}
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

HuggingFacePanel.displayName = "HuggingFacePanel"
