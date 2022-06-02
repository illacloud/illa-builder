import { fieldFactory } from "@/page/Editor/components/InspectPanel/utils/fieldFactory"
import { ModalProps } from "@/page/Editor/components/PanelSetters/DatasetsSetter/interface"
import { FC, useCallback, useMemo } from "react"
import { CHART_DATASET_CONFIG } from "@/wrappedComponents/Chart/panelConfig"
import {
  modalCloseIconCss,
  modalHeaderCss,
  modalWrapperCss,
} from "@/page/Editor/components/PanelSetters/DatasetsSetter/style"
import { PopPanelProvider } from "@/page/Editor/components/InspectPanel/context/popPanelContext"
import { CloseIcon } from "@illa-design/icon"

export const ModalV2: FC<ModalProps> = (props) => {
  const { handleUpdateItem, index, name, handleCloseModal } = props

  const handleClickCloseIcon = useCallback(() => {
    handleCloseModal()
  }, [handleCloseModal])

  const handleChangeValue = useCallback(
    (value) => {
      handleUpdateItem(index, value)
    },
    [index],
  )

  return (
    <div css={modalWrapperCss}>
      <div css={modalHeaderCss}>
        <span>{name}</span>
        <span onClick={handleClickCloseIcon} css={modalCloseIconCss}>
          <CloseIcon />
        </span>
      </div>
      <PopPanelProvider
        popPanelConfig={props}
        handleUpdateItem={handleChangeValue}
      >
        <div style={{ maxHeight: "calc(100vh - 150px )", overflowY: "scroll" }}>
          {fieldFactory(CHART_DATASET_CONFIG, "xxxxx")}
        </div>
      </PopPanelProvider>
    </div>
  )
}
