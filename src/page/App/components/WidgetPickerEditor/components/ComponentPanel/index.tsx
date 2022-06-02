import { FC, useState } from "react"
import { Search } from "@illa-design/input"
import { componentContainerCss, sessionListContainerCss } from "./style"
import { ComponentPanelProps, ComponentSessionProps } from "./interface"
import { ComponentSession } from "./ComponentSession"
import { getMatchComponent } from "./utils"
import { Empty } from "./Empty"
import { buildComponentList } from "@/wrappedComponents/ComponentListBuilder"

export const ComponentPanel: FC<ComponentPanelProps> = (props) => {
  const defaultList: ComponentSessionProps[] = buildComponentList()
  const { className, componentList = defaultList } = props

  const [searchRes, setSearchRes] = useState<
    ComponentSessionProps[] | undefined
  >(componentList)

  return (
    <div className={className} css={componentContainerCss}>
      <Search
        borderColor={"purple"}
        variant={"fill"}
        placeholder={"search"}
        // radius={`20px`}
        onChange={(e) => {
          const res = getMatchComponent(e.target.value, componentList)
          setSearchRes(res)
        }}
        onSearch={(value) => {
          const res = getMatchComponent(value, componentList)
          setSearchRes(res)
        }}
      />
      <div css={sessionListContainerCss}>
        {searchRes && searchRes.length ? (
          searchRes.map((session) => (
            <ComponentSession key={"session-" + session.title} {...session} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}

ComponentPanel.displayName = "ComponentPanel"
