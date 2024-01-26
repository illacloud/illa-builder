import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"
import {
  Button,
  CloseIcon,
  DoubtIcon,
  Link,
  Modal,
  Trigger,
  TriggerProvider,
} from "@illa-design/react"
import DiscordIcon from "./assets/discord-icon.svg?react"
import TipIcon from "./assets/pricing-tip.svg?react"
import ModalDecorate from "./assets/upgrad-modal-bg.svg?react"
import {
  applyCardListStyle,
  boldStyle,
  decorateStyle,
  descriptionStyle,
  doubtStyle,
  footerStyle,
  headerStyle,
  iconStyle,
  linkStyle,
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

  const FEATURE_CONFIG = [
    {
      label: t("new_dashboard.selfhost.export.feature1"),
      tip: t("new_dashboard.selfhost.export.feature_tips1"),
    },
    {
      label: t("new_dashboard.selfhost.export.feature2"),
      tip: t("new_dashboard.selfhost.export.feature_tips2"),
    },
    {
      label: t("new_dashboard.selfhost.export.feature3"),
      tip: t("new_dashboard.selfhost.export.feature_tips3"),
    },
    {
      label: t("new_dashboard.selfhost.export.feature4"),
      tip: t("new_dashboard.selfhost.export.feature_tips4"),
    },
    {
      label: t("new_dashboard.selfhost.export.feature5"),
      tip: t("new_dashboard.selfhost.export.feature_tips5"),
    },
    {
      label: t("new_dashboard.selfhost.export.feature6"),
      tip: t("new_dashboard.selfhost.export.feature_tips6"),
    },
  ]

  return (
    <Modal
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
        <div css={titleStyle}>{t("new_dashboard.selfhost.export.title")}</div>
        <div css={descriptionStyle}>
          <span>
            <Trans
              i18nKey={"new_dashboard.selfhost.export.desc"}
              t={t}
              components={[<span key="discordName" css={boldStyle} />]}
            />
          </span>
        </div>
      </div>
      <TriggerProvider zIndex={1005}>
        <div>
          {FEATURE_CONFIG.map(({ label, tip }) => {
            return (
              <div css={applyCardListStyle} key={label}>
                {label && <TipIcon css={iconStyle} />}
                <span>{label}</span>
                <Trigger
                  trigger="hover"
                  maxW="300px"
                  colorScheme="techPurple"
                  content={tip}
                >
                  <span css={doubtStyle}>
                    <DoubtIcon css={iconStyle} />
                  </span>
                </Trigger>
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
            <Link
              href="https://discord.com/invite/illacloud"
              css={linkStyle}
              colorScheme="white"
              target="_blank"
            >
              <Button
                css={upgradeButtonStyle}
                leftIcon={<DiscordIcon width="12px" height="12px" />}
                colorScheme="techPurple"
              >
                {t("new_dashboard.selfhost.export.button")}
              </Button>
            </Link>
          </div>
        </div>
      </TriggerProvider>
    </Modal>
  )
}
