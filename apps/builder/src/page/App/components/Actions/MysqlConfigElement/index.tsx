import { forwardRef, useState } from "react"
import { MysqlConfigElementProps } from "@/page/App/components/Actions/MysqlConfigElement/interface"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectTypeStyle,
  container,
  divider,
  footerStyle,
  hostInputContainer,
  labelContainer,
  optionLabelStyle,
  sslItem,
  sslStyle,
} from "./style"
import { Input, Password, TextArea } from "@illa-design/input"
import { getColor } from "@illa-design/theme"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/divider"
import { Switch } from "@illa-design/switch"
import { InputNumber } from "@illa-design/input-number"
import { Controller, useForm } from "react-hook-form"
import { Button, ButtonGroup } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"

export const MysqlConfigElement = forwardRef<
  HTMLDivElement,
  MysqlConfigElementProps
>((props, ref) => {
  const { onBack } = props

  const { t } = useTranslation()

  const [sslOpen, setSSLOpen] = useState(false)

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
  })

  const [testLoading, setTestLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)

  return (
    <form onSubmit={handleSubmit((data, event) => {})}>
      <div ref={ref} css={container}>
        <div css={divider} />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.mysql.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                borderColor="techPurple"
                placeholder={t("editor.action.resource.mysql.placeholder.name")}
              />
            )}
            name="resourceName"
          />
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.mysql.label.hostname_port")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  borderColor="techPurple"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.hostname",
                  )}
                />
              )}
              name="host"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputNumber
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  borderColor="techPurple"
                  w="142px"
                  ml="8px"
                  placeholder="3306"
                />
              )}
              name="port"
            />
          </div>
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.mysql.label.database")}
            </span>
          </div>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                borderColor="techPurple"
                placeholder={t(
                  "editor.action.resource.mysql.placeholder.database",
                )}
              />
            )}
            name="database"
          />
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.mysql.label.username_password")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  borderColor="techPurple"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.username",
                  )}
                />
              )}
              name="username"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Password
                  borderColor="techPurple"
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  ml="8px"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.password",
                  )}
                />
              )}
              name="password"
            />
          </div>
        </div>
        <span css={configItemTip}>
          {t("editor.action.resource.mysql.tip.username_password")}
        </span>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.mysql.label.connect_type")}
            </span>
          </div>
          <span css={connectTypeStyle}>
            {t("editor.action.resource.mysql.tip.connect_type")}
          </span>
        </div>
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.mysql.title.advanced_option")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.mysql.label.ssl_options")}
            </span>
          </div>
          <Switch
            ml="16px"
            colorScheme="techPurple"
            onChange={(open) => {
              setSSLOpen(open)
            }}
          />
          <span css={sslStyle}>
            {t("editor.action.resource.mysql.tip.ssl_options")}
          </span>
        </div>
        {sslOpen && (
          <>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                  *
                </span>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.ca_certificate")}
                </span>
              </div>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                shouldUnregister={!sslOpen}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoSize
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="serverCert"
              />
            </div>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                  *
                </span>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.client_key")}
                </span>
              </div>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                shouldUnregister={!sslOpen}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    autoSize
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="clientKey"
              />
            </div>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                  *
                </span>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.client_certificate")}
                </span>
              </div>
              <Controller
                control={control}
                shouldUnregister={!sslOpen}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    autoSize
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="clientCert"
              />
            </div>
          </>
        )}
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PaginationPreIcon />}
          variant="text"
          colorScheme="gray"
          onClick={() => {
            onBack()
          }}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="submit"
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
          <Button
            colorScheme="techPurple"
            disabled={!formState.isValid}
            loading={createLoading}
            type="submit"
          >
            {t("editor.action.form.btn.create_resource")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  )
})

MysqlConfigElement.displayName = "MysqlConfigElement"
