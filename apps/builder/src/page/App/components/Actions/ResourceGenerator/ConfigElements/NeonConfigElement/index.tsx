import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Alert,
  Button,
  ButtonGroup,
  Input,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import { ResourceDivider } from "@/page/App/components/Actions/ResourceDivider"
import {
  applyConfigItemLabelText,
  configItem,
  connectType,
  connectTypeStyle,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  configItemTip,
  hostInputContainer,
} from "@/page/App/components/ControlledElement/style"
import { NeonResource, neonDefaultPort } from "@/redux/resource/neonResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, urlValidate, validate } from "@/utils/form"
import { handleLinkOpen } from "@/utils/navigate"
import { isURL } from "@/utils/typeHelper"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const getParsedStringValue = (inputString: string) => {
  const regex = /^postgres:\/\/([^:]+)(?::([^@]*))?@([^\/]+)\/(.+)$/
  const match = inputString.match(regex)
  if (!match) {
    return {
      roleName: null,
      password: null,
      hostWithoutPort: null,
      dbName: null,
    }
  }
  return {
    roleName: match?.[1] || null,
    password: match?.[2] || null,
    hostWithoutPort: match?.[3] || null,
    dbName: match?.[4] || null,
  }
}

const handleConnectionStringValidate = (inputString: string) => {
  if (!inputString) {
    return ""
  }
  const errorMsg = "editor.action.form.tips.neon.failed"
  const isPostgres = /^postgres:/i.test(inputString)
  if (!isPostgres) {
    return errorMsg
  }
  const { roleName, dbName, hostWithoutPort, password } =
    getParsedStringValue(inputString)

  if (
    roleName === null ||
    hostWithoutPort === null ||
    (hostWithoutPort && !isURL(hostWithoutPort)) ||
    dbName === null
  ) {
    return errorMsg
  }
  if (password === null) {
    return "editor.action.form.tips.neon.no_password"
  }
  return ""
}

const NeonConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID, onBack, hasFooter = true } = props

  const { t } = useTranslation()
  const { control, reset, getValues, formState, watch } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<NeonResource>
  })
  const hostValue = watch("host")
  const connectionString = watch("connectionString")
  const showAlert = isContainLocalPath(hostValue ?? "")
  const connectionStringErrorMsg =
    handleConnectionStringValidate(connectionString)

  const handleDocLinkClick = (link: string) => () => handleLinkOpen(link)

  const handleConnectionStringParse = useCallback(() => {
    const res = getParsedStringValue(connectionString)
    const { resourceName } = getValues()
    const { roleName, password, hostWithoutPort, dbName } = res
    reset({
      resourceName,
      connectionString: "",
      host: hostWithoutPort ?? "",
      databaseName: dbName,
      databaseUsername: roleName,
      databasePassword: password,
    })
  }, [connectionString, reset, getValues])

  const ConnectionStringTips = () => (
    <Trans
      i18nKey="editor.action.form.tips.neon.normal"
      t={t}
      components={[
        <TextLink
          key="editor.action.form.tips.neon.normal"
          onClick={handleDocLinkClick(
            "https://console.neon.tech/app/projects/",
          )}
        />,
      ]}
    />
  )

  return (
    <>
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
        <ResourceDivider type="General Option" />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.form.option.neon.connection_string")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              control={control}
              defaultValue=""
              rules={{
                validate: () => {
                  return !connectionStringErrorMsg
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  error={!!connectionStringErrorMsg}
                  value={value}
                  colorScheme="techPurple"
                  placeholder="postgres://testUser:abcdefg@ep-restless-rice-862380.us-east-2.aws.neon.tech/neondb"
                />
              )}
              name="connectionString"
            />
            <Button
              disabled={!!connectionStringErrorMsg || !connectionString}
              onClick={handleConnectionStringParse}
              colorScheme="techPurple"
              h="32px"
            >
              {t("editor.action.form.option.neon.parse")}
            </Button>
          </div>
        </div>
        <div css={configItemTip}>
          {!!connectionStringErrorMsg ? (
            <div css={errorMsgStyle}>
              <WarningCircleIcon css={errorIconStyle} />
              <>{t(connectionStringErrorMsg)}</>
            </div>
          ) : (
            <div>
              <ConnectionStringTips />
            </div>
          )}
        </div>

        <ControlledElement
          title={t("editor.action.resource.db.label.hostname_port")}
          defaultValue={[
            resource?.content.host,
            +(resource?.content.port ?? neonDefaultPort),
          ]}
          name={["host", "port"]}
          controlledType={["input", "number"]}
          control={control}
          isRequired
          rules={[
            {
              validate: urlValidate,
            },
            {
              required: true,
            },
          ]}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.hostname")]}
          tips={
            formState.errors.host && !showAlert ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
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
                          onClick={handleDocLinkClick(
                            "https://www.illacloud.com/docs/illa-cli",
                          )}
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

        <ControlledElement
          title={t("editor.action.resource.db.label.database")}
          defaultValue={resource?.content.databaseName}
          name="databaseName"
          controlledType="input"
          control={control}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.database")]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          defaultValue={[
            resource?.content.databaseUsername,
            resource?.content.databasePassword,
          ]}
          name={["databaseUsername", "databasePassword"]}
          controlledType={["input", "password"]}
          control={control}
          isRequired
          rules={[
            {
              validate,
            },
            {
              required: true,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.username"),
            t("editor.action.resource.db.placeholder.password"),
          ]}
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
      {hasFooter && (
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
            <TestConnectButton resourceType="neon" />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}
NeonConfigElement.displayName = "NeonConfigElement"
export default NeonConfigElement
