import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { Variants, motion } from "framer-motion"
import { FC, MouseEvent, useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DesktopIcon from "@/assets/appSize/desktop.svg?react"
import CustomIcon from "@/assets/appSize/filter.svg?react"
import FluidIcon from "@/assets/appSize/fluid.svg?react"
import TabletIcon from "@/assets/appSize/tablet.svg?react"
import { PreviewPopContent } from "@/page/App/Module/PageNavBar/PreviewPopContent"
import { getViewportSizeSelector } from "@/redux/currentApp/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { ViewportSizeType } from "@/redux/currentApp/components/componentsState"
import { trackInEditor } from "@/utils/mixpanelHelper"
import {
  appSizeContainerStyle,
  appSizeIconContainerStyle,
  appSizeIconStyle,
  getAppSizeIconSelectedStyle,
  previewButtonGroupWrapperStyle,
} from "./style"

const AppSizeIcons = [
  {
    type: "fluid",
    Icon: FluidIcon,
  },
  {
    type: "desktop",
    Icon: DesktopIcon,
  },
  {
    type: "tablet",
    Icon: TabletIcon,
  },
  {
    type: "custom",
    Icon: CustomIcon,
  },
]

const defaultAppSize = {
  fluid: {
    viewportWidth: undefined,
    viewportHeight: undefined,
  },
  desktop: {
    viewportWidth: 1280,
    viewportHeight: undefined,
  },
  tablet: {
    viewportWidth: 1080,
    viewportHeight: undefined,
  },
}

const variants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    visibility: "hidden",
    transitionEnd: {
      display: "none",
    },
  },
  shown: {
    height: "unset",
    opacity: 1,
    visibility: "visible",
    display: "inherit",
  },
}

export const AppSizeButtonGroup: FC = () => {
  const { viewportSizeType, viewportWidth, viewportHeight } = useSelector(
    getViewportSizeSelector,
  )
  const dispatch = useDispatch()

  const showCustomInputs = viewportSizeType === "custom"
  const currentSizeType = viewportSizeType ?? "fluid"

  useEffect(() => {
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SELECT, {
      element: "preview_size",
      parameter2: currentSizeType,
    })
  }, [currentSizeType])

  const updateAppSize = useCallback(
    ({
      viewportWidth,
      viewportHeight,
      viewportSizeType,
    }: {
      viewportWidth?: number
      viewportHeight?: number
      viewportSizeType?: ViewportSizeType
    }) => {
      dispatch(
        componentsActions.updateViewportSizeReducer({
          viewportWidth,
          viewportHeight,
          viewportSizeType,
        }),
      )
    },
    [dispatch],
  )

  const handleAppSizeTypeChange = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      const newType = e.currentTarget.dataset.key as ViewportSizeType
      const sizeObj =
        newType !== "custom"
          ? defaultAppSize[newType]
          : {
              viewportHeight,
              viewportWidth,
            }
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
        element: "preview_size",
        parameter2: newType,
      })
      updateAppSize({
        ...sizeObj,
        viewportSizeType: newType,
      })
    },
    [updateAppSize, viewportHeight, viewportWidth],
  )

  return (
    <div css={previewButtonGroupWrapperStyle}>
      <div css={appSizeContainerStyle}>
        {AppSizeIcons.map((info) => {
          const { Icon, type } = info
          return (
            <span
              key={type}
              data-key={type}
              css={appSizeIconContainerStyle}
              onClick={handleAppSizeTypeChange}
            >
              <span
                css={[
                  appSizeIconStyle,
                  getAppSizeIconSelectedStyle(currentSizeType === type),
                ]}
              >
                <Icon />
              </span>
            </span>
          )
        })}
      </div>
      <motion.div
        initial="hidden"
        animate={showCustomInputs ? "shown" : "hidden"}
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <PreviewPopContent />
      </motion.div>
    </div>
  )
}

AppSizeButtonGroup.displayName = "AppSizeButtonGroup"
