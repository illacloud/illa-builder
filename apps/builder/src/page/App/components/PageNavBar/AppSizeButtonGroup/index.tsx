import { motion } from "framer-motion"
import { FC, MouseEvent, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReactComponent as DesktopIcon } from "@/assets/appSize/desktop.svg"
import { ReactComponent as CustomIcon } from "@/assets/appSize/filter.svg"
import { ReactComponent as FluidIcon } from "@/assets/appSize/fluid.svg"
import { ReactComponent as TabletIcon } from "@/assets/appSize/tablet.svg"
import { PreviewPopContent } from "@/page/App/components/PageNavBar/PreviewPopContent"
import { getViewportSizeSelector } from "@/redux/currentApp/editor/components/componentsSelector"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ViewportSizeType } from "@/redux/currentApp/editor/components/componentsState"
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

const variants = {
  hidden: {
    opacity: 0,
    display: "none",
  },
  shown: {
    opacity: 1,
    display: "flex",
  },
}

export const AppSizeButtonGroup: FC = () => {
  const { viewportSizeType, viewportWidth, viewportHeight } = useSelector(
    getViewportSizeSelector,
  )
  const dispatch = useDispatch()

  const showCustomInputs = viewportSizeType === "custom"
  const currentSizeType = viewportSizeType ?? "fluid"

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
      {showCustomInputs && (
        <motion.div
          initial="hidden"
          animate={showCustomInputs ? "shown" : "hidden"}
          variants={variants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <PreviewPopContent />
        </motion.div>
      )}
    </div>
  )
}

AppSizeButtonGroup.displayName = "AppSizeButtonGroup"
