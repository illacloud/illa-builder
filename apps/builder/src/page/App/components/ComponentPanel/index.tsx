import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { Search } from "@illa-design/react"
import { buildComponentList } from "@/page/App/components/ComponentPanel/componentListBuilder"
import { FocusManager } from "@/utils/focusManager"
import { ComponentSession } from "./ComponentSession"
import {
  ColumnSuggestComponent,
  RowSuggestComponent,
} from "./components/SuggestComponent"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import {
  componentContainerStyle,
  emptyContainerStyle,
  searchWrapperStyle,
  sessionListContainerStyle,
} from "./style"
import { getMatchComponent } from "./utils"

const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const { t } = useTranslation()

  const defaultList: ComponentSessionProps[] = buildComponentList()
  const { className, componentList = defaultList } = props
  const [searchInput, setSearchInput] = useState("")

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  const handleOnChange = useCallback(
    (value: string) => {
      setSearchInput(value)
      const res = getMatchComponent(value, componentList)
      setSearchRes(res)
    },
    [componentList],
  )

  return (
    <div
      className={className}
      css={componentContainerStyle}
      onClick={() => {
        FocusManager.switchFocus("widget_picker")
      }}
    >
      <div css={searchWrapperStyle}>
        <Search
          value={searchInput}
          colorScheme="purple"
          variant="fill"
          placeholder={t("editor.widget_picker.search_placeholder")}
          onChange={handleOnChange}
        />
      </div>
      <div css={sessionListContainerStyle}>
        {searchRes && searchRes.length ? (
          searchRes
            .map((session) => (
              <ComponentSession
                key={"session-" + session.sessionTitle}
                {...session}
              />
            ))
            .concat(<RowSuggestComponent key="suggest" />)
        ) : (
          <div css={emptyContainerStyle}>
            <ColumnSuggestComponent />
          </div>
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
export default ComponentPanel
