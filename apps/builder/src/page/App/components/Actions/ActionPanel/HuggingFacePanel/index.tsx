import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Input, Select } from "@illa-design/react"
import { CodeEditor } from "@/components/CodeEditor"
import { ActionEventHandler } from "@/page/App/components/Actions/ActionPanel/ActionEventHandler"
import {
  actionItemLabelStyle,
  actionItemStyle,
} from "@/page/App/components/Actions/ActionPanel/FirebasePanel/style"
import { RecordEditor } from "@/page/App/components/Actions/ActionPanel/RecordEditor"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { BodyEditor } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor"
import { codeEditorStyle } from "@/page/App/components/Actions/ActionPanel/RestApiPanel/BodyEditor/style"
import { TransformerComponent } from "@/page/App/components/Actions/ActionPanel/TransformerComponent"
import { CheckboxInput } from "@/page/App/components/CheckboxInput"
import { InputEditor } from "@/page/App/components/InputEditor"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { ActionItem } from "@/redux/currentApp/action/actionState"
import { ActionTypeList } from "@/redux/currentApp/action/firebaseAction"
import {
  HuggingFaceAction,
  HuggingFaceBodyContent,
  HuggingFaceParametesType,
  InputInitial,
  PairsBodyInitital,
  ParametersTypeMap,
} from "@/redux/currentApp/action/huggingFaceAction"
import {
  BodyContent,
  BodyType,
  RestApiAction,
} from "@/redux/currentApp/action/restapiAction"
import { HuggingFaceResource } from "@/redux/resource/huggingFaceResource"
import { Resource } from "@/redux/resource/resourceState"
import {
  Params,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/restapiResource"
import { RootState } from "@/store"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import {
  actionItemContainer,
  restapiItemInputStyle,
  restapiItemLabelStyle,
  restapiItemStyle,
  restapiPanelContainerStyle,
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
  const currentResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === cachedAction?.resourceId)
  })

  const handleValueChange = (value: string | boolean, key: string) => {
    dispatch(
      configActions.updateCachedAction({
        ...cachedAction,
        content: {
          ...content,
          [key]: value,
        },
      }),
    )
  }

  const handleParameterChange = useCallback(
    (value: HuggingFaceParametesType) => {
      let newBody = value === "pairs" ? PairsBodyInitital : InputInitial
      if (value !== "text") {
        if (
          selectedAction.resourceId === cachedAction.resourceId &&
          selectedAction.content.inputs.type === value
        ) {
          newBody = selectedAction.content.inputs.content
        }
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

  return (
    <div css={restapiPanelContainerStyle}>
      <ResourceChoose />
      <div css={actionItemContainer}>
        <InputEditor
          title={t("editor.action.panel.hugging_face.modeID")}
          value={content.modeID ?? ""}
          onChange={(value) => handleValueChange(value, "modeID")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <div css={actionItemStyle}>
          <span css={actionItemLabelStyle}>
            {t("editor.action.panel.firebase.action_type")}
          </span>
          <Select
            colorScheme="techPurple"
            showSearch={true}
            defaultValue={content.modeID}
            value={content.modeID}
            ml="16px"
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
              (content.inputs.content as Params[]) ?? [{ key: "", value: "" }]
            }
            onChangeKey={(index, key, v) => {
              let newList: Params[] = [
                ...((content.inputs.content as Params[]) ?? [
                  { key: "", value: "" },
                ]),
              ]
              newList[index] = { key, value: v } as Params
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
            }}
            onChangeValue={(index, key, v) => {
              let newList: Params[] = [
                ...((content.inputs.content as Params[]) ?? [
                  { key: "", value: "" },
                ]),
              ]
              newList[index] = { key, value: v } as Params
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
            }}
            onDelete={(index, record) => {
              let newList: Params[] = [
                ...((content.inputs.content as Params[]) ?? [
                  { key: "", value: "" },
                ]),
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
            }}
            onAdd={() => {
              let newList: Params[] = [
                ...((content.inputs.content as Params[]) ?? [
                  { key: "", value: "" },
                ]),
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
            }}
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
              onChange={(value) => {
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
              }}
            />
          </div>
        )}

        <CheckboxInput
          checkboxTitle={t("editor.action.panel.firebase.use_start_at")}
          checkboxValue={content.withDetailParams ?? false}
          onCheckboxChange={(value) =>
            handleValueChange(value, "withDetailParams")
          }
          showInputEditor={false}
          inputTitle={""}
          inputValue={""}
          onValueChange={() => {}}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <InputEditor
          title={t("editor.action.panel.hugging_face.use_cache")}
          value={content?.detailParams?.useCache ?? ""}
          onChange={(value) => handleValueChange(value, "useCache")}
          expectedType={VALIDATION_TYPES.STRING}
        />
        <TransformerComponent />
      </div>
      <ActionEventHandler />
    </div>
  )
}

HuggingFacePanel.displayName = "HuggingFacePanel"
