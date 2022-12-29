import { motion } from "framer-motion"
import { FC } from "react"
import {
  applyPreviewColumnsStyle,
  previewColumnsWrapperStyle,
} from "@/page/App/components/DotPanel/style"

interface PreviewColumnsChangeProps {
  columns: number
  unitWidth: number
}
export const PreviewColumnsChange: FC<PreviewColumnsChangeProps> = (props) => {
  const { columns, unitWidth } = props
  return (
    <motion.div
      css={previewColumnsWrapperStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      key={columns}
    >
      {new Array(columns).fill(0).map((_, index) => {
        return (
          <div key={index} css={applyPreviewColumnsStyle(index, unitWidth)} />
        )
      })}
    </motion.div>
  )
}
