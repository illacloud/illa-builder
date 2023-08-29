import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Divider, PreviousIcon } from "@illa-design/react"
import { BasicAuthConfig } from "@/page/App/components/Actions/SnowflakeConfigElement/BasicAuthConfig"
import { KeyPairConfig } from "@/page/App/components/Actions/SnowflakeConfigElement/KeyPairConfig"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  divider,
  footerStyle,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  AuthenticationOptions,
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeKeyAuthenticationType,
  SnowflakeResource,
  snowflakeResourceInitial,
} from "@/redux/resource/snowflakeResource"
import { RootState } from "@/store"
import { validate } from "@/utils/form"

type SnowflakeType = SnowflakeResource<SnowflakeAuthenticationType>

export const SnowflakeConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = (resource?.content ??
    snowflakeResourceInitial) as SnowflakeType
  const authenticationType = watch("authentication", content.authentication)

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "snowflake",
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        accountName: data.accountName,
        warehouse: data.warehouse,
        database: data.database,
        schema: data.schema,
        role: data.role,
        authentication: data.authentication,
        authContent:
          data.authentication === "basic"
            ? {
                username: data.username,
                password: data.password,
              }
            : {
                username: data.username,
                privateKey: data.privateKey,
              },
      } as SnowflakeType,
      "snowflake",
      setTestLoading,
    )
  }, [getValues, track])

  return (
    <form
      autoComplete="off"
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "snowflake",
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

SnowflakeConfigElement.displayName = "SnowflakeConfigElement"
