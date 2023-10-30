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
  configItemTip,
  connectType,
  connectTypeStyle,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import {
  ConnectTypeOptions,
  OracleResource,
  OracleResourceInitial,
} from "@/redux/resource/oracleResource"
import { RootState } from "@/store"
import { isContainLocalPath, urlValidate, validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { container } from "../style"
import { OracleDBConfigElementProps } from "./interface"

const OracleDBConfigElement: FC<OracleDBConfigElementProps> = (props) => {
  const { resourceID, onBack, hasFooter = true, resourceType } = props
  const { t } = useTranslation()
  const { control, formState } = useFormContext()

  const [showAlert, setShowAlert] = useState<boolean>(false)

  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })
  const content = (resource?.content as OracleResource) ?? OracleResourceInitial

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback((value: string) => {
    setShowAlert(isContainLocalPath(value))
    return urlValidate(value)
  }, [])

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
          title={t("editor.action.resource.db.label.hostname")}
          defaultValue={content.host}
          isRequired
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleHostValidate,
            },
          ]}
          name="host"
          controlledType="input"
          control={control}
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
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="port"
          controlledType="input"
          control={control}
          placeholders={["1521"]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.database")}
          defaultValue={content.name}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="name"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
        />

        <ControlledElement
          title={t("editor.action.form.label.oracle.sid")}
          defaultValue={content.connectionType}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="connectionType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth={true}
          options={ConnectTypeOptions}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username")}
          defaultValue={content.username}
          name="username"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.username")]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.password")}
          defaultValue={content.password}
          name="password"
          controlledType="password"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.password")]}
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
          title={t("editor.action.form.label.oracle.ssl")}
          defaultValue={content.ssl}
          isRequired
          name="ssl"
          controlledType="switch"
          control={control}
          contentLabel={t("editor.action.form.option.oracle.ssl")}
        />
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
            <TestConnectButton resourceType={resourceType} />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}
OracleDBConfigElement.displayName = "OracleDBConfigElement"
export default OracleDBConfigElement
