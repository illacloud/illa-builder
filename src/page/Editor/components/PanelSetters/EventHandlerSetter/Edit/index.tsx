import { FC, useMemo } from "react"
import { modalCss } from "./style"
import { IEventHandleProps } from "./interface"
import ModalHeader from "@/page/Editor/components/PanelSetters/PublicComponent/Modal/header"
import { SelectedProvider } from "@/page/Editor/components/InspectPanel/context/selectedContext"
import { renderFieldAndLabel } from "@/page/Editor/components/InspectPanel/utils/fieldFactory"

const EventHandle: FC<IEventHandleProps> = (props) => {
  const { event, handleCloseModal, childrenSetter, handleUpdateItem } = props

  const formattingTitle = useMemo(
    () =>
      `Editor ${
        event.event ? event.event.toLocaleLowerCase() + " " : ""
      }handler`,
    [event.event],
  )

  return (
    <div css={modalCss}>
      <ModalHeader
        title={formattingTitle}
        handleCloseModal={handleCloseModal}
      />
      <SelectedProvider event={event} handleUpdateItemDsl={handleUpdateItem}>
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, event.id)
        })}
      </SelectedProvider>
    </div>
  )
}

export default EventHandle
