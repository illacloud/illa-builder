import { copyToClipboard } from "@illa-public/utils"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import {
  CopyIcon,
  Heading,
  Link,
  Paragraph,
  Trigger,
  Typography,
  useMessage,
} from "@illa-design/react"
import { MarkdownMessageProps } from "@/page/AI/components/MarkdownMessage/interface"
import {
  cellStyle,
  hoverCopyStyle,
  markdownMessageStyle,
  tableStyle,
} from "@/page/AI/components/MarkdownMessage/style"
import Code from "./Code"
import { handleParseText } from "./utils"

export const MarkdownMessage: FC<MarkdownMessageProps> = (props) => {
  const { children, isOwnMessage, disableTrigger } = props
  const { t } = useTranslation()
  const message = useMessage()

  return (
    <Trigger
      bdRadius="4px"
      disabled={disableTrigger}
      content={
        <span
          css={hoverCopyStyle(isOwnMessage)}
          onClick={() => {
            copyToClipboard(children ?? "")
            message.success({
              content: t("copied"),
            })
          }}
        >
          <CopyIcon />
        </span>
      }
      colorScheme="transparent"
      position={isOwnMessage ? "left-end" : "right-end"}
      showArrow={false}
      autoFitPosition={false}
      withoutPadding
      trigger="hover"
      withoutShadow
    >
      <div>
        <Typography>
          <ReactMarkdown
            css={markdownMessageStyle}
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: ({ children }) => <Heading level="h1">{children}</Heading>,
              h2: ({ children }) => <Heading level="h2">{children}</Heading>,
              h3: ({ children }) => <Heading level="h3">{children}</Heading>,
              h4: ({ children }) => <Heading level="h4">{children}</Heading>,
              h5: ({ children }) => <Heading level="h5">{children}</Heading>,
              h6: ({ children }) => <Heading level="h6">{children}</Heading>,
              a: ({ href, children }) => (
                <Link href={href} target="_blank" colorScheme="blue">
                  {children}
                </Link>
              ),
              p: ({ children }) => <Paragraph>{children}</Paragraph>,
              tr: ({ children }) => <TableRow>{children}</TableRow>,
              th: ({ children }) => (
                <TableCell align="center">{children}</TableCell>
              ),
              td: ({ children }) => (
                <TableCell align="left" css={cellStyle}>
                  {children}
                </TableCell>
              ),
              thead: ({ children }) => <TableHead>{children}</TableHead>,
              tbody: ({ children }) => <TableBody>{children}</TableBody>,
              tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
              table: ({ children }) => (
                <TableContainer component={Paper} css={tableStyle}>
                  <Table sx={{ minWidth: 650 }}>{children}</Table>
                </TableContainer>
              ),
              code: (props) => <Code {...props} />,
            }}
          >
            {handleParseText(children ?? "", isOwnMessage)}
          </ReactMarkdown>
        </Typography>
      </div>
    </Trigger>
  )
}

MarkdownMessage.displayName = "MarkdownMessage"
export default MarkdownMessage
