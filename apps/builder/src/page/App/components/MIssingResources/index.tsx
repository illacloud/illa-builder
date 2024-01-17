import { FC } from "react"
import { createPortal } from "react-dom"
import { Modal } from "@illa-design/react"
import { MissingResourceHeader } from "./Components/Header"
import MissingList from "./Components/MissingList"

const MissingResources: FC<{
  shown: boolean
  changeShown: (shown: boolean) => void
}> = ({ shown, changeShown }) => {
  const handleCloseModal = () => {
    changeShown(false)
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
    >
      <MissingResourceHeader handleCloseModal={handleCloseModal} />
      <MissingList handleCancelModal={handleCloseModal} />
    </Modal>,
    document.body,
  )
}

export default MissingResources
