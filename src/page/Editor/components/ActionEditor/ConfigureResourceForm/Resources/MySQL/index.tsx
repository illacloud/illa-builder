import { useState, forwardRef } from "react"
import { css } from "@emotion/react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input, Password } from "@illa-design/input"
import { Switch } from "@illa-design/switch"
import { InputNumber } from "@illa-design/input-number"
import { applyGridColIndex } from "@/page/Editor/components/ActionEditor/style"
import {
  GridContainerCSS,
  DescriptionCSS,
  FormCSS,
  LabelTextCSS,
  RequiredLabelTextCSS,
  ErrorMessageCSS,
  GridRowContainerCSS,
  GroupTitleCSS,
  ItemTextCSS,
  LabelTextVerticalCSS,
  LabelTextSmallSizeCSS,
} from "@/page/Editor/components/ActionEditor/ConfigureResourceForm/Resources/style"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { MySQLFormValues, MySQLFormProps } from "./interface"
import { InputUpload } from "./input-upload"
import {
  HostnamePortCSS,
  UsernamePasswordCSS,
  SwitchDescriptionCSS,
  SwitchAreaCSS,
  FormPaddingCSS,
} from "./style"

export const MySQL = forwardRef<HTMLFormElement, MySQLFormProps>(
  (props, ref) => {
    const [expandSSH, setExpandSSH] = useState(false)
    const [expandSSL, setExpandSSL] = useState(false)
    const {
      handleSubmit,
      control,
      register,
      resetField,
      formState: { errors },
    } = useForm<MySQLFormValues>({
      defaultValues: {
        port: 3306,
        ssh: false,
        ssl: false,
        sshPort: 22,
      },
    })

    let registerSSHPrivateKey
    let registerSSLClientCertificate
    let registerSSLClientKey
    let registerSSLServerRootCertificate

    registerSSHPrivateKey = register("sshPrivateKey")
    registerSSLClientCertificate = register("clientCert")
    registerSSLClientKey = register("clientKey")
    registerSSLServerRootCertificate = register("serverCert")

    const onSubmit: SubmitHandler<MySQLFormValues> = (data) => {
      data = { ...data, ssh: expandSSH, ssl: expandSSL }
      alert(JSON.stringify(data, null, 2))
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} css={FormCSS} ref={ref}>
        <div css={[GridContainerCSS, FormPaddingCSS]}>
          <div css={GridRowContainerCSS}>
            <label css={RequiredLabelTextCSS}>Name</label>
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
              <div css={[ErrorMessageCSS, applyGridColIndex(2)]}>
                {errors.name.message}
              </div>
            )}
          </div>
          <div css={GridRowContainerCSS}>
            <label css={RequiredLabelTextCSS}>Hostname/Port</label>
            <div css={HostnamePortCSS}>
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
              <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                <div css={ErrorMessageCSS}>{errors.host?.message}</div>
                <div css={ErrorMessageCSS}>{errors.port?.message}</div>
              </div>
            )}
          </div>
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>Database</label>
            <Controller
              render={({ field }) => (
                <Input {...field} placeholder="acme_production" />
              )}
              control={control}
              name="databaseName"
            />
          </div>
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>Username/Password</label>
            <div css={UsernamePasswordCSS}>
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
            <div css={[DescriptionCSS, applyGridColIndex(2)]}>
              Credentials will be encrypted & stored securely on our servers.
            </div>
          </div>
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>Connect Type</label>
            <div css={ItemTextCSS}>
              Cloud: PopSQL servers will securely connect to your database.
            </div>
          </div>
          <h4 css={GroupTitleCSS}>Advanced Options</h4>
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>Connect over SSH</label>
            <div css={SwitchAreaCSS}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSH}
                onChange={(val) => {
                  setExpandSSH(val)
                }}
              />
              <div css={SwitchDescriptionCSS}>
                <div css={LabelTextCSS}>
                  Useful to connect to private network
                </div>
              </div>
            </div>
          </div>
          {expandSSH && (
            <>
              <div css={GridRowContainerCSS}>
                <label css={RequiredLabelTextCSS}>SSH Hostname/Port</label>
                <div css={HostnamePortCSS}>
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
                  <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                    <div css={ErrorMessageCSS}>{errors.sshHost?.message}</div>
                    <div css={ErrorMessageCSS}>{errors.sshPort?.message}</div>
                  </div>
                )}
              </div>
              <div css={GridRowContainerCSS}>
                <label css={RequiredLabelTextCSS}>SSH Credentials</label>
                <div css={UsernamePasswordCSS}>
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
                  <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                    <div css={ErrorMessageCSS}>
                      {errors.sshUsername?.message}
                    </div>
                    <div css={ErrorMessageCSS}>
                      {errors.sshPassword?.message}
                    </div>
                  </div>
                )}
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Private Key</label>
                <InputUpload
                  resetValue={() => {
                    resetField("sshPrivateKey")
                  }}
                  registerValue={registerSSHPrivateKey}
                />
              </div>
              <div css={GridRowContainerCSS}>
                <label css={[LabelTextCSS, LabelTextVerticalCSS]}>
                  <div>SSH passphrase</div>
                  <div css={LabelTextSmallSizeCSS}>used if provided</div>
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
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>SSL options</label>
            <div css={SwitchAreaCSS}>
              <Switch
                colorScheme="techPurple"
                checked={expandSSL}
                onChange={(val) => {
                  setExpandSSL(val)
                }}
              />
              <div css={SwitchDescriptionCSS}>
                <div css={LabelTextCSS}>SSL is used when available</div>
              </div>
            </div>
          </div>
          {expandSSL && (
            <>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Server Root Certificate</label>
                <InputUpload
                  resetValue={() => {
                    resetField("serverCert")
                  }}
                  registerValue={registerSSLServerRootCertificate}
                />
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Client Key</label>
                <InputUpload
                  resetValue={() => {
                    resetField("clientKey")
                  }}
                  registerValue={registerSSLClientKey}
                />
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Client Certificate</label>
                <InputUpload
                  resetValue={() => {
                    resetField("clientCert")
                  }}
                  registerValue={registerSSLClientCertificate}
                />
              </div>
            </>
          )}
        </div>
      </form>
    )
  },
)
