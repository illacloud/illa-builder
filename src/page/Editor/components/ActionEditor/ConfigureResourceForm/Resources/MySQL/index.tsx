import { Input, Password } from "@illa-design/input"
import { css } from "@emotion/react"
import {
  LabelTextCSS,
  FooterCSS,
  GridContainerCSS,
  HostnamePortCSS,
  UsernamePasswordCSS,
  SwitchDescriptionCSS,
  SwitchAreaCSS,
  applyGridColIndex,
  applyMargin,
  applyPadding,
  DescriptionCSS,
  BorderBottomCSS,
  RequireTagCSS,
  applyIllaColor,
  ErrorMessageCSS,
  BackAreaCSS,
  BackTextCSS,
  BackIconCSS,
  applyJustifyContent,
  LabelTextVerticalCSS,
  LabelTextSmallSizeCSS,
} from "./style"
import { Button } from "@illa-design/button"
import { Switch } from "@illa-design/switch"
import { PaginationPreIcon } from "@illa-design/icon"
import { useState, FC } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { InputNumber } from "@illa-design/input-number"
import { MySQLFormValues, MySQLFormProps } from "./interface"
import { InputUpload } from "./input-upload"

const Error_REQUIRED_MESSAGE = "This is required!"

export const MySQL: FC<MySQLFormProps> = (props) => {
  const { back } = props
  const [expandSSH, setExpandSSH] = useState(false)
  const [expandSSL, setExpandSSL] = useState(false)
  const {
    handleSubmit,
    control,
    register,
    resetField,
    formState: { errors },
  } = useForm<MySQLFormValues>()

  let registerSSHPrivateKey
  let registerSSLClientCertificate
  let registerSSLClientKey
  let registerSSLServerRootCertificate

  registerSSHPrivateKey = register("SSHPrivateKey")
  registerSSLClientCertificate = register("SSLClientCertificate")
  registerSSLClientKey = register("SSLClientKey")
  registerSSLServerRootCertificate = register("SSLServerRootCertificate")

  const onSubmit: SubmitHandler<MySQLFormValues> = (data) => {
    console.log(data)
    alert(JSON.stringify(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 8),
          applyPadding("bottom", 8),
        )}
      >
        <label css={LabelTextCSS}>
          <span css={RequireTagCSS}>*</span>Name
        </label>
        <div>
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
              required: Error_REQUIRED_MESSAGE,
            }}
            control={control}
            name="Name"
          />
        </div>
        {errors.Name && (
          <div css={css(ErrorMessageCSS, applyGridColIndex(2))}>
            {errors.Name.message}
          </div>
        )}
        <label css={LabelTextCSS}>
          <span css={RequireTagCSS}>*</span>Hostname/Port
        </label>
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
              required: Error_REQUIRED_MESSAGE,
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
              required: Error_REQUIRED_MESSAGE,
            }}
          />
        </div>
        {(errors.Hostname || errors.Port) && (
          <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
            <div css={ErrorMessageCSS}>{errors.Hostname?.message}</div>
            <div css={ErrorMessageCSS}>{errors.Port?.message}</div>
          </div>
        )}
        <label css={LabelTextCSS}>Database</label>
        <div>
          <Controller
            render={({ field }) => (
              <Input {...field} placeholder="acme_production" />
            )}
            control={control}
            name="Database"
          />
        </div>
        <label css={LabelTextCSS}>Username/Password</label>
        <div css={UsernamePasswordCSS}>
          <Controller
            render={({ field }) => <Input {...field} placeholder="Username" />}
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
      </div>
      <div
        css={css(GridContainerCSS, applyPadding("bottom", 16), BorderBottomCSS)}
      >
        <div css={css(DescriptionCSS, applyGridColIndex(2))}>
          Credentials will be encrypted & stored securely on our servers.
        </div>
        <label css={LabelTextCSS}>Connect Type</label>
        <div css={css(LabelTextCSS, applyJustifyContent("start"))}>
          Cloud: PopSQL servers will securely connect to your database.
        </div>
      </div>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 16),
          applyPadding("bottom", 16),
        )}
      >
        <label css={css(LabelTextCSS, applyIllaColor("grayBlue", "04"))}>
          Advanced Options
        </label>
        <label css={css(LabelTextCSS, applyGridColIndex(1))}>
          Connect over SSH
        </label>
        <div css={SwitchAreaCSS}>
          <Switch
            colorScheme="techPurple"
            onChange={() => {
              setExpandSSH((expandSSH) => !expandSSH)
            }}
          />
          <div css={css(SwitchDescriptionCSS, applyMargin("left", 8))}>
            <div css={LabelTextCSS}>Useful to connect to private network</div>
          </div>
        </div>
        {expandSSH && (
          <>
            <label css={LabelTextCSS}>
              <span css={RequireTagCSS}>*</span>SSH Hostname/Port
            </label>
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
                  required: Error_REQUIRED_MESSAGE,
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
                  required: Error_REQUIRED_MESSAGE,
                }}
                control={control}
                name="SSHPort"
              />
            </div>
            {(errors.SSHHostname || errors.SSHPort) && (
              <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                <div css={ErrorMessageCSS}>{errors.SSHHostname?.message}</div>
                <div css={ErrorMessageCSS}>{errors.SSHPort?.message}</div>
              </div>
            )}
            <label css={LabelTextCSS}>
              <span css={RequireTagCSS}>*</span>SSH Credentials
            </label>
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
                  required: Error_REQUIRED_MESSAGE,
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
                  required: Error_REQUIRED_MESSAGE,
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
                <div css={ErrorMessageCSS}>{errors.SSHPassword?.message}</div>
              </div>
            )}
            <label css={LabelTextCSS}>Private Key</label>
            <InputUpload
              resetValue={() => {
                resetField("SSHPrivateKey")
              }}
              registerValue={registerSSHPrivateKey}
            />
            <label css={css(LabelTextCSS, LabelTextVerticalCSS)}>
              <div>SSH passphrase</div>
              <div css={LabelTextSmallSizeCSS}>used if provided</div>
            </label>
            <div>
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
      </div>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 16),
          applyPadding("bottom", 8),
        )}
      >
        <label css={LabelTextCSS}>SSL options</label>
        <div css={SwitchAreaCSS}>
          <Switch
            colorScheme="techPurple"
            onChange={() => {
              setExpandSSL((expandSSL) => !expandSSL)
            }}
          />
          <div css={css(SwitchDescriptionCSS, applyMargin("left", 8))}>
            <div css={LabelTextCSS}>SSL is used when available</div>
          </div>
        </div>
        {expandSSL && (
          <>
            <label css={LabelTextCSS}>Server Root Certificate</label>
            <InputUpload
              resetValue={() => {
                resetField("SSLServerRootCertificate")
              }}
              registerValue={registerSSLServerRootCertificate}
            />
            <label css={LabelTextCSS}>Client Key</label>
            <InputUpload
              resetValue={() => {
                resetField("SSLClientKey")
              }}
              registerValue={registerSSLClientKey}
            />
            <label css={LabelTextCSS}>Client Certificate</label>
            <InputUpload
              resetValue={() => {
                resetField("SSLClientCertificate")
              }}
              registerValue={registerSSLClientCertificate}
            />
          </>
        )}
      </div>
      <div css={css(FooterCSS)}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
          onClick={back}
        >
          <div css={BackAreaCSS}>
            <div css={BackIconCSS}>
              <PaginationPreIcon />
            </div>
            <span css={BackTextCSS}>Back</span>
          </div>
        </Button>
        <div>
          <Button
            css={applyMargin("right", 8)}
            size="medium"
            colorScheme="gray"
            type="button"
          >
            Test Connection
          </Button>
          <Button size="medium" colorScheme="techPurple" type="submit">
            Create Resource
          </Button>
        </div>
      </div>
    </form>
  )
}
