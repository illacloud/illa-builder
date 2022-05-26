import { useState, forwardRef, useImperativeHandle } from "react"
import { css } from "@emotion/react"
import {
  useForm,
  Controller,
  SubmitHandler,
  UnpackNestedValue,
} from "react-hook-form"
import { Input, Password } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { Divider } from "@illa-design/divider"
import { InputNumber } from "@illa-design/input-number"
import { applyGridColIndex } from "@/page/Editor/components/ActionEditor/style"
import { useDispatch, useSelector } from "react-redux"
import Api from "@/api/api"
import { resourceActions } from "@/redux/action/resource/resourceSlice"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { v4 as uuidV4 } from "uuid"
import {
  gridContainerCss,
  descriptionCss,
  formCss,
  labelTextCss,
  requiredLabelTextCss,
  errorMessageCss,
  gridRowContainerCss,
  groupTitleCss,
  itemTextCss,
  labelTextVerticalCss,
  labelTextSmallSizeCss,
  splitLineCss,
} from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/style"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { MySQLFormValues, MySQLFormProps } from "./interface"
import { InputUpload } from "./input-upload"
import {
  hostnamePortCss,
  usernamePasswordCss,
  switchDescriptionCss,
  switchAreaCss,
  formPaddingCss,
} from "./style"

const dataTransform = (data: UnpackNestedValue<MySQLFormValues>) => {
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
    if (data[key as keyof MySQLFormValues] !== undefined) {
      // @ts-ignore
      _data.options.advancedOptions[key] = data[key] + ""
    }
  })
  return _data
}

export const MySQL = forwardRef<HTMLFormElement, MySQLFormProps>(
  (props, ref) => {
    const { resourceId, connectionRef } = props
    const dispatch = useDispatch()
    const resourceConfig = useSelector(selectAllResource).find(
      (i) => i.id === resourceId,
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
    } = useForm<MySQLFormValues>({
      mode: "onBlur",
      defaultValues: (resourceConfig?.config as MySQLFormValues) || {
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
      Api.post("/api/v1/resources/testConnection", _data)
    }

    useImperativeHandle(connectionRef, () => {
      {
        return { testConnection }
      }
    })

    const onSubmit: SubmitHandler<MySQLFormValues> = (data) => {
      data = { ...data, ssh: expandSSH, ssl: expandSSL }
      const _data = dataTransform(data)
      console.log(_data)

      // update
      if (resourceId) {
        dispatch(
          resourceActions.updateResourceItemReducer({
            id: resourceId,
            ...resourceConfig,
            name: data.name,
            type: "MySQL",
            config: data,
          }),
        )

        return
      }

      dispatch(
        resourceActions.addResourceItemReducer({
          id: uuidV4(),
          name: data.name,
          type: "MySQL",
          config: data,
        }),
      )
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} css={formCss} ref={ref}>
        <div css={[gridContainerCss, formPaddingCss]}>
          <div css={gridRowContainerCss}>
            <label css={requiredLabelTextCss}>Name</label>
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='i.e."Users DB(readonly)" or "Internal Admin API"'
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
              <div css={[errorMessageCss, applyGridColIndex(2)]}>
                {errors.name.message}
              </div>
            )}
          </div>
          <div css={gridRowContainerCss}>
            <label css={requiredLabelTextCss}>Hostname/Port</label>
            <div css={hostnamePortCss}>
              <Controller
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Hostname"
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
              <div css={css(hostnamePortCss, applyGridColIndex(2))}>
                <div css={errorMessageCss}>{errors.host?.message}</div>
                <div css={errorMessageCss}>{errors.port?.message}</div>
              </div>
            )}
          </div>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Database</label>
            <Controller
              render={({ field }) => (
                <Input {...field} placeholder="acme_production" />
              )}
              control={control}
              name="databaseName"
            />
          </div>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Username/Password</label>
            <div css={usernamePasswordCss}>
              <Controller
                render={({ field }) => (
                  <Input {...field} placeholder="Username" />
                )}
                control={control}
                name="databaseUsername"
              />
              <Controller
                render={({ field }) => (
                  <Password
                    {...field}
                    invisibleButton={false}
                    placeholder="Password"
                  />
                )}
                control={control}
                name="databasePassword"
              />
            </div>
            <div css={[descriptionCss, applyGridColIndex(2)]}>
              Credentials will be encrypted & stored securely on our servers.
            </div>
          </div>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Connect Type</label>
            <div css={itemTextCss}>
              Cloud: ILLA servers will securely connect to your database.
            </div>
          </div>
          <Divider css={splitLineCss} />
          <h4 css={groupTitleCss}>Advanced Options</h4>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Connect over SSH</label>
            <div css={switchAreaCss}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSH}
                onChange={(val) => {
                  setExpandSSH(val)
                }}
              />
              <div css={switchDescriptionCss}>
                <div css={labelTextCss}>
                  Useful to connect to private network
                </div>
              </div>
            </div>
          </div>
          {expandSSH && (
            <>
              <div css={gridRowContainerCss}>
                <label css={requiredLabelTextCss}>SSH Hostname/Port</label>
                <div css={hostnamePortCss}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="eg.localhost"
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
                  <div css={css(hostnamePortCss, applyGridColIndex(2))}>
                    <div css={errorMessageCss}>{errors.sshHost?.message}</div>
                    <div css={errorMessageCss}>{errors.sshPort?.message}</div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerCss}>
                <label css={requiredLabelTextCss}>SSH Credentials</label>
                <div css={usernamePasswordCss}>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="eg.ec2-user"
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
                  <div css={css(hostnamePortCss, applyGridColIndex(2))}>
                    <div css={errorMessageCss}>
                      {errors.sshUsername?.message}
                    </div>
                    <div css={errorMessageCss}>
                      {errors.sshPassword?.message}
                    </div>
                  </div>
                )}
              </div>
              <div css={gridRowContainerCss}>
                <label css={labelTextCss}>Private Key</label>
                <InputUpload
                  name="sshPrivateKey"
                  register={register}
                  reset={resetField}
                />
              </div>
              <div css={gridRowContainerCss}>
                <label css={[labelTextCss, labelTextVerticalCss]}>
                  <div>SSH passphrase</div>
                  <div css={labelTextSmallSizeCss}>used if provided</div>
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
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>SSL options</label>
            <div css={switchAreaCss}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSL}
                onChange={(val) => {
                  setExpandSSL(val)
                }}
              />
              <div css={switchDescriptionCss}>
                <div css={labelTextCss}>SSL is used when available</div>
              </div>
            </div>
          </div>
          {expandSSL && (
            <>
              <div css={gridRowContainerCss}>
                <label css={labelTextCss}>Server Root Certificate</label>
                <InputUpload
                  name="serverCert"
                  register={register}
                  reset={resetField}
                />
              </div>
              <div css={gridRowContainerCss}>
                <label css={labelTextCss}>Client Key</label>
                <InputUpload
                  name="clientKey"
                  register={register}
                  reset={resetField}
                />
              </div>
              <div css={gridRowContainerCss}>
                <label css={labelTextCss}>Client Certificate</label>
                <InputUpload
                  name="clientCert"
                  register={register}
                  reset={resetField}
                />
              </div>
            </>
          )}
        </div>
      </form>
    )
  },
)
