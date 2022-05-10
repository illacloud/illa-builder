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
  applyTextAlign,
  SwitchTextCommentCSS,
  applyIllaColor,
  AlignDefaultCSS,
  BackAreaCSS,
  BackTextCSS,
  BackIconCSS,
  DisplayNoneCSS,
} from "./style"
import { Button } from "@illa-design/button"
import { Switch } from "@illa-design/switch"
import { PaginationPreIcon } from "@illa-design/icon"
import { useState, useRef } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { InputNumber } from "@illa-design/input-number"
import { MySQLFormValues } from "./interface"

export const MySQL = () => {
  const [expandSSH, setExpandSSH] = useState(false)
  const [expandSSL, setExpandSSL] = useState(false)
  const {
    handleSubmit,
    control,
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
  const [color, setColor] = useState("blue")

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

  const onSubmit: SubmitHandler<MySQLFormValues> = (data) =>
    alert(JSON.stringify(data))
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        css={css(
          GridContainerCSS,
          applyPadding("top", 8),
          applyPadding("bottom", 8),
        )}
      >
        <label css={LabelTextCSS}>Name</label>
        <div>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder='i.e."Users DB(readonly)" or "Internal Admin API"'
                borderColor={errors.Name ? "red" : "blue"}
                /*                onChange={(value) => {
                  console.log("yuuyy", errors)
                  if (errors.Name) {
                    setColor("red")
                  } else {
                    setColor("blue")
                  }
                  field.onChange(value)
                }}*/
              />
            )}
            rules={{ required: true }}
            control={control}
            name={"Name"}
          />
          {errors.Name && "Name is required!"}
        </div>
        <label css={LabelTextCSS}>Hostname/Port</label>
        <div css={HostnamePortCSS}>
          <Input maxLength={200} placeholder="Hostname" />
          <InputNumber defaultValue={3306} placeholder="3306" />
        </div>
        <label css={LabelTextCSS}>Database</label>
        <div>
          <Input placeholder="acme_production" />
        </div>
        <label css={LabelTextCSS}>Username/Password</label>
        <div css={UsernamePasswordCSS}>
          <Input placeholder="Username" />
          <Password invisibleButton={false} placeholder="Password" />
        </div>
      </div>
      <div
        css={css(GridContainerCSS, applyPadding("bottom", 16), BorderBottomCSS)}
      >
        <div css={css(DescriptionCSS, applyGridColIndex(2))}>
          Credentials will be encrypted & stored securely on our servers.
        </div>
        <label css={LabelTextCSS}>Connect Type</label>
        <div css={css(LabelTextCSS, applyTextAlign("left"))}>
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
            <div css={css(LabelTextCSS, applyTextAlign("left"))}>
              Useful to connect to private network
            </div>
          </div>
        </div>
        {expandSSH && (
          <>
            <label css={LabelTextCSS}>SSH Hostname/Port</label>
            <div css={HostnamePortCSS}>
              <Input placeholder="eg.localhost" />
              <InputNumber defaultValue={22} />
            </div>
            <label css={LabelTextCSS}>SSH Credentials</label>
            <div css={UsernamePasswordCSS}>
              <Input placeholder="eg.ec2-user" />
              <Password invisibleButton={false} placeholder="•••••••••" />
            </div>
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
                    >
                      Choose a File
                    </Button>
                  ),
                }}
              />
              <input
                css={DisplayNoneCSS}
                ref={uploadPrivateKeyRef}
                onChange={(event) => {
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
            <div css={css(LabelTextCSS, applyTextAlign("left"))}>
              SSL is used when available
            </div>
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
        <Button variant="text" size="medium" colorScheme="grayBlue">
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
