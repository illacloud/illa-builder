import {
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material"
import Paper from "@mui/material/Paper"
import React, { FC } from "react"
import { CodeBlock, github } from "react-code-blocks"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { Heading, Link, Paragraph, Typography } from "@illa-design/react"
import { MarkdownMessageProps } from "@/page/AI/components/MarkdownMessage/interface"
import { markdownMessageStyle } from "@/page/AI/components/MarkdownMessage/style"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"

export const MarkdownMessage: FC<MarkdownMessageProps> = (props) => {
  const { children } = props

  const sanitizeOptions = {
    allowedTags: HTMLTags,
  }

  return (
    <StyledEngineProvider injectFirst>
      <Typography>
        <ReactMarkdown
          css={markdownMessageStyle}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeOptions]]}
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
              <TableCell align="left">{children}</TableCell>
            ),
            thead: ({ children }) => <TableHead>{children}</TableHead>,
            tbody: ({ children }) => <TableBody>{children}</TableBody>,
            tfoot: ({ children }) => <TableFooter>{children}</TableFooter>,
            table: ({ children }) => (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>{children}</Table>
              </TableContainer>
            ),
            code: ({ children }) => (
              <pre>
                <CodeBlock theme={github} language="jsx" text={`${children}`} />
              </pre>
            ),
          }}
        >
          {children ?? ""}
        </ReactMarkdown>
      </Typography>
    </StyledEngineProvider>
  )
}

MarkdownMessage.displayName = "MarkdownMessage"
export default MarkdownMessage
