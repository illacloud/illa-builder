import { FC } from "react"
import { Button, ButtonGroup } from "@illa-design/button"
import {
  BugIcon,
  CaretRightIcon,
  MoreIcon,
  WindowBottomIcon,
  WindowLeftIcon,
  WindowRightIcon,
} from "@illa-design/icon"
import { useTranslation } from "react-i18next"
import {
  descriptionStyle,
  informationStyle,
  nameStyle,
  navBarStyle,
  rowCenter,
  viewControlStyle,
} from "./style"
import { ZoomControl } from "@/page/App/components/PageNavBar/ZoomControl"
import { ReactComponent as Logo } from "@assets/illa-logo.svg"
import { useDispatch, useSelector } from "react-redux"
import { PageNavBarProps } from "@/page/App/components/PageNavBar/interface"
import { configActions } from "@/redux/currentApp/config/configSlice"
import {
  isOpenBottomPanel,
  isOpenLeftPanel,
  isOpenRightPanel,
} from "@/redux/currentApp/config/configSelector"
import { getAppInfo } from "@/redux/currentApp/appInfo/appInfoSelector"

export const PageNavBar: FC<PageNavBarProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const appInfo = useSelector(getAppInfo)

  return (
    <div className={className} css={navBarStyle}>
      <div css={rowCenter}>
        <Logo width={"34px"} />
        <section css={informationStyle}>
          <div css={nameStyle}>{appInfo?.appName}</div>
          <div css={descriptionStyle}>{appInfo?.appActivity}</div>
        </section>
      </div>
      <div css={viewControlStyle}>
        <WindowLeftIcon
          onClick={() => {
            dispatch(
              configActions.updateLeftPanel(!useSelector(isOpenLeftPanel)),
            )
          }}
        />
        <WindowRightIcon
          onClick={() => {
            dispatch(
              configActions.updateRightPanel(!useSelector(isOpenRightPanel)),
            )
          }}
        />
        <WindowBottomIcon
          onClick={() => {
            dispatch(
              configActions.updateBottomPanel(!useSelector(isOpenBottomPanel)),
            )
          }}
        />
        <ZoomControl />
      </div>
      <div>
        <ButtonGroup spacing={"8px"}>
          <Button colorScheme="gray" size="medium" leftIcon={<BugIcon />} />
          <Button colorScheme="gray" size="medium" leftIcon={<MoreIcon />} />
          <Button
            colorScheme="techPurple"
            size="medium"
            leftIcon={<CaretRightIcon />}
          >
            {t("deploy")}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

PageNavBar.displayName = "PageNavBar"
