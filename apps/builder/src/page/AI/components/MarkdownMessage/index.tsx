import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import {
  Heading,
  Image,
  Link,
  Paragraph,
  Text,
  Typography,
} from "@illa-design/react"
import { MarkdownMessageProps } from "@/page/AI/components/MarkdownMessage/interface"
import { markdownMessageStyle } from "@/page/AI/components/MarkdownMessage/style"
import { HTMLTags } from "@/widgetLibrary/TextWidget/constans"

export const MarkdownMessage: FC<MarkdownMessageProps> = (props) => {
  const { children } = props

  const sanitizeOptions = {
    allowedTags: HTMLTags,
  }

  return (
    <Typography>
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
          h1: ({ children }) => <Heading level="h1">{children}</Heading>,
          h2: ({ children }) => <Heading level="h2">{children}</Heading>,
          h3: ({ children }) => <Heading level="h3">{children}</Heading>,
          h4: ({ children }) => <Heading level="h4">{children}</Heading>,
          h5: ({ children }) => <Heading level="h5">{children}</Heading>,
          h6: ({ children }) => <Heading level="h6">{children}</Heading>,
          text: ({ children }) => <Text>{children}</Text>,
          img: ({ src, alt }) => (
            <Image
              objectFit="contain"
              width="320px"
              height="320px"
              src={src}
              alt={alt}
            />
          ),
          code: ({ children }) => <Text code>{children}</Text>,
          mark: ({ children }) => <Text mark>{children}</Text>,
        }}
      >
        {children ?? ""}
      </ReactMarkdown>
    </Typography>
  )
}

MarkdownMessage.displayName = "MarkdownMessage"
export default MarkdownMessage
