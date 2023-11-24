import { S3ResourceInitial } from "@illa-public/public-configs"
import { S3ACL, S3Resource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider, WarningCircleIcon, getColor } from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  errorIconStyle,
  errorMsgStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const S3ConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, formState, watch } = useFormContext()

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const SelectOptions = Object.keys(S3ACL).map((type) => ({
    label: t(`editor.action.acl.option.${type}`),
    value: S3ACL[type as keyof typeof S3ACL],
  }))

  let content: S3Resource
  if (findResource === undefined) {
    content = S3ResourceInitial
  } else {
    content = (findResource as Resource<S3Resource>).content
  }

  const baseURLOpen = watch("endpoint", content.endpoint)
  const aclDefaultValue = content.acl || t("editor.action.acl.option.blank")

  return (
    <>
      <div css={container}>
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
    </>
  )
}

S3ConfigElement.displayName = "S3ConfigElement"
export default S3ConfigElement
