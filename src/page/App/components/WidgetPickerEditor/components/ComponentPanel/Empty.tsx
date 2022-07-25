import { FC } from "react"
import { Empty } from "@illa-design/empty"
import { emptyStyle } from "./style"
import { useTranslation } from "react-i18next"
import { ReactComponent as EmptySearchIcon } from "@/assets/empty-search-icon.svg"

export const EmptySearchResult: FC = () => {
  const { t } = useTranslation()

  return (
    <div css={emptyStyle}>
      <Empty
        icon={<EmptySearchIcon />}
        description={t("editor.widget_picker.empty_tip")}
      />
    </div>
  )
}

EmptySearchResult.displayName = "Empty"
