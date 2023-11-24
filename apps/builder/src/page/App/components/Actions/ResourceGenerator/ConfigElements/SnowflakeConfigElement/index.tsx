import { snowflakeResourceInitial } from "@illa-public/public-configs"
import {
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeKeyAuthenticationType,
  SnowflakeResource,
} from "@illa-public/public-types"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider } from "@illa-design/react"
import { optionLabelStyle } from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { BasicAuthConfig } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SnowflakeConfigElement/BasicAuthConfig"
import { KeyPairConfig } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/SnowflakeConfigElement/KeyPairConfig"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"
import { AuthenticationOptions } from "./constants"

type SnowflakeType = SnowflakeResource<SnowflakeAuthenticationType>

const SnowflakeConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control, watch } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = (resource?.content ??
    snowflakeResourceInitial) as SnowflakeType
  const authenticationType = watch("authentication", content.authentication)

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
          title={t("editor.action.resource.db.label.account_name")}
          control={control}
          defaultValue={content.accountName}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.account_name"),
          ]}
          name="accountName"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.warehouse")}
          control={control}
          defaultValue={content.warehouse}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.warehouse")]}
          name="warehouse"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={content.database}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.snowflake_database"),
          ]}
          name="database"
        />
        <ControlledElement
          controlledType="input"
          title={t("editor.action.resource.db.label.schema")}
          control={control}
          defaultValue={content.schema}
          placeholders={[t("editor.action.resource.db.placeholder.schema")]}
          name="schema"
        />
        <ControlledElement
          controlledType="input"
          title={t("editor.action.resource.db.label.role")}
          control={control}
          defaultValue={content.role}
          placeholders={[t("editor.action.resource.db.placeholder.schema")]}
          name="role"
        />

        <ControlledElement
          controlledType="select"
          control={control}
          isRequired
          rules={[
            {
              required: true,
            },
          ]}
          title={t("editor.action.resource.restapi.label.authentication")}
          name="authentication"
          defaultValue={content.authentication}
          options={AuthenticationOptions}
        />
        {authenticationType === "basic" ? (
          <BasicAuthConfig
            control={control}
            {...(content.authContent as SnowflakeBasicAuthenticationType)}
          />
        ) : (
          <KeyPairConfig
            control={control}
            {...(content.authContent as SnowflakeKeyAuthenticationType)}
          />
        )}
      </div>
    </>
  )
}

SnowflakeConfigElement.displayName = "SnowflakeConfigElement"
export default SnowflakeConfigElement
