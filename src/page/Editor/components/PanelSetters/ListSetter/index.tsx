import { FC } from "react"
import PanelLabel from "@/page/Editor/components/InspectPanel/label"
import { ListSetterProps } from "./interface"
import { renderField } from "@/page/Editor/components/InspectPanel/utils/fieldFactory"
import { labelCss, listWrapperCss } from "./style"

const ListSetter: FC<ListSetterProps> = (props) => {
  const { labelName, labelDesc, childrenSetter } = props

  return (
    <div>
      <div css={labelCss}>
        <PanelLabel labelName={labelName} labelDesc={labelDesc} />
        <div>reset</div>
      </div>

      <div css={listWrapperCss}>
        {childrenSetter?.map((child, index) => {
          return renderField(child)
        })}
      </div>
    </div>
  )
}

export default ListSetter
