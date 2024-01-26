import { UpgradeIcon } from "@illa-public/icon"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  CloseIcon,
  DoubtIcon,
  Modal,
  Trigger,
} from "@illa-design/react"
import TipIcon from "./assets/pricing-tip.svg?react"
import ModalDecorate from "./assets/upgrad-modal-bg.svg?react"
import { FEATURE_CONFIG } from "./constants"
import {
  applyCardListStyle,
  decorateStyle,
  descriptionStyle,
  doubtStyle,
  footerStyle,
  headerStyle,
  iconStyle,
  modalCloseIconStyle,
  modalMaskStyle,
  modalStyle,
  priceContentStyle,
  priceStyle,
  titleStyle,
  upgradeButtonStyle,
} from "./style"

interface ToCloudModalProps {
  onClose: () => void
}

export const ToCloudModal: FC<ToCloudModalProps> = ({ onClose }) => {
  const { t } = useTranslation()

  const { title, description, buttonText } = useMemo(() => {
    return { title: "", description: "", buttonText: "" }
  }, [])

  return (
    <Modal
      z={2000}
      visible
      _css={modalStyle}
      withoutPadding
      maskClosable={false}
      footer={false}
      onCancel={onClose}
      maskStyle={modalMaskStyle}
    >
      <div css={modalCloseIconStyle} onClick={onClose}>
        <CloseIcon size="12px" />
      </div>
      <ModalDecorate css={decorateStyle} />
      <div css={headerStyle}>
        <div css={titleStyle}>{t(title)}</div>
        <div css={descriptionStyle}>
          <span>{t(description)}</span>
        </div>
      </div>
      <div>
        {FEATURE_CONFIG.map(({ label, tip }, i) => {
          return (
            <div css={applyCardListStyle} key={`${label}${i}`}>
              {label && <TipIcon css={iconStyle} />}
              <span>{t(label)}</span>
              {tip && (
                <Trigger
                  trigger="hover"
                  colorScheme="techPurple"
                  content={t(tip)}
                >
                  <span css={doubtStyle}>
                    <DoubtIcon css={iconStyle} />
                  </span>
                </Trigger>
              )}
            </div>
          )
        })}
        <div css={footerStyle}>
          <div>
            <div css={priceStyle}>$16.7</div>
            <div css={priceContentStyle}>
              {t("billing.modal.upgrade_now_admin.pricing")}
            </div>
          </div>
          <Button
            css={upgradeButtonStyle}
            leftIcon={<UpgradeIcon />}
            colorScheme="techPurple"
            onClick={() => {}}
          >
            {t(buttonText)}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
