import { RedisResourceInitial } from "@illa-public/public-configs"
import { RedisResource } from "@illa-public/public-types"
import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useMemo, useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Alert, Button, Divider, Input, getColor } from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { ControlledType } from "@/page/App/components/Actions/ControlledElement/interface"
import { hostInputContainer } from "@/page/App/components/Actions/ControlledElement/style"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, validate } from "@/utils/form"
import { container } from "../style"
import { RedisLikeConfigElementProps } from "./interface"

function parseDatabaseConnectionString(
  connectionString: string,
): Omit<RedisResource, "ssl" | "databaseIndex"> | undefined {
  const regex = /^redis:\/\/([^:]+):([^@]+)@([^:]+):(\d+)$/
  const match = connectionString.match(regex)

  if (!match || match.length !== 5) {
    return undefined
  }

  const [, databaseUsername, databasePassword, host, port] = match

  return {
    databaseUsername,
    databasePassword,
    host,
    port,
  }
}

const checkIsValidConnectionString = (connectionString: string) => {
  const pattern = /^redis:\/\/([^:]+):([^@]+)@([^:]+):(\d+)$/
  return pattern.test(connectionString)
}

const RedisConfigElement: FC<RedisLikeConfigElementProps> = (props) => {
  const { resourceID, resourceType } = props
  const { t } = useTranslation()
  const { control, setValue } = useFormContext()
  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: RedisResource
  if (findResource === undefined) {
    content = RedisResourceInitial
  } else {
    content = (findResource as Resource<RedisResource>).content
  }

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const userNameOrPassword = useMemo(() => {
    return {
      title: t("editor.action.resource.db.label.username_password"),
      controlledType: ["input", "password"] as ControlledType[],
      name: ["databaseUsername", "databasePassword"],
      defaultValue: [content.databaseUsername, content.databasePassword],
      placeholders: [
        t("editor.action.resource.db.placeholder.username"),
        t("editor.action.resource.db.placeholder.password"),
      ],
    }
  }, [content.databasePassword, content.databaseUsername, t])

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? "")
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert)
      }
      return true
    },
    [showAlert],
  )

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
        <Controller
          control={control}
          defaultValue=""
          rules={{
            required: false,
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <div css={configItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.form.option.neon.connection_string")}
                </span>
              </div>
              <div css={hostInputContainer}>
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  error={!checkIsValidConnectionString(value) && value !== ""}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="redis://myuser:mypassword@localhost:6379"
                />
                <Button
                  disabled={!checkIsValidConnectionString(value)}
                  onClick={() => {
                    const db = parseDatabaseConnectionString(value)
                    if (db !== undefined) {
                      setValue("host", db.host)
                      setValue("port", db.port)
                      setValue("databaseUsername", db.databaseUsername)
                      setValue("databasePassword", db.databasePassword)
                      onChange("")
                    }
                  }}
                  colorScheme="techPurple"
                  h="32px"
                >
                  {t("editor.action.form.option.neon.parse")}
                </Button>
              </div>
            </div>
          )}
          name="connectionString"
        />
        <ControlledElement
          defaultValue={[content.host, content.port]}
          title={t("editor.action.resource.db.label.hostname_port")}
          control={control}
          rules={[
            {
              required: true,
              validate: handleHostValidate,
            },
            {
              required: true,
            },
          ]}
          isRequired
          controlledType={["input", "number"]}
          name={["host", "port"]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            "6379",
          ]}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
        />
        {showAlert && (
          <ControlledElement
            defaultValue=""
            name=""
            title=""
            controlledType="none"
            control={control}
            tips={
              <Alert
                title={t("editor.action.form.tips.connect_to_local.title.tips")}
                closable={false}
                content={
                  isCloudVersion ? (
                    <Trans
                      i18nKey="editor.action.form.tips.connect_to_local.cloud"
                      t={t}
                      components={[
                        <TextLink
                          key="editor.action.form.tips.connect_to_local.cloud"
                          onClick={() => {
                            window.open(
                              "https://www.illacloud.com/docs/illa-cli",
                              "_blank",
                            )
                          }}
                        />,
                      ]}
                    />
                  ) : (
                    t("editor.action.form.tips.connect_to_local.selfhost")
                  )
                }
              />
            }
          />
        )}
        {resourceType === "redis" && (
          <ControlledElement
            title={t("editor.action.resource.db.label.database_index")}
            defaultValue={content.databaseIndex}
            name="databaseIndex"
            placeholders={[
              t("editor.action.resource.db.placeholder.database_index"),
            ]}
            controlledType="number"
            control={control}
          />
        )}
        <ControlledElement
          title={userNameOrPassword.title}
          controlledType={userNameOrPassword.controlledType}
          control={control}
          defaultValue={userNameOrPassword.defaultValue}
          name={userNameOrPassword.name}
          placeholders={userNameOrPassword.placeholders}
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
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl}
          controlledType="switch"
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />
      </div>
    </>
  )
}

RedisConfigElement.displayName = "RedisConfigElement"
export default RedisConfigElement
