import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  applyEmptyStateWrapperStyle,
  emptyStateStyle,
} from "@/widgetLibrary/ContainerWidget/style"
import { UNIT_HEIGHT } from "../../page/App/components/DotPanel/constant/canvas"

export const ContainerEmptyState: FC<{
  handleUpdateHeight?: (height: number) => void
}> = ({ handleUpdateHeight }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (handleUpdateHeight) {
      handleUpdateHeight(15 * UNIT_HEIGHT)
    }
  }, [handleUpdateHeight])
  return (
    <div css={applyEmptyStateWrapperStyle}>
      <span css={emptyStateStyle}>{t("widget.container.empty")}</span>
    </div>
  )
}
