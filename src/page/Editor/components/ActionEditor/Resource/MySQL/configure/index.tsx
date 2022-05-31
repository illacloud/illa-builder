import { useState, forwardRef, useImperativeHandle } from "react"
import { css } from "@emotion/react"
import {
  useForm,
  Controller,
  SubmitHandler,
  UnpackNestedValue,
} from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, Password } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { Divider } from "@illa-design/divider"
import { InputNumber } from "@illa-design/input-number"
import { applyGridColIndex } from "@/page/Editor/components/ActionEditor/style"
import { useDispatch, useSelector } from "react-redux"
import { Api } from "@/api/base"
import { resourceActions } from "@/redux/currentApp/action/resource/resourceSlice"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import { v4 as uuidV4 } from "uuid"
import {
  gridContainerStyle,
  descriptionStyle,
  formStyle,
  labelTextStyle,
  requiredLabelTextStyle,
  errorMessageStyle,
  gridRowContainerStyle,
  groupTitleStyle,
  itemTextStyle,
  labelTextVerticalStyle,
  labelTextSmallSizeStyle,
  splitLineStyle,
} from "@/page/Editor/components/ActionEditor/Resource/style"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { MySQLConfigureValues, MySQLConfigureProps } from "../interface"
import { InputUpload } from "./input-upload"
import {
  hostnamePortStyle,
  usernamePasswordStyle,
  switchDescriptionStyle,
  switchAreaStyle,
  formPaddingStyle,
} from "./style"

const dataTransform = (data: UnpackNestedValue<MySQLConfigureValues>) => {
  const _data = {
    kind: "mysql",
    options: {
      host: "",
      port: "",
      databaseName: "",
      databaseUsername: "",
      databasePassword: "",
      ssl: false,
      ssh: false,
      advancedOptions: {
        sshHost: "",
        sshPort: "",
        sshUsername: "",
        sshPassword: "",
        sshPrivateKey: "",
        sshPassphrase: "",
        serverCert: null,
        clientKey: null,
        clientCert: null,
      },
    },
  }
  Object.keys(_data.options).forEach((key) => {
    // @ts-ignore
    if (data[key] !== undefined && key !== "ssh" && key !== "ssl") {
      // @ts-ignore
      _data.options[key] = data[key] + ""
    }
  })
  Object.keys(_data.options.advancedOptions).forEach((key) => {
    if (data[key as keyof MySQLConfigureValues] !== undefined) {
      // @ts-ignore
      _data.options.advancedOptions[key] = data[key] + ""
    }
  })
  return _data
}

export const MySQLConfigure = forwardRef<HTMLFormElement, MySQLConfigureProps>(
  (props, ref) => {
    const { resourceId, connectionRef } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const resourceConfig = useSelector(selectAllResource).find(
      (i) => i.resourceId === resourceId,
    )
    const [expandSSH, setExpandSSH] = useState(false)
    const [expandSSL, setExpandSSL] = useState(false)
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
      defaultValues: (resourceConfig?.config as MySQLConfigureValues) || {
        port: 3306,
        ssh: false,
        ssl: false,
        sshPort: 22,
      },
    })

    const testConnection = () => {
      let data = { ...getValues(), ssh: expandSSH, ssl: expandSSL }
      const _data = dataTransform(data)
      alert(JSON.stringify(_data, null, 2))
      Api.request({
        url: "/api/v1/resources/testConnection",
        method: "POST",
        data: _data,
      })
    }

    useImperativeHandle(connectionRef, () => {
      {
        return { testConnection }
      }
    })

    const onSubmit: SubmitHandler<MySQLConfigureValues> = (data) => {
      data = { ...data, ssh: expandSSH, ssl: expandSSL }

      // update
      if (resourceId) {
        dispatch(
          resourceActions.updateResourceItemReducer({
            resourceId,
            ...resourceConfig,
            resourceName: data.name,
            resourceType: "MySQL",
            dbName: "",
            created: Date.now().toString(),
            config: data,
          }),
        )

        return
      }

      dispatch(
        resourceActions.addResourceItemReducer({
          resourceId: uuidV4(),
          resourceName: data.name,
          resourceType: "MySQL",
          dbName: "",
          created: Date.now().toString(),
          config: data,
        }),
      )
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} css={formStyle} ref={ref}>
        <div css={[gridContainerStyle, formPaddingStyle]}>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {t("editor.action.resource.mySql.label.name")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.name",
                  )}
                  error={!!errors.name}
                  maxLength={200}
                />
              )}
              rules={{
                required: ERROR_REQUIRED_MESSAGE,
              }}
              control={control}
              name="name"
            />
            {errors.name && (
              <div css={[errorMessageStyle, applyGridColIndex(2)]}>
                {errors.name.message}
              </div>
            )}
          </div>
          <div css={gridRowContainerStyle}>
            <label css={requiredLabelTextStyle}>
              {t("editor.action.resource.mySql.label.hostname/port")}
            </label>
            <div css={hostnamePortStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.mySql.placeholder.hostname",
                    )}
                    error={!!errors.host}
                    maxLength={200}
                  />
                )}
                control={control}
                name="host"
                rules={{
                  required: ERROR_REQUIRED_MESSAGE,
                }}
              />
              <Controller
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="3306"
                    error={!!errors.port}
                  />
                )}
                control={control}
                name="port"
                rules={{
                  required: ERROR_REQUIRED_MESSAGE,
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
              {t("editor.action.resource.mySql.label.database")}
            </label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.database",
                  )}
                />
              )}
              control={control}
              name="databaseName"
            />
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.username/password")}
            </label>
            <div css={usernamePasswordStyle}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t(
                      "editor.action.resource.mySql.placeholder.username",
                    )}
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
                      "editor.action.resource.mySql.placeholder.password",
                    )}
                  />
                )}
                control={control}
                name="databasePassword"
              />
            </div>
            <div css={[descriptionStyle, applyGridColIndex(2)]}>
              {t("editor.action.resource.mySql.tip.username/password")}
            </div>
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.connectType")}
            </label>
            <div css={itemTextStyle}>
              {t("editor.action.resource.mySql.tip.connectType")}
            </div>
          </div>
          <Divider css={splitLineStyle} />
          <h4 css={groupTitleStyle}>Advanced Options</h4>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.connectOverSsh")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSH}
                onChange={(val) => {
                  setExpandSSH(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={labelTextStyle}>
                  {t("editor.action.resource.mySql.tip.connectOverSsh")}
                </div>
              </div>
            </div>
          </div>
          {expandSSH && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.mySql.label.sshHostnamePort")}
                </label>
                <div css={hostnamePortStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.mySql.placeholder.sshHostnamePort",
                        )}
                        maxLength={200}
                        error={!!errors.sshHost}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="sshHost"
                  />
                  <Controller
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="22"
                        error={!!errors.sshPort}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="sshPort"
                  />
                </div>
                {(errors.sshHost || errors.sshPort) && (
                  <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                    <div css={errorMessageStyle}>{errors.sshHost?.message}</div>
                    <div css={errorMessageStyle}>{errors.sshPort?.message}</div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={requiredLabelTextStyle}>
                  {t("editor.action.resource.mySql.label.sshCredentials")}
                </label>
                <div css={usernamePasswordStyle}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t(
                          "editor.action.resource.mySql.placeholder.sshCredentials",
                        )}
                        error={!!errors.sshUsername}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="sshUsername"
                  />
                  <Controller
                    render={({ field }) => (
                      <Password
                        {...field}
                        placeholder="•••••••••"
                        invisibleButton={false}
                        error={!!errors.sshPassword}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="sshPassword"
                  />
                </div>
                {(errors.sshUsername || errors.sshPassword) && (
                  <div css={css(hostnamePortStyle, applyGridColIndex(2))}>
                    <div css={errorMessageStyle}>
                      {errors.sshUsername?.message}
                    </div>
                    <div css={errorMessageStyle}>
                      {errors.sshPassword?.message}
                    </div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.privateKey")}
                </label>
                <InputUpload
                  name="sshPrivateKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.privateKey",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={[labelTextStyle, labelTextVerticalStyle]}>
                  <div>SSH passphrase</div>
                  <div css={labelTextSmallSizeStyle}>
                    {t("editor.action.resource.mySql.tip.sshPassphrase")}
                  </div>
                </label>
                <Controller
                  render={({ field }) => (
                    <Password
                      {...field}
                      placeholder="•••••••••"
                      invisibleButton={false}
                    />
                  )}
                  control={control}
                  name="sshPassphrase"
                />
              </div>
            </>
          )}
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.mySql.label.sslOptions")}
            </label>
            <div css={switchAreaStyle}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSL}
                onChange={(val) => {
                  setExpandSSL(val)
                }}
              />
              <div css={switchDescriptionStyle}>
                <div css={labelTextStyle}>
                  {t("editor.action.resource.mySql.tip.sslOptions")}
                </div>
              </div>
            </div>
          </div>
          {expandSSL && (
            <>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t(
                    "editor.action.resource.mySql.label.serverRootCertificate",
                  )}
                </label>
                <InputUpload
                  name="serverCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.serverRootCertificate",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.clientKey")}
                </label>
                <InputUpload
                  name="clientKey"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.clientKey",
                  )}
                />
              </div>
              <div css={gridRowContainerStyle}>
                <label css={labelTextStyle}>
                  {t("editor.action.resource.mySql.label.clientCertificate")}
                </label>
                <InputUpload
                  name="clientCert"
                  register={register}
                  reset={resetField}
                  setValue={setValue}
                  placeholder={t(
                    "editor.action.resource.mySql.placeholder.clientCertificate",
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
