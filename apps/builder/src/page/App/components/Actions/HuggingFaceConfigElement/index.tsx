import { FC, useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  PaginationPreIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import {
  errorIconStyle,
  errorMsgStyle,
} from "@/page/App/components/Actions/ClickhouseConfigElement/style"
import { HuggingFaceConfigElementProps } from "@/page/App/components/Actions/HuggingFaceConfigElement/interface"
import {
  container,
  divider,
  footerStyle,
} from "@/page/App/components/Actions/HuggingFaceConfigElement/style"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { optionLabelStyle } from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import { TextLink } from "@/page/User/components/TextLink"
import { HuggingFaceResource } from "@/redux/resource/huggingFaceResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isURL } from "@/utils/typeHelper"

export const HuggingFaceConfigElement: FC<HuggingFaceConfigElementProps> = (
  props,
) => {
  const { onBack, onFinished, resourceId } = props
  const { t } = useTranslation()

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === resourceId,
    ) as Resource<HuggingFaceResource>
  })

  const [saving, setSaving] = useState(false)

  const handleURLValidate = useCallback(
    (value: string) =>
      isURL(value) ? true : t("editor.action.resource.error.invalid_url"),
    [t],
  )

  const handleURLClick = (link: string) => window.open(link, "_blank")

  const getTransComponent = (key: string, link: string) => {
    const handleLinKClick = () => handleURLClick(link)

    return (
      <Trans
        i18nKey={key}
        t={t}
        components={[<TextLink key={key} onClick={handleLinKClick} />]}
      />
    )
  }

  return (
    <form
      autoComplete="off"
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "huggingface",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              required: true,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.restapi.title.advanced_option")}
        </div>

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.restapi.label.base_url")}
          control={control}
          defaultValue={
            resource?.content.baseURL ??
            "https://api-inference.huggingface.co/models/"
          }
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleURLValidate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hugging_face_url"),
          ]}
          name="baseURL"
          tips={
            <>
              {formState.errors.baseURL ? (
                <div css={errorMsgStyle}>
                  <>
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState.errors.baseURL.message}
                  </>
                </div>
              ) : (
                <>
                  {getTransComponent(
                    "editor.action.resource.db.tip.hugging_face_url",
                    "https://huggingface.co/docs/api-inference/index",
                  )}
                </>
              )}
            </>
          }
        />

        <Controller
          control={control}
          defaultValue={
            resource?.content.urlParams ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange, onBlur } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.url_parameters")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index].value = v
                onChange(newRecords)
              }}
            />
          )}
          name="urlParams"
        />
        <Controller
          control={control}
          defaultValue={
            resource?.content.headers ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.headers")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index].value = v
                onChange(newRecords)
              }}
            />
          )}
          name="headers"
        />
        <Controller
          control={control}
          defaultValue={
            resource?.content.cookies ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.cookies")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index].value = v
                onChange(newRecords)
              }}
            />
          )}
          name="cookies"
        />

        <ControlledElement
          title={t("editor.action.resource.db.label.bear_token")}
          defaultValue={resource?.content.authContent.token ?? ""}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <>
              {getTransComponent(
                "editor.action.resource.db.tip.bear_token",
                "https://huggingface.co/settings/tokens",
              )}
            </>
          }
        />
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PaginationPreIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={onBack}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="techPurple"
            value="creating"
            disabled={!formState.isValid}
            loading={saving}
            type="submit"
          >
            {t("editor.action.form.btn.save_changes")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  )
}

HuggingFaceConfigElement.displayName = "HuggingFaceConfigElement"
