import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import useMeasure from "react-use-measure"
import { configActions } from "@/redux/config/configSlice"
import { BasicContainer } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { BaseChat } from "@/widgetLibrary/ChatWidget/baseChat"
import {
  ChatWidgetProps,
  MessageContent,
} from "@/widgetLibrary/ChatWidget/interface"
import {
  chatContainerStyle,
  footerStyle,
  resizeLineStyle,
} from "@/widgetLibrary/ChatWidget/style"
import { useSizeChange } from "@/widgetLibrary/ChatWidget/useSizeChange"
import {
  addOrDelLoading,
  formatEventOptions,
} from "@/widgetLibrary/ChatWidget/utils"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"

export const ChatWidget: FC<ChatWidgetProps> = (props) => {
  const {
    displayName,
    value = [],
    tooltipText,
    receiving = false,
    footerHeight = 50,
    childrenNode,
    mappedOption,
    showFooter,
    backgroundColor = "white",
    triggerEventHandler,
    handleUpdateOriginalDSLMultiAttr,
    handleUpdateMultiExecutionResult,
  } = props
  const { messageListRef, containerRef, handleOnSizeChange } = useSizeChange(
    value.length,
  )
  const dispatch = useDispatch()
  const [footerRef, footerBounds] = useMeasure()

  const messageList = useMemo(() => {
    return formatEventOptions(mappedOption)
  }, [mappedOption])

  const handleUpdateValue = useCallback(
    (messageList: MessageContent[]) => {
      if (!messageList || !Array.isArray(messageList)) {
        return
      }
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            value: messageList,
          },
        },
      ])
    },
    [displayName, handleUpdateMultiExecutionResult],
  )

  const handleResizeStart: ResizeStartCallback = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(configActions.updateResizingStateReducer(true))
  }

  const handleOnResizeTopStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      handleUpdateOriginalDSLMultiAttr({
        footerHeight: footerHeight + height,
      })
      dispatch(configActions.updateResizingStateReducer(false))
    },
    [dispatch, footerHeight, handleUpdateOriginalDSLMultiAttr],
  )

  const handleOnResize: ResizeCallback = useCallback(() => {
    handleOnSizeChange()
  }, [handleOnSizeChange])

  const renderFooter = useMemo(() => {
    const footerComponentNode = childrenNode[0]
    return (
      <BasicContainer
        componentNode={footerComponentNode}
        canResizeY={false}
        minHeight={footerBounds.height - 2 * 8}
        padding={8}
        addedRowNumber={0}
      />
    )
  }, [childrenNode, footerBounds.height])

  const handleOnSelect = useCallback(
    (message: MessageContent) => {
      return new Promise((resolve) => {
        handleUpdateMultiExecutionResult([
          {
            displayName,
            value: {
              selectedMessage: message,
            },
          },
        ])
        resolve(true)
      }).then(() => {
        triggerEventHandler("select")
      })
    },
    [displayName, handleUpdateMultiExecutionResult, triggerEventHandler],
  )
  const handleOnReplay = useCallback(
    (message: MessageContent) => {
      handleOnSelect(message).then(() => {
        triggerEventHandler("replay")
      })
    },
    [handleOnSelect, triggerEventHandler],
  )

  const handleOnDelete = useCallback(
    (message: MessageContent) => {
      handleOnSelect(message).then(() => {
        triggerEventHandler("delete")
      })
    },
    [handleOnSelect, triggerEventHandler],
  )

  useEffect(() => {
    handleUpdateValue(messageList)
  }, [handleUpdateValue, messageList])

  useEffect(() => {
    addOrDelLoading(receiving, value, handleUpdateValue)
  }, [handleUpdateValue, receiving, value])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={chatContainerStyle(backgroundColor)} ref={containerRef}>
        <div style={{ height: "100%" }}>
          <BaseChat
            {...props}
            ref={messageListRef}
            value={value}
            handleOnDelete={handleOnDelete}
            handleOnReplay={handleOnReplay}
          />
        </div>
        {showFooter && (
          <Resizable
            size={{
              width: "100%",
              height: footerHeight,
            }}
            minHeight={50}
            maxHeight="80%"
            enable={{
              top: true,
            }}
            onResizeStart={handleResizeStart}
            onResizeStop={handleOnResizeTopStop}
            onResize={handleOnResize}
          >
            <div css={resizeLineStyle} />
            <div css={footerStyle} ref={footerRef}>
              {renderFooter}
            </div>
          </Resizable>
        )}
      </div>
    </TooltipWrapper>
  )
}

ChatWidget.displayName = "ChatWidget"
