import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import { Resource } from "@/redux/resource/resourceState"
import {
  S3Resource,
  S3ResourceInitial,
  SelectOptions,
} from "@/redux/resource/s3Resource"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"

export const S3ConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const { track } = useContext(MixpanelTrackContext)

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: S3Resource
  if (findResource === undefined) {
    content = S3ResourceInitial
  } else {
    content = (findResource as Resource<S3Resource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const baseURLOpen = watch("endpoint", content.endpoint)
  const aclDefaultValue = content.acl || t("editor.action.acl.option.blank")

  const handleConnectionTest = () => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "s3",
    })
    const data = getValues()
    const content = {
      bucketName: data.bucketName,
      region: data.region,
      endpoint: data.endpoint,
      baseURL: data.baseURL && data.baseURL.trim(),
      accessKeyID: data.accessKeyID,
      secretAccessKey: data.secretAccessKey,
      acl:
        !data.acl || data.acl === t("editor.action.acl.option.blank")
          ? ""
          : data.acl,
    }
    onActionConfigElementTest(data, content, "s3", setTestLoading)
  }

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "s3",
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
          defaultValue={findResource?.resourceName ?? ""}
          rules={[
            {
              validate,
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
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.s3.label.bucket_name")}
          defaultValue={content.bucketName}
          control={control}
          name="bucketName"
          controlledType="input"
        />
        <ControlledElement
          title={t("editor.action.form.label.acl")}
          defaultValue={aclDefaultValue}
          name="acl"
          controlledType="select"
          control={control}
          options={SelectOptions}
          tips={
            <Trans
              i18nKey="editor.action.form.tips.acl"
              t={t}
              components={[
                <TextLink
                  key="editor.action.form.tips.acl"
                  onClick={() => {
                    window.open(
                      "https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html",
                      "_blank",
                    )
                  }}
                />,
              ]}
            />
          }
        />
        <ControlledElement
          title={t("editor.action.resource.s3.label.region")}
          defaultValue={content.region}
          rules={[
            {
              validate,
            },
          ]}
          controlledType="input"
          control={control}
          isRequired
          name="region"
          placeholders={[t("editor.action.resource.s3.placeholder.region")]}
        />
        <ControlledElement
          title={t("editor.action.resource.s3.label.custome_s3_endpoint")}
          control={control}
          defaultValue={content.endpoint}
          name="endpoint"
          controlledType="switch"
          contentLabel={t(
            "editor.action.resource.s3.label.use_custome_s3_endpoint",
          )}
          tips={t("editor.action.resource.s3.tip.custome_s3_endpoint_tip")}
        />
        {baseURLOpen && (
          <ControlledElement
            title={t("editor.action.resource.s3.label.base_url")}
            isRequired
            defaultValue={content.baseURL}
            control={control}
            rules={[
              {
                required: t("editor.action.resource.error.invalid_url"),
                validate: urlValidate,
              },
            ]}
            controlledType="input"
            placeholders={[t("editor.action.resource.s3.placeholder.base_url")]}
            name="baseURL"
            tips={
              formState.errors.baseURL && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  <>{formState.errors.baseURL.message}</>
                </div>
              )
            }
          />
        )}
        <ControlledElement
          title={t("editor.action.resource.s3.label.access_key")}
          isRequired
          defaultValue={content.accessKeyID}
          control={control}
          rules={[
            {
              validate,
            },
          ]}
          name="accessKeyID"
          controlledType="input"
          tips={
            isCloudVersion &&
            t("editor.action.resource.db.tip.username_password")
          }
        />
        <ControlledElement
          title={t("editor.action.resource.s3.label.secret_access_key")}
          isRequired
          defaultValue={content.secretAccessKey}
          control={control}
          rules={[
            {
              required: true,
            },
          ]}
          name="secretAccessKey"
          controlledType="password"
        />
        {isCloudVersion && (
          <>
            <div css={configItemTip}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={connectType}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.resource.db.label.connect_type")}
                </span>
              </div>
              <span css={connectTypeStyle}>
                {t("editor.action.resource.db.tip.connect_type")}
              </span>
            </div>
          </>
        )}
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
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={handleConnectionTest}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
          <Button
            colorScheme="techPurple"
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

S3ConfigElement.displayName = "S3ConfigElement"
