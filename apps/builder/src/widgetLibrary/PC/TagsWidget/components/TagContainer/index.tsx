import { FC, useEffect, useRef } from "react"
import { Tag } from "@illa-design/react"
import { TagContainerProps } from "./interface"

const TagContainer: FC<TagContainerProps> = ({
  v,
  c,
  allowWrap,
  handleUpdateWith,
  handleOnSelect,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!allowWrap) {
      handleUpdateWith?.(ref.current?.clientWidth || 0)
    }
  }, [allowWrap, handleUpdateWith])
  return (
    <Tag
      ref={ref}
      colorScheme={c}
      clickable
      onClick={() => handleOnSelect?.(v)}
    >
      {v}
    </Tag>
  )
}

export default TagContainer
