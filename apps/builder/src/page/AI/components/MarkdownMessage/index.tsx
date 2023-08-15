import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { Link, Paragraph } from "@illa-design/react"
import { MarkdownMessageProps } from "@/page/AI/components/MarkdownMessage/interface"
import { markdownMessageStyle } from "@/page/AI/components/MarkdownMessage/style"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"

export const MarkdownMessage: FC<MarkdownMessageProps> = (props) => {
  const { children } = props

  const sanitizeOptions = {
    allowedTags: HTMLTags,
  }

  return (
    <ReactMarkdown
      css={markdownMessageStyle}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeOptions]]}
      components={{
        a: ({ href, children }) => (
          <Link href={href} target="_blank" colorScheme="blue">
            {children}
          </Link>
        ),
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
      }}
    >
      {children ?? ""}
    </ReactMarkdown>
  )
}

MarkdownMessage.displayName = "MarkdownMessage"
export default MarkdownMessage
