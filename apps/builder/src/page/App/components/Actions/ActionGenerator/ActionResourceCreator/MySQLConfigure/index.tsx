import { forwardRef, useImperativeHandle, useState } from "react"
import { css } from "@emotion/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Input, Password, TextArea } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { InputNumber } from "@illa-design/input-number"
import { useSelector } from "react-redux"
import {
  connectTextStyle,
  descriptionStyle,
  errorMessageStyle,
  formStyle,
  gridContainerStyle,
  gridRowContainerStyle,
  groupTitleStyle,
  labelTextStyle,
  requiredLabelTextStyle,
  splitLineStyle,
  formPaddingStyle,
  hostnamePortStyle,
  switchAreaStyle,
  switchDescriptionStyle,
  usernamePasswordStyle,
  applyGridColIndex,
} from "./style"
import { MySQLConfigureProps, MySQLConfigureValues } from "./interface"
import i18n from "@/i18n/config"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { MysqlResource } from "@/redux/resource/resourceState"

export const MySQLConfigure = forwardRef<HTMLFormElement, MySQLConfigureProps>(
  (props, ref) => {
    const { resourceId, connectionRef, onSubmit, onTestConnection } = props
    const resourceConfig = useSelector(getAllResources).find(
      (i) => i.resourceId === resourceId,
    )
    const [enableSSL, setEnableSSL] = useState(
      (resourceConfig?.content as MysqlResource)?.ssl?.ssl,
    )
    const {
      handleSubmit,
      control,
      register,
      resetField,
      formState: { errors },
      getValues,
      setValue,
    } = useForm<MySQLConfigureValues>({
      mode: "onSubmit",
      defaultValues: {
        resourceName: resourceConfig?.resourceName,
        ...resourceConfig?.content,
      } || {
        port: 3306,
      },
    })

    const testConnection = () => {
      const data = getValues()
      const { resourceName, ...content } = data

      onTestConnection?.({
        resourceName: resourceName,
        resourceType: "mysql",
        content: {
          ...content,
          port: content.port?.toString(),
        },
      })
    }

    useImperativeHandle(connectionRef, () => {
      {
        return { testConnection }
      }
    })

    const submitForm: SubmitHandler<MySQLConfigureValues> = (data) => {
      const { resourceName, ...content } = data
      onSubmit?.({
        resourceName: resourceName,
        resourceType: "mysql",
        content: {
          ...content,
          port: content.port?.toString(),
          ssh: { ssh: false },
          ssl: { ...content.ssl, ssl: enableSSL },
        },
      })
    }
    return (
      <form onSubmit={handleSubmit(submitForm)} css={formStyle} ref={ref}>
        <div css={css(gridContainerStyle, formPaddingStyle)}>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.name")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={i18n.t(
                    "editor.action.resource.mysql.placeholder.database",
                  )}
                  error={!!errors.resourceName}
                  maxLength={200}
                  borderColor="techPurple"
                />
              )}
              rules={{
                required: i18n.t("editor.action.form.required") as string,
              }}
              control={control}
              name="resourceName"
            />
            {errors.resourceName && (
              <div css={css(errorMessageStyle, applyGridColIndex(2))}>
                {errors.resourceName.message}
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.hostname_port")}
            </label>
            <div css={hostnamePortStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={i18n.t(
                      "editor.action.resource.mysql.placeholder.hostname",
                    )}
                    error={!!errors.host}
                    maxLength={200}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="host"
                rules={{
                  required: i18n.t("editor.action.form.required") as string,
                }}
              />
              <Controller
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="3306"
                    error={!!errors.port}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="port"
                rules={{
                  required: i18n.t("editor.action.form.required") as string,
                }}
              />
            </div>
            {(errors.host || errors.port) && (
              <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                <div css={errorMessageStyle}>{errors.host?.message}</div>
                <div css={errorMessageStyle}>{errors.port?.message}</div>
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.database")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  error={!!errors.databaseName}
                  placeholder={i18n.t(
                    "editor.action.resource.mysql.placeholder.database",
                  )}
                  borderColor="techPurple"
                />
              )}
              control={control}
              name="databaseName"
              rules={{
                required: i18n.t("editor.action.form.required") as string,
              }}
            />
            {errors.databaseName && (
              <div css={css(errorMessageStyle, applyGridColIndex(2))}>
                {errors.databaseName.message}
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.username_password")}
            </label>
            <div css={usernamePasswordStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={i18n.t(
                      "editor.action.resource.mysql.placeholder.username",
                    )}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="databaseUsername"
              />
              <Controller
                render={({ field }) => (
                  <Password
                    {...field}
                    invisibleButton={false}
                    placeholder={i18n.t(
                      "editor.action.resource.mysql.placeholder.password",
                    )}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="databasePassword"
              />
            </div>
            <div css={css(descriptionStyle, applyGridColIndex(2))}>
              {i18n.t("editor.action.resource.mysql.tip.username_password")}
            </div>
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.connect_type")}
            </label>
            <div css={connectTextStyle}>
              {i18n.t("editor.action.resource.mysql.tip.connect_type")}
            </div>
          </div>
          <div css={splitLineStyle} />
          <h4 css={groupTitleStyle}>
            {i18n.t("editor.action.resource.mysql.title.advanced_option")}
          </h4>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {i18n.t("editor.action.resource.mysql.label.ssl_options")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={enableSSL}
                onChange={(val) => {
                  setEnableSSL(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={connectTextStyle}>
                  {i18n.t("editor.action.resource.mysql.tip.ssl_options")}
                </div>
              </div>
            </div>
          </div>
          {enableSSL && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {i18n.t(
                    "editor.action.resource.mysql.label.server_root_certificate",
                  )}
                </label>
                <Controller
                  name="ssl.serverCert"
                  render={({ field }) => (
                    <Input {...field} borderColor="techPurple" />
                  )}
                  control={control}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {i18n.t("editor.action.resource.mysql.label.client_key")}
                </label>
                <Controller
                  name="ssl.clientKey"
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder={i18n.t(
                        "editor.action.resource.mysql.placeholder.client_key",
                      )}
                      borderColor="techPurple"
                      autoSize={{ minRows: 4 }}
                    />
                  )}
                  control={control}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {i18n.t(
                    "editor.action.resource.mysql.label.client_certificate",
                  )}
                </label>
                <Controller
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder={i18n.t(
                        "editor.action.resource.mysql.placeholder.client_certificate",
                      )}
                      borderColor="techPurple"
                      autoSize={{ minRows: 4 }}
                    />
                  )}
                  control={control}
                  name="ssl.clientCert"
                />
              </div>
            </>
          )}
        </div>
      </form>
    )
  },
)

MySQLConfigure.displayName = "MySQLConfigure"
