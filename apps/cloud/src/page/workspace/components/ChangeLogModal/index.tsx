import { ILLAMarkdown } from "@illa-public/illa-markdown"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import {
  Button,
  CloseIcon,
  Link,
  Modal,
  Timeline,
  TimelineItem,
  getColor,
} from "@illa-design/react"
import ChangeLogIcon from "@/assets/page/workspace/change-log-bg.svg?react"
import { CHANGE_LOG_NUM } from "./constants"
import { ChangeLogModalProps } from "./interface"
import {
  changeBgStyle,
  changeLogContainerStyle,
  closeIconStyle,
  contentStyle,
  headerStyle,
  itemContainerStyle,
  itemTitleStyle,
  lineContainerStyle,
  linkStyle,
  modalMaskStyle,
  modalStyle,
} from "./style"

const ChangeLogModal: FC<ChangeLogModalProps> = ({ onClose }) => {
  const { t } = useTranslation()

  const CHANGE_LOGS = Array.from(new Array(CHANGE_LOG_NUM)).map((_, index) => ({
    content: t(`page.left.menu.changeLogs.${index + 1}.content`),
    title: t(`page.left.menu.changeLogs.${index + 1}.title`),
    changeLogLink: t(`page.left.menu.changeLogs.${index + 1}.changeLogLink`),
  }))

  return (
    <Modal
      visible
      maskClosable={false}
      footer={false}
      css={modalStyle}
      maskStyle={modalMaskStyle}
      withoutPadding
    >
      <div css={changeLogContainerStyle}>
        <div css={headerStyle}>
          <span css={closeIconStyle} onClick={onClose}>
            <CloseIcon size="12px" />
          </span>
          <span css={changeBgStyle}>
            <ChangeLogIcon width="100%" height="100%" />
          </span>
        </div>
        <div css={contentStyle}>
          <Timeline>
            {Array.isArray(CHANGE_LOGS) &&
              CHANGE_LOGS?.map(({ content, changeLogLink, title }, i) => (
                <TimelineItem
                  key={title}
                  index={i}
                  css={lineContainerStyle}
                  dotColor={getColor("techPurple", "01")}
                >
                  <div css={itemContainerStyle}>
                    <span css={itemTitleStyle}>{title}</span>
                    <ILLAMarkdown
                      textString={content}
                      textColor={getColor("grayBlue", "02")}
                      urlColor={getColor("grayBlue", "02")}
                    />
                    <Link
                      href={changeLogLink ?? ""}
                      css={linkStyle}
                      colorScheme="white"
                      target="_blank"
                    >
                      <Button colorScheme={getColor("grayBlue", "02")}>
                        {t("page.left.menu.changeLogs.read_more")}
                      </Button>
                    </Link>
                  </div>
                </TimelineItem>
              ))}
          </Timeline>
        </div>
      </div>
    </Modal>
  )
}

export default ChangeLogModal
