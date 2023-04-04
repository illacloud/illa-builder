import { FC, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Alert,
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  getColor,
} from "@illa-design/react"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  divider,
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import {
  DbSSL,
  Resource,
  generateSSLConfig,
} from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, validate } from "@/utils/form"
import { isCloudVersion } from "@/utils/typeHelper"
import { MysqlLikeConfigElementProps } from "./interface"

/**
 * include mariadb or tidb
 * @param props
 * @constructor
 */

const getResourceDefaultPort = (resourceType: string) => {
  switch (resourceType) {
    case "postgresql":
    case "supabasedb":
      return "5432"
    case "mysql":
    case "mariadb":
      return "3306"
    case "tidb":
      return "4000"
    default:
      return "3306"
  }
}

export const MysqlLikeConfigElement: FC<MysqlLikeConfigElementProps> = (
  props,
) => {
  const { onBack, resourceType, resourceId, onFinished } = props

  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === resourceId,
    ) as Resource<MysqlLikeResource>
  })

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const hostValue = watch("host")
  const showAlert = isContainLocalPath(hostValue ?? "")
  const sslOpenWatch = watch("ssl", resource?.content.ssl.ssl ?? false)

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleConnectionTest = useCallback(() => {
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host,
        port: data.port.toString(),
        databaseName: data.databaseName,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: generateSSLConfig(sslOpenWatch, data) as DbSSL,
      },
      "mysql",
      setTestLoading,
    )
  }, [getValues, sslOpenWatch])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "mysql",
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
          title={t("editor.action.resource.db.label.hostname_port")}
          defaultValue={[resource?.content.host, resource?.content.port]}
          name={["host", "port"]}
          controlledType={["input", "number"]}
          control={control}
          rules={[
            {
              validate,
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
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            getResourceDefaultPort(resourceType),
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
                          onClick={handleDocLinkClick}
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
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={resource?.content.ssl.ssl}
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />
        {sslOpenWatch && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.ca_certificate")}
              isRequired
              rules={[
                {
                  validate,
                },
              ]}
              control={control}
              defaultValue={resource?.content.ssl.serverCert}
              name="serverCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={resource?.content.ssl.clientKey}
              name="clientKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_certificate")}
              control={control}
              defaultValue={resource?.content.ssl.clientCert}
              name="clientCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
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

MysqlLikeConfigElement.displayName = "MysqlConfigElement"
