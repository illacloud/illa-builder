import { FC, useMemo } from "react"
import { modalCss } from "./style"
import { IEventHandleProps } from "./interface"
import ModalHeader from "@/page/App/components/PanelSetters/PublicComponent/Modal/header"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"

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
      <SelectedProvider
        propsPanelConfig={event}
        handleUpdateItemDsl={handleUpdateItem}
      >
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, event.id)
        })}
      </SelectedProvider>
    </div>
  )
}

export default EventHandle
