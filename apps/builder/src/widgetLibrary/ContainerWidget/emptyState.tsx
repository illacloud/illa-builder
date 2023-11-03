import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { getPaddingShape } from "@/utils/styleUtils/padding"
import {
  applyEmptyStateWrapperStyle,
  emptyStateStyle,
} from "@/widgetLibrary/ContainerWidget/style"

export const ContainerEmptyState: FC<{
  isInner?: boolean
  containerPadding?: string
  handleUpdateHeight?: (height: number) => void
}> = ({ handleUpdateHeight, isInner, containerPadding = "0" }) => {
  const { t } = useTranslation()

  const paddings = getPaddingShape(containerPadding)

  const paddingTopBottom = paddings.paddingTop + paddings.paddingBottom

  useEffect(() => {
    if (handleUpdateHeight) {
      handleUpdateHeight(13 * UNIT_HEIGHT + paddingTopBottom)
    }
  }, [handleUpdateHeight, paddingTopBottom])

  return (
    <div css={applyEmptyStateWrapperStyle(isInner, paddingTopBottom)}>
      <span css={emptyStateStyle}>{t("widget.container.empty")}</span>
    </div>
  )
}
