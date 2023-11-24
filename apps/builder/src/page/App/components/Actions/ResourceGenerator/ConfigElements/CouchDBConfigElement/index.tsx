import { CouchdbResourceInitial } from "@illa-public/public-configs"
import { CouchdbResource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
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
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const CouchDBConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, formState } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = resource
    ? (resource.content as CouchdbResource)
    : CouchdbResourceInitial

  return (
    <>
      <div css={container}>
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
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.hostname")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          name="host"
          tips={
            formState.errors.host && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            )
          }
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.port")}
          control={control}
          defaultValue={content.port}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.form.placeholder.couchdb.port.5984")]}
          name="port"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.username")}
          control={control}
          defaultValue={content.username}
          rules={[
            {
              validate,
            },
          ]}
          name="username"
        />
        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.resource.db.label.password")}
          control={control}
          defaultValue={content.password}
          rules={[
            {
              validate,
            },
          ]}
          name="password"
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
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <ControlledElement
          controlledType="switch"
          title={t("editor.action.form.label.couchdb.ssl")}
          control={control}
          defaultValue={content.ssl}
          name="ssl"
          contentLabel={t("editor.action.form.option.couchdb.ssl")}
        />
      </div>
    </>
  )
}

CouchDBConfigElement.displayName = "CouchDBConfigElement"
export default CouchDBConfigElement
