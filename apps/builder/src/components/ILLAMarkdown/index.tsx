import { FC } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Link, Text } from "@illa-design/react"
import { ILLAMarkdownProps } from "@/components/ILLAMarkdown/interface"

export const ILLAMarkdown: FC<ILLAMarkdownProps> = (props) => {
  const { textString, textColor = "white", urlColor = "white" } = props
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...aProps }) => (
          <Link href={aProps.href} colorScheme={urlColor} target="_blank">
            {aProps.children}
          </Link>
        ),
        p: ({ children, ...pProps }) => (
          <Text colorScheme={textColor} fs="14px">
            {children}
          </Text>
        ),
      }}
    >
      {textString ?? ""}
    </ReactMarkdown>
  )
}

ILLAMarkdown.displayName = "ILLAMarkdown"
