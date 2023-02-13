import { FC, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Divider, PreviousIcon } from "@illa-design/react"
import {
  container,
  divider,
  footerStyle,
} from "@/page/App/components/Actions/MicrosoftSqlConfigElement/style"
import { BasicAuthConfig } from "@/page/App/components/Actions/SnowflakeConfigElement/BasicAuthConfig"
import { KeyPairConfig } from "@/page/App/components/Actions/SnowflakeConfigElement/KeyPairConfig"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import { optionLabelStyle } from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  AuthenticationOptions,
  SnowflakeAuthenticationSelectType,
  SnowflakeAuthenticationType,
  SnowflakeBasicAuthenticationType,
  SnowflakeKeyAuthenticationType,
  SnowflakeResource,
  snowflakeResourceInitial,
} from "@/redux/resource/snowflakeResource"
import { RootState } from "@/store"

type SnowflakeType = SnowflakeResource<SnowflakeAuthenticationType>

export const SnowflakeConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  const content = (resource?.content ??
    snowflakeResourceInitial) as SnowflakeType

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [authenticationType, setAuthenticationType] =
    useState<SnowflakeAuthenticationSelectType>(content.authentication)

  const handleConnectionTest = useCallback(() => {
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
  }, [getValues])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
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
          title={"Account Identifier"}
          control={control}
          defaultValue={content.accountName}
          rules={[
            {
              required: true,
            },
          ]}
          placeholders={["xy12345.us-east-2.aws"]}
          name="accountName"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={"Warehouse"}
          control={control}
          defaultValue={content.warehouse}
          rules={[
            {
              required: true,
            },
          ]}
          placeholders={["COMPUTE_WH"]}
          name="warehouse"
        />
        <ControlledElement
          controlledType={["input"]}
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={content.database}
          rules={[
            {
              required: true,
            },
          ]}
          placeholders={["SNOWFLAKE_SAMPLE_DATA"]}
          name="database"
        />
        <ControlledElement
          controlledType={["input"]}
          title={"Schema"}
          control={control}
          defaultValue={content.schema}
          placeholders={["PUBLIC"]}
          name="schema"
        />
        <ControlledElement
          controlledType={["input"]}
          title={"Role"}
          control={control}
          defaultValue={content.role}
          placeholders={["PUBLIC"]}
          name="role"
        />

        <ControlledElement
          controlledType={["select"]}
          control={control}
          isRequired
          rules={[
            {
              required: true,
            },
          ]}
          title={"Authentication"}
          name={"authentication"}
          defaultValue={content.authentication}
          options={AuthenticationOptions}
          onValueChange={(value) =>
            setAuthenticationType(value as SnowflakeAuthenticationSelectType)
          }
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
