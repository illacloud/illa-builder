import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Password,
  PreviousIcon,
  Switch,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import {
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
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
import { isCloudVersion, isURL } from "@/utils/typeHelper"
import { S3ConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  sslStyle,
} from "./style"

export const S3ConfigElement: FC<S3ConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  let content: S3Resource

  if (findResource === undefined) {
    content = S3ResourceInitial
  } else {
    content = (findResource as Resource<S3Resource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [baseURLOpen, setBaseURLOpen] = useState(content.endpoint)

  const handleConnectionTest = () => {
    const data = getValues()
    const content = {
      bucketName: data.bucketName,
      region: data.region,
      endpoint: data.endpoint,
      baseURL: data.baseURL,
      accessKeyID: data.accessKeyID,
      secretAccessKey: data.secretAccessKey,
      acl:
        !data.acl || data.acl === t("editor.action.acl.option.blank")
          ? t("editor.action.acl.option.blank")
          : data.acl,
    }
    onActionConfigElementTest(data, content, "s3", setTestLoading)
  }

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "s3",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={findResource?.resourceName ?? ""}
            rules={{
              validate: (value) => value != undefined && value.trim() != "",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t("editor.action.resource.db.placeholder.name")}
              />
            )}
            name="resourceName"
          />
        </div>
        <div css={configItemTip}>
          {t("editor.action.resource.restapi.tip.name")}
        </div>
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
        <div css={configItem}>
          <div css={labelContainer}>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.s3.label.bucket_name")}
            </span>
          </div>
          <Controller
            defaultValue={content.bucketName}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
              />
            )}
            name="bucketName"
          />
        </div>

        <ControlledElement
          title={t("editor.action.form.label.acl")}
          defaultValue={content.acl}
          name="acl"
          allowClear={true}
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

        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.s3.label.region")}
            </span>
          </div>
          <Controller
            defaultValue={content.region}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t("editor.action.resource.s3.placeholder.region")}
              />
            )}
            name="region"
          />
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.s3.label.custome_s3_endpoint")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={content.endpoint}
            render={({ field: { value, onChange, onBlur } }) => (
              <Switch
                checked={value}
                ml="16px"
                colorScheme="techPurple"
                onChange={(open) => {
                  onChange(open)
                  setBaseURLOpen(open)
                }}
                onBlur={onBlur}
              />
            )}
            name="endpoint"
          />
          <span css={sslStyle}>
            {t("editor.action.resource.s3.label.use_custome_s3_endpoint")}
          </span>
        </div>
        <div css={configItemTip}>
          {t("editor.action.resource.s3.tip.custome_s3_endpoint_tip")}
        </div>

        {baseURLOpen && (
          <>
            <div css={configItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.s3.label.base_url")}
                </span>
              </div>
              <Controller
                defaultValue={content.baseURL}
                control={control}
                rules={{
                  validate: (value: string) => {
                    return isURL(value)
                      ? true
                      : t("editor.action.resource.error.invalid_url")
                  },
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    w="100%"
                    ml="16px"
                    mr="24px"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    colorScheme="techPurple"
                    placeholder={t(
                      "editor.action.resource.s3.placeholder.base_url",
                    )}
                  />
                )}
                name="baseURL"
              />
            </div>
            <div css={configItemTip}>
              {formState.errors.baseURL && (
                <div css={errorMsgStyle}>
                  <WarningCircleIcon css={errorIconStyle} />
                  {(formState.errors as Record<string, any>).baseURL.message}
                </div>
              )}
            </div>
          </>
        )}
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.s3.label.access_key")}
            </span>
          </div>

          <Controller
            defaultValue={content.accessKeyID}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
              />
            )}
            name="accessKeyID"
          />
        </div>
        {isCloudVersion && (
          <div css={configItemTip}>
            {t("editor.action.resource.db.tip.username_password")}
          </div>
        )}
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.s3.label.secret_access_key")}
            </span>
          </div>

          <Controller
            defaultValue={content.secretAccessKey}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Password
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
              />
            )}
            name="secretAccessKey"
          />
        </div>
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
