import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useContext } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@illa-design/react"
import { MissingResourceHeader } from "./Components/Header"
import MissingList from "./Components/MissingList"

const MissingResources: FC<{
  shown: boolean
  changeShown: (shown: boolean) => void
}> = ({ shown, changeShown }) => {
  const { track } = useContext(MixpanelTrackContext)
  const handleCloseModal = () => {
    changeShown(false)
    track(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "missing_resource_configure_modal_cancel",
    })
  }

  return createPortal(
    <Modal
      visible={shown}
      w="720px"
      autoFocus={false}
      footer={false}
      onCancel={handleCloseModal}
      withoutPadding
      maskClosable={false}
      afterOpen={() => {
        track(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
          element: "missing_resource_configure_modal",
        })
      }}
    >
      <MissingResourceHeader handleCloseModal={handleCloseModal} />
      <MissingList handleCancelModal={handleCloseModal} />
    </Modal>,
    document.body,
  )
}

export default MissingResources
