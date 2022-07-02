import { FC, useContext } from "react"
import { listWrapperCss, modalWrapperCss } from "./style"
import { ModalProps } from "./interface"
import { ModalHeader } from "@/page/App/components/PanelSetters/PublicComponent/Modal/header"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"

export const Modal: FC<ModalProps> = (props) => {
  const { title, index, handleCloseModal } = props

  const { childrenSetter, widgetDisplayName, attrPath } = useContext(
    OptionListSetterContext,
  )

  return (
    <div css={modalWrapperCss}>
      <ModalHeader title={title} handleCloseModal={handleCloseModal} />
      <div css={listWrapperCss}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(
            child,
            widgetDisplayName ?? "",
            true,
            `${attrPath}.${index}`,
          )
        })}
      </div>
    </div>
  )
}
