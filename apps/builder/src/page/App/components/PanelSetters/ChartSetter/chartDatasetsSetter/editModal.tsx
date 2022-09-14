import { FC } from "react"
import { editModalStyle } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/style"
import { ModalHeader } from "@/page/App/components/PanelSetters/PublicComponent/Modal/header"

export const EditModal: FC = () => {
  return (
    <div css={editModalStyle}>
      <ModalHeader title="TitleName" handleCloseModal={() => {}} />
    </div>
  )
}
