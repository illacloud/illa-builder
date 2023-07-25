import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import {
  applyEmptyStateWrapperStyle,
  emptyStateStyle,
} from "@/widgetLibrary/ContainerWidget/style"

export const ContainerEmptyState: FC<{
  isInner?: boolean
  handleUpdateHeight?: (height: number) => void
}> = ({ handleUpdateHeight, isInner }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (handleUpdateHeight) {
      handleUpdateHeight(15 * UNIT_HEIGHT)
    }
  }, [handleUpdateHeight])
  return (
    <div css={applyEmptyStateWrapperStyle(isInner)}>
      <span css={emptyStateStyle}>{t("widget.container.empty")}</span>
    </div>
  )
}
