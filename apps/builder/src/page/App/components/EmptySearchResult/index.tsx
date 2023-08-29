import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Empty } from "@illa-design/react"
import { ReactComponent as EmptySearchIcon } from "@/assets/empty-search-icon.svg"
import { emptyStyle } from "@/page/App/components/ComponentPanel/style"
import { EmptySearchResultProps } from "@/page/App/components/EmptySearchResult/interface"


export const EmptySearchResult: FC<EmptySearchResultProps> = (props) => {
  const { t } = useTranslation()

  return (
    <div css={emptyStyle}>
      <Empty
        icon={<EmptySearchIcon />}
        description={props.desc ?? t("editor.widget_picker.empty_tip")}
      />
    </div>
  )
}

EmptySearchResult.displayName = "EmptySearchResult"