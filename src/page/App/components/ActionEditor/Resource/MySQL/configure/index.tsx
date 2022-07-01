import { forwardRef, useImperativeHandle, useState } from "react"
import { css } from "@emotion/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, Password } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { InputNumber } from "@illa-design/input-number"
import { applyGridColIndex } from "@/page/App/components/ActionEditor/style"
import { useSelector } from "react-redux"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import {
  connectTextStyle,
  descriptionStyle,
  errorMessageStyle,
  formStyle,
  gridContainerStyle,
  gridRowContainerStyle,
  groupTitleStyle,
  labelTextSmallSizeStyle,
  labelTextStyle,
  labelTextVerticalStyle,
  requiredLabelTextStyle,
  splitLineStyle,
} from "@/page/App/components/ActionEditor/Resource/style"
import { MySQLConfigureProps, MySQLConfigureValues } from "../interface"
import { InputUpload } from "./input-upload"
import {
  formPaddingStyle,
  hostnamePortStyle,
  switchAreaStyle,
  switchDescriptionStyle,
  usernamePasswordStyle,
} from "./style"

export const MySQLConfigure = forwardRef<HTMLFormElement, MySQLConfigureProps>(
  (props, ref) => {
    const { resourceId, connectionRef, onSubmit, onTestConnection } = props
    const { t } = useTranslation()
    const resourceConfig = useSelector(selectAllResource).find(
      (i) => i.resourceId === resourceId,
    )
    const [enableSSH, setEnableSSH] = useState(resourceConfig?.options.ssh)
    const [enableSSL, setEnableSSL] = useState(resourceConfig?.options.ssl)
    const {
      handleSubmit,
      control,
      register,
      resetField,
      formState: { errors },
      getValues,
      setValue,
    } = useForm<MySQLConfigureValues>({
      mode: "onBlur",
      defaultValues: {
        resourceName: resourceConfig?.resourceName,
        ...resourceConfig?.options,
      } || {
        port: 3306,
      },
    })

    const testConnection = () => {
      const data = getValues()
      const { resourceName, ...options } = data

      onTestConnection?.({
        resourceName: resourceName,
        resourceType: "mysql",
        options: {
          ...options,
          port: "" + options.port
        }

      })
    }

    useImperativeHandle(connectionRef, () => {
      {
        return { testConnection }
      }
    })

    const submitForm: SubmitHandler<MySQLConfigureValues> = (data) => {
      const { resourceName, ...options } = data
      onSubmit?.({
        resourceName: resourceName,
        resourceType: "mysql",
        options: {
          ...options,
          port: "" + options.port,
          ssh: enableSSH,
          ssl: enableSSL,
        }
      })
    }
    return (
      <form onSubmit={handleSubmit(submitForm)} css={formStyle} ref={ref}>
        <div css={css(gridContainerStyle, formPaddingStyle)}>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {t("editor.action.resource.my_sql.label.name")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.name",
                  )}
                  error={!!errors.resourceName}
                  maxLength={200}
                  borderColor="techPurple"
                />
              )}
              rules={{
                required: t("editor.action.form.required"),
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
              {t("editor.action.resource.my_sql.label.hostname_port")}
            </label>
            <div css={hostnamePortStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.my_sql.placeholder.hostname",
                    )}
                    error={!!errors.host}
                    maxLength={200}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="host"
                rules={{
                  required: t("editor.action.form.required"),
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
                  required: t("editor.action.form.required"),
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
            <label css={labelTextStyle}>
              {t("editor.action.resource.my_sql.label.database")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.database",
                  )}
                  borderColor="techPurple"
                />
              )}
              control={control}
              name="databaseName"
            />
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.my_sql.label.username_password")}
            </label>
            <div css={usernamePasswordStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.my_sql.placeholder.username",
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
                    placeholder={t(
                      "editor.action.resource.my_sql.placeholder.password",
                    )}
                    borderColor="techPurple"
                  />
                )}
                control={control}
                name="databasePassword"
              />
            </div>
            <div css={css(descriptionStyle, applyGridColIndex(2))}>
              {t("editor.action.resource.my_sql.tip.username_password")}
            </div>
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.my_sql.label.connect_type")}
            </label>
            <div css={connectTextStyle}>
              {t("editor.action.resource.my_sql.tip.connect_type")}
            </div>
          </div>
          <div css={splitLineStyle} />
          <h4 css={groupTitleStyle}>Advanced Options</h4>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.my_sql.label.connect_over_ssh")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={enableSSH}
                onChange={(val) => {
                  setEnableSSH(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={connectTextStyle}>
                  {t("editor.action.resource.my_sql.tip.connect_over_ssh")}
                </div>
              </div>
            </div>
          </div>
          {enableSSH && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.my_sql.label.ssh_hostname_port")}
                </label>
                <div css={hostnamePortStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.my_sql.placeholder.ssh_hostname_port",
                        )}
                        maxLength={200}
                        error={!!errors.advancedOptions?.sshHost}
                        borderColor="techPurple"
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="advancedOptions.sshHost"
                  />
                  <Controller
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="22"
                        error={!!errors.advancedOptions?.sshPort}
                        borderColor="techPurple"
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="advancedOptions.sshPort"
                  />
                </div>
                {(errors.advancedOptions?.sshHost ||
                  errors.advancedOptions?.sshPort) && (
                    <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                      <div css={errorMessageStyle}>
                        {errors.advancedOptions?.sshHost?.message}
                      </div>
                      <div css={errorMessageStyle}>
                        {errors.advancedOptions?.sshPort?.message}
                      </div>
                    </div>
                  )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.my_sql.label.ssh_credentials")}
                </label>
                <div css={usernamePasswordStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.my_sql.placeholder.ssh_credentials",
                        )}
                        error={!!errors.advancedOptions?.sshUsername}
                        borderColor="techPurple"
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="advancedOptions.sshUsername"
                  />
                  <Controller
                    render={({ field }) => (
                      <Password
                        {...field}
                        placeholder="•••••••••"
                        invisibleButton={false}
                        error={!!errors.advancedOptions?.sshPassword}
                        borderColor="techPurple"
                      />
                    )}
                    rules={{
                      required: t("editor.action.form.required"),
                    }}
                    control={control}
                    name="advancedOptions.sshPassword"
                  />
                </div>
                {(errors.advancedOptions?.sshUsername ||
                  errors.advancedOptions?.sshPassword) && (
                    <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                      <div css={errorMessageStyle}>
                        {errors.advancedOptions?.sshUsername?.message}
                      </div>
                      <div css={errorMessageStyle}>
                        {errors.advancedOptions?.sshPassword?.message}
                      </div>
                    </div>
                  )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.my_sql.label.private_key")}
                </label>
                <InputUpload
                  name="advancedOptions.sshPrivateKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.private_key",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={css(labelTextStyle, labelTextVerticalStyle)}>
                  <div>SSH passphrase</div>
                  <div css={labelTextSmallSizeStyle}>
                    {t("editor.action.resource.my_sql.tip.ssh_passphrase")}
                  </div>
                </label>
                <Controller
                  render={({ field }) => (
                    <Password
                      {...field}
                      placeholder="•••••••••"
                      invisibleButton={false}
                      borderColor="techPurple"
                    />
                  )}
                  control={control}
                  name="advancedOptions.sshPassphrase"
                />
              </div>
            </>
          )}
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.my_sql.label.ssl_options")}
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
                  {t("editor.action.resource.my_sql.tip.ssl_options")}
                </div>
              </div>
            </div>
          </div>
          {enableSSL && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t(
                    "editor.action.resource.my_sql.label.server_root_certificate",
                  )}
                </label>
                <InputUpload
                  name="advancedOptions.serverCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.server_root_certificate",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.my_sql.label.client_key")}
                </label>
                <InputUpload
                  name="advancedOptions.clientKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.client_key",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.my_sql.label.client_certificate")}
                </label>
                <InputUpload
                  name="advancedOptions.clientCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.my_sql.placeholder.client_certificate",
                  )}
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
