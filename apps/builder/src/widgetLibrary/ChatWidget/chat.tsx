import { Resizable, ResizeCallback, ResizeStartCallback } from "re-resizable"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"
import { configActions } from "@/redux/config/configSlice"
import { BaseChat } from "@/widgetLibrary/ChatWidget/components/baseChat"
import { ReplyTo } from "@/widgetLibrary/ChatWidget/components/replyTo"
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
import RenderChildrenCanvas from "@/widgetLibrary/PublicSector/RenderChildrenCanvas"
import { TooltipWrapper } from "@/widgetLibrary/PublicSector/TooltipWrapper"
import { emptyMessage } from "./constants"

export const ChatWidget: FC<ChatWidgetProps> = (props) => {
  const {
    columnNumber,
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
    updateComponentRuntimeProps,
    deleteComponentRuntimeProps,
  } = props
  const { messageListRef, containerRef, handleOnSizeChange } = useSizeChange(
    value.length,
  )
  const dispatch = useDispatch()
  const [replyShow, setReplyShow] = useState(false)
  const [replyMessage, setReplyMessage] = useState<MessageContent>({})

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
    dispatch(
      configActions.setResizingNodeIDsReducer([`${displayName}-resize-footer`]),
    )
  }

  const handleOnResizeStop: ResizeCallback = useCallback(
    (e, dir, elementRef, delta) => {
      const { height } = delta
      handleUpdateOriginalDSLMultiAttr({
        footerHeight: footerHeight + height,
      })
      dispatch(configActions.setResizingNodeIDsReducer([]))
    },
    [dispatch, footerHeight, handleUpdateOriginalDSLMultiAttr],
  )

  const handleOnResize: ResizeCallback = useCallback(() => {
    handleOnSizeChange()
  }, [handleOnSizeChange])

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
  const handleOnReply = useCallback(
    (message: MessageContent | undefined) => {
      if (!message) return
      handleOnSelect(message)
      handleUpdateMultiExecutionResult([
        {
          displayName,
          value: {
            replyMessage: message,
          },
        },
      ])
      setReplyShow(true)
      setReplyMessage(message)
    },
    [displayName, handleOnSelect, handleUpdateMultiExecutionResult],
  )

  const clearReplyMessage = useCallback(() => {
    setReplyShow(false)
    handleUpdateMultiExecutionResult([
      {
        displayName,
        value: {
          replyMessage: emptyMessage,
        },
      },
    ])
  }, [displayName, handleUpdateMultiExecutionResult])

  const handleOnDelete = useCallback(
    (message: MessageContent | undefined) => {
      if (!message) return
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
    addOrDelLoading(
      receiving,
      messageList,
      handleUpdateValue,
      handleOnSizeChange,
    )
  }, [handleUpdateValue, receiving, messageList, handleOnSizeChange])

  useEffect(() => {
    updateComponentRuntimeProps({
      clearReplyMessage: clearReplyMessage,
    })
    return () => {
      deleteComponentRuntimeProps()
    }
  }, [
    clearReplyMessage,
    deleteComponentRuntimeProps,
    updateComponentRuntimeProps,
  ])

  return (
    <TooltipWrapper tooltipText={tooltipText} tooltipDisabled={!tooltipText}>
      <div css={chatContainerStyle(backgroundColor)} ref={containerRef}>
        <div style={{ height: "100%" }}>
          <BaseChat
            {...props}
            ref={messageListRef}
            value={value}
            handleOnDelete={handleOnDelete}
            handleOnReply={handleOnReply}
          />
        </div>
        {replyShow && (
          <ReplyTo
            replyMessage={replyMessage}
            clearReplyMessage={clearReplyMessage}
          />
        )}
        {showFooter && (
          <Resizable
            size={{
              width: "100%",
              height: footerHeight,
            }}
            minHeight={8 * UNIT_HEIGHT}
            maxHeight="80%"
            enable={{
              top: true,
            }}
            onResizeStart={handleResizeStart}
            onResizeStop={handleOnResizeStop}
            onResize={handleOnResize}
          >
            <div css={resizeLineStyle} />
            <div css={footerStyle}>
              <RenderChildrenCanvas
                displayName={childrenNode[0]}
                columnNumber={columnNumber}
                handleUpdateHeight={() => {}}
              />
            </div>
          </Resizable>
        )}
      </div>
    </TooltipWrapper>
  )
}

ChatWidget.displayName = "ChatWidget"
export default ChatWidget
