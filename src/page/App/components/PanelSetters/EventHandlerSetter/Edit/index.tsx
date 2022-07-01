import { FC, useMemo } from "react"
import { modalStyle } from "./style"
import { IEventHandleProps } from "./interface"
import { ModalHeader } from "@/page/App/components/PanelSetters/PublicComponent/Modal/header"
import { SelectedProvider } from "@/page/App/components/InspectPanel/context/selectedContext"
import { renderFieldAndLabel } from "@/page/App/components/InspectPanel/utils/fieldFactory"

export const EventHandle: FC<IEventHandleProps> = (props) => {
  const {
    event,
    handleCloseModal,
    childrenSetter,
    handleUpdateItem,
    attrName,
  } = props

  const formattingTitle = useMemo(
    () =>
      `Editor ${
        event.event ? event.event.toLocaleLowerCase() + " " : ""
      }handler`,
    [event.event],
  )

  return (
    <div css={modalStyle}>
      <ModalHeader
        title={formattingTitle}
        handleCloseModal={handleCloseModal}
      />
      <SelectedProvider
        propsPanelConfig={event}
        handleUpdateItemDsl={handleUpdateItem}
      >
        {childrenSetter?.map((child) => {
          return renderFieldAndLabel(child, event.id, false, attrName)
        })}
      </SelectedProvider>
    </div>
  )
}

EventHandle.displayName = "EventHandle"
