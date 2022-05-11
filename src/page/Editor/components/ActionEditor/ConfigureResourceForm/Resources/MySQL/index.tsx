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
  SwitchTextCommentCSS,
  RequireTagCSS,
  applyIllaColor,
  AlignDefaultCSS,
  ErrorMessageCSS,
  BackAreaCSS,
  BackTextCSS,
  BackIconCSS,
  DisplayNoneCSS,
  applyJustifyContent,
} from "./style"
import { Button } from "@illa-design/button"
import { Switch } from "@illa-design/switch"
import { PaginationPreIcon } from "@illa-design/icon"
import { useState, useRef } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { InputNumber } from "@illa-design/input-number"
import { MySQLFormValues } from "./interface"

const Error_REQUIRED_MESSAGE = "This is required!"
export const MySQL = () => {
  const [expandSSH, setExpandSSH] = useState(false)
  const [expandSSL, setExpandSSL] = useState(false)
  const {
    handleSubmit,
    control,
    register,
    resetField,
    formState: { errors },
  } = useForm<MySQLFormValues>()

  const uploadPrivateKeyRef = useRef<HTMLInputElement | null>(null)
  const privateKeyRef = useRef<HTMLInputElement | null>(null)
  const [privateKeyName, setPrivateKeyName] = useState("")
  const uploadServerCertificateRef = useRef<HTMLInputElement | null>(null)
  const serverCertificateRef = useRef<HTMLInputElement | null>(null)
  const [serverCertificateName, setServerCertificateName] = useState("")
  const uploadClientKeyRef = useRef<HTMLInputElement | null>(null)
  const clientKeyRef = useRef<HTMLInputElement | null>(null)
  const [clientKeyName, setClientKeyName] = useState("")
  const uploadClientCertificateRef = useRef<HTMLInputElement | null>(null)
  const clientCertificateRef = useRef<HTMLInputElement | null>(null)
  const [clientCertificateName, setClientCertificateName] = useState("")

  const handleUploadPrivateKey = () => {
    uploadPrivateKeyRef.current?.click()
  }
  const handleUploadServerCertificate = () => {
    uploadServerCertificateRef.current?.click()
  }
  const handleUploadClientKey = () => {
    uploadClientKeyRef.current?.click()
  }
  const handleUploadClientCertificate = () => {
    uploadClientCertificateRef.current?.click()
  }

  const PK = register("SSH_PrivateKey")

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
            colorScheme="brand-purple"
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
                    error={!!errors.SSH_Hostname}
                  />
                )}
                rules={{
                  required: Error_REQUIRED_MESSAGE,
                }}
                control={control}
                name="SSH_Hostname"
              />
              <Controller
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    placeholder="22"
                    error={!!errors.SSH_Port}
                  />
                )}
                rules={{
                  required: Error_REQUIRED_MESSAGE,
                }}
                control={control}
                name="SSH_Port"
              />
            </div>
            {(errors.SSH_Hostname || errors.SSH_Port) && (
              <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                <div css={ErrorMessageCSS}>{errors.SSH_Hostname?.message}</div>
                <div css={ErrorMessageCSS}>{errors.SSH_Port?.message}</div>
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
                    error={!!errors.SSH_Credentials}
                  />
                )}
                rules={{
                  required: Error_REQUIRED_MESSAGE,
                }}
                control={control}
                name="SSH_Credentials"
              />
              <Controller
                render={({ field }) => (
                  <Password
                    {...field}
                    placeholder="•••••••••"
                    invisibleButton={false}
                    error={!!errors.SSH_Password}
                  />
                )}
                rules={{
                  required: Error_REQUIRED_MESSAGE,
                }}
                control={control}
                name="SSH_Password"
              />
            </div>
            {(errors.SSH_Credentials || errors.SSH_Password) && (
              <div css={css(HostnamePortCSS, applyGridColIndex(2))}>
                <div css={ErrorMessageCSS}>
                  {errors.SSH_Credentials?.message}
                </div>
                <div css={ErrorMessageCSS}>{errors.SSH_Password?.message}</div>
              </div>
            )}
            <label css={LabelTextCSS}>Private Key</label>
            <div>
              <Input
                placeholder="e.g.path/to/root.crt"
                value={privateKeyName}
                suffix={{
                  render: (
                    <Button
                      variant="text"
                      colorScheme="purple"
                      onClick={handleUploadPrivateKey}
                      type="button"
                    >
                      Choose a File
                    </Button>
                  ),
                }}
                onClear={() => {
                  setPrivateKeyName("")
                  resetField("SSH_PrivateKey")
                  /*                  if (uploadPrivateKeyRef.current?.value) {
                    uploadPrivateKeyRef.current.value = undefined
                  }*/
                }}
                allowClear
              />
              <input
                css={DisplayNoneCSS}
                {...PK}
                ref={(e) => {
                  PK.ref(e)
                  uploadPrivateKeyRef.current = e
                }}
                onChange={(event) => {
                  PK.onChange(event)
                  const files = event.target.files
                  if (files) {
                    setPrivateKeyName(files[0].name)
                  }
                }}
                type="file"
              />
            </div>
            <label css={LabelTextCSS}>SSH passphrase</label>
            <div>
              <Password invisibleButton={false} placeholder="•••••••••" />
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
            colorScheme="brand-purple"
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
            <div>
              <Input
                placeholder="e.g.path/to/root.crt"
                value={serverCertificateName}
                suffix={{
                  render: (
                    <Button
                      variant="text"
                      colorScheme="purple"
                      onClick={handleUploadServerCertificate}
                      type="button"
                    >
                      Choose a File
                    </Button>
                  ),
                }}
              />
              <input
                css={DisplayNoneCSS}
                ref={uploadServerCertificateRef}
                onChange={(event) => {
                  const files = event.target.files
                  if (files) {
                    setServerCertificateName(files[0].name)
                  }
                }}
                type="file"
              />
            </div>
            <label css={LabelTextCSS}>Client Key</label>
            <div>
              <Input
                placeholder="e.g.path/to/client.key"
                value={clientKeyName}
                suffix={{
                  render: (
                    <Button
                      variant="text"
                      colorScheme="purple"
                      onClick={handleUploadClientKey}
                      type="button"
                    >
                      Choose a File
                    </Button>
                  ),
                }}
              />
              <input
                css={DisplayNoneCSS}
                ref={uploadClientKeyRef}
                onChange={(event) => {
                  const files = event.target.files
                  if (files) {
                    setClientKeyName(files[0].name)
                  }
                }}
                type="file"
              />
            </div>
            <label css={LabelTextCSS}>Client Certificate</label>
            <div>
              <Input
                placeholder="e.g.path/to/client.crt"
                value={clientCertificateName}
                suffix={{
                  render: (
                    <Button
                      variant="text"
                      colorScheme="purple"
                      onClick={handleUploadClientCertificate}
                      type="button"
                    >
                      Choose a File
                    </Button>
                  ),
                }}
              />
              <input
                css={DisplayNoneCSS}
                ref={uploadClientCertificateRef}
                onChange={(event) => {
                  const files = event.target.files
                  if (files) {
                    setClientCertificateName(files[0].name)
                  }
                }}
                type="file"
              />
            </div>
          </>
        )}
      </div>
      <div css={css(FooterCSS)}>
        <Button
          variant="text"
          size="medium"
          colorScheme="grayBlue"
          type="button"
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
          <Button size="medium" colorScheme="purple" type="submit">
            Create Resource
          </Button>
        </div>
      </div>
    </form>
  )
}
