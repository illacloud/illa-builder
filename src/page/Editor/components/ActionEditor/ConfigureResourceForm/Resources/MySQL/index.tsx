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
        Port: 3306,
        SSHPort: 22,
      },
    })

    let registerSSHPrivateKey
    let registerSSLClientCertificate
    let registerSSLClientKey
    let registerSSLServerRootCertificate

    registerSSHPrivateKey = register("SSHPrivateKey")
    registerSSLClientCertificate = register("SSLClientCertificate")
    registerSSLClientKey = register("SSLClientKey")
    registerSSLServerRootCertificate = register("SSLServerRootCertificate")

    const onSubmit: SubmitHandler<MySQLFormValues> = (data) => {
      alert(JSON.stringify(data))
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
                  error={!!errors.Name}
                  maxLength={200}
                />
              )}
              rules={{
                required: ERROR_REQUIRED_MESSAGE,
              }}
              control={control}
              name="Name"
            />
            {errors.Name && (
              <div css={[ErrorMessageCSS, applyGridColIndex(2)]}>
                {errors.Name.message}
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
                    error={!!errors.Hostname}
                    maxLength={200}
                  />
                )}
                control={control}
                name="Hostname"
                rules={{
                  required: ERROR_REQUIRED_MESSAGE,
                }}
              />
              <Controller
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="3306"
                    error={!!errors.Port}
                  />
                )}
                control={control}
                name="Port"
                rules={{
                  required: ERROR_REQUIRED_MESSAGE,
                }}
              />
            </div>
            {(errors.Hostname || errors.Port) && (
              <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                <div css={ErrorMessageCSS}>{errors.Hostname?.message}</div>
                <div css={ErrorMessageCSS}>{errors.Port?.message}</div>
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
              name="Database"
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
                name="Username"
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
                name="Password"
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
                onChange={() => {
                  setExpandSSH((expandSSH) => !expandSSH)
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
                        error={!!errors.SSHHostname}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="SSHHostname"
                  />
                  <Controller
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="22"
                        error={!!errors.SSHPort}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="SSHPort"
                  />
                </div>
                {(errors.SSHHostname || errors.SSHPort) && (
                  <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                    <div css={ErrorMessageCSS}>
                      {errors.SSHHostname?.message}
                    </div>
                    <div css={ErrorMessageCSS}>{errors.SSHPort?.message}</div>
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
                        error={!!errors.SSHCredentials}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="SSHCredentials"
                  />
                  <Controller
                    render={({ field }) => (
                      <Password
                        {...field}
                        placeholder="•••••••••"
                        invisibleButton={false}
                        error={!!errors.SSHPassword}
                      />
                    )}
                    rules={{
                      required: ERROR_REQUIRED_MESSAGE,
                    }}
                    control={control}
                    name="SSHPassword"
                  />
                </div>
                {(errors.SSHCredentials || errors.SSHPassword) && (
                  <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                    <div css={ErrorMessageCSS}>
                      {errors.SSHCredentials?.message}
                    </div>
                    <div css={ErrorMessageCSS}>
                      {errors.SSHPassword?.message}
                    </div>
                  </div>
                )}
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Private Key</label>
                <InputUpload
                  resetValue={() => {
                    resetField("SSHPrivateKey")
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
                      error={!!errors.SSHPassword}
                    />
                  )}
                  control={control}
                  name="SSHPassphrase"
                />
              </div>
            </>
          )}
          <div css={GridRowContainerCSS}>
            <label css={LabelTextCSS}>SSL options</label>
            <div css={SwitchAreaCSS}>
              <Switch
                colorScheme="techPurple"
                onChange={() => {
                  setExpandSSL((expandSSL) => !expandSSL)
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
                    resetField("SSLServerRootCertificate")
                  }}
                  registerValue={registerSSLServerRootCertificate}
                />
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Client Key</label>
                <InputUpload
                  resetValue={() => {
                    resetField("SSLClientKey")
                  }}
                  registerValue={registerSSLClientKey}
                />
              </div>
              <div css={GridRowContainerCSS}>
                <label css={LabelTextCSS}>Client Certificate</label>
                <InputUpload
                  resetValue={() => {
                    resetField("SSLClientCertificate")
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
