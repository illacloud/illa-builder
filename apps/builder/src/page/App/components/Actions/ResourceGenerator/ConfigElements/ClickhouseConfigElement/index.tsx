import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useState } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Alert,
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  applyConfigItemLabelText,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
} from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ClickhouseConfigElement/style"
import {
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  ClickhouseResource,
  ClickhouseResourceInitial,
} from "@/redux/resource/clickhouseResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, urlValidate, validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const ClickhouseConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { onBack, resourceID, hasFooter = true } = props

  const { t } = useTranslation()
  const { control, formState, watch } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<ClickhouseResource>
  })

  const content = resource?.content ?? ClickhouseResourceInitial

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const sslOpen = watch("ssl", content.ssl.ssl)
  const selfSigned = sslOpen && watch("selfSigned", content.ssl.selfSigned)

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? "")
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert)
      }
      return urlValidate(value)
    },
    [showAlert],
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
          controlledType={["input", "number"]}
          isRequired
          title={t("editor.action.resource.db.label.hostname_port")}
          control={control}
          defaultValue={[content.host, content.port]}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleHostValidate,
            },
            {
              required: true,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            "9440",
          ]}
          name={["host", "port"]}
          styles={[
            {},
            {
              w: "142px",
              ml: "8px",
            },
          ]}
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
          controlledType={["input"]}
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={content.databaseName}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
          name="databaseName"
        />

        <ControlledElement
          controlledType={["input", "password"]}
          title={t("editor.action.resource.db.label.username_password")}
          control={control}
          defaultValue={[content.username, content.password]}
          placeholders={[
            t("editor.action.resource.db.placeholder.username"),
            t("editor.action.resource.db.placeholder.password"),
          ]}
          name={["username", "password"]}
          styles={[
            {},
            {
              ml: "8px",
            },
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
          defaultValue={content.ssl.ssl}
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
          tips={t("editor.action.form.tips.clickhouse.ssl")}
        />

        {sslOpen && (
          <ControlledElement
            controlledType={["switch"]}
            title={""}
            control={control}
            defaultValue={content.ssl.selfSigned}
            name="selfSigned"
            contentLabel={t(
              "editor.action.resource.db.label.self_signed_certificate",
            )}
          />
        )}
        {selfSigned && (
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
              defaultValue={content.ssl.caCert}
              name="caCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={content.ssl.privateKey}
              name="privateKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_certificate")}
              control={control}
              defaultValue={content.ssl.clientCert}
              name="clientCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
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
            <TestConnectButton resourceType="clickhouse" />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

ClickhouseConfigElement.displayName = "ClickhouseConfigElement"
export default ClickhouseConfigElement
