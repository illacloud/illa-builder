import { copyToClipboard } from "@illa-public/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CodeProps } from "react-markdown/lib/ast-to-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CopyIcon, Text, useMessage } from "@illa-design/react"
import { getTextValue } from "../utils"
import {
  codeBlockContainerStyle,
  codeBlockHeaderStyle,
  copyStyle,
  inlineCodeStyle,
} from "./style"

const Code: FC<CodeProps> = (props) => {
  const { t } = useTranslation()
  const message = useMessage()

  return (
    <>
      {!!props.inline ? (
        <Text css={inlineCodeStyle} bg="#FAFAFA" colorScheme="grayBlue">
          {getTextValue(props.children)}
        </Text>
      ) : (
        <div css={codeBlockContainerStyle}>
          <div css={codeBlockHeaderStyle}>
            <span>
              {/language-(\w+)/.exec(props.className || "")?.[1] ?? "markdown"}
            </span>
            <div
              css={copyStyle}
              onClick={() => {
                copyToClipboard(props.children?.[0])
                message.success({
                  content: t("copied"),
                })
              }}
            >
              <CopyIcon size="16px" />
              <span>{t("editor.ai-agent.copy_code")}</span>
            </div>
          </div>
          <SyntaxHighlighter
            {...props}
            CodeTag="div"
            PreTag="div"
            customStyle={{
              background: "transparent",
            }}
            language={
              /language-(\w+)/.exec(props.className || "")?.[1] ?? "markdown"
            }
            style={oneLight}
          >
            {getTextValue(props.children)}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  )
}

export default Code
