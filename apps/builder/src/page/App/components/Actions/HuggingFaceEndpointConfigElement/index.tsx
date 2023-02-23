import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  FileDefaultIcon,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import {
  errorIconStyle,
  errorMsgStyle,
} from "@/page/App/components/Actions/ClickhouseConfigElement/style"
import {
  container,
  docContainerStyle,
  docItemStyle,
  docsItemContainerStyle,
  footerStyle,
  labelContainer,
  labelStyle,
  tipsStyle,
} from "@/page/App/components/Actions/HuggingFaceConfigElement/style"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import { HuggingFaceEndpointResource } from "@/redux/resource/huggingFaceEndpoint"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"

export const HuggingFaceEndpointConfigElement: FC<ConfigElementProps> = (
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
    ) as Resource<HuggingFaceEndpointResource>
  })
  const [saving, setSaving] = useState(false)

  const handleURLClick = (link: string) => window.open(link, "_blank")

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "hfendpoint",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={docsItemContainerStyle}>
          <div css={labelContainer} />
          <div css={docContainerStyle}>
            <span css={docItemStyle}>Learn more about Hugging Face:</span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick(
                  "https://huggingface.co/docs/inference-endpoints/index",
                )
              }
            >
              <FileDefaultIcon />
              <span>Inference Endpoint</span>
            </span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick(
                  "https://huggingface.co/docs/api-inference/quicktour",
                )
              }
            >
              <FileDefaultIcon />
              <span>API Doc</span>
            </span>
          </div>
        </div>

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />

        <ControlledElement
          title={t("editor.action.resource.api.label.hf_endpoint")}
          defaultValue={resource?.content.endpoint ?? ""}
          name="endpoint"
          controlledType="input"
          control={control}
          placeholders={[
            t("editor.action.resource.api.placeholder.hf_endpoint"),
          ]}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          isRequired
          tips={
            formState.errors.endpoint ? (
              <div css={errorMsgStyle}>
                <>
                  <WarningCircleIcon css={errorIconStyle} />
                  {formState.errors.endpoint.message}
                </>
              </div>
            ) : (
              <Trans
                i18nKey="editor.action.resource.api.tips.hf_endpoint"
                t={t}
                components={[
                  <TextLink
                    key={"editor.action.resource.api.tips.hf_endpoint"}
                    onClick={() => {
                      handleURLClick(
                        "https://huggingface.co/docs/inference-endpoints/guides/create_endpoint",
                      )
                    }}
                  />,
                ]}
              />
            )
          }
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />
        <ControlledElement
          title={t("editor.action.resource.api.label.hf_endpoint_token")}
          defaultValue={resource?.content.token ?? ""}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <Trans
              i18nKey="editor.action.resource.api.tips.hf_endpoint_token"
              t={t}
              components={[
                <TextLink
                  key={"editor.action.resource.api.tips.hf_endpoint_token"}
                  onClick={() => {
                    handleURLClick("https://huggingface.co/settings/tokens")
                  }}
                />,
              ]}
            />
          }
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
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

HuggingFaceEndpointConfigElement.displayName =
  "HuggingFaceEndpointConfigElement"
