import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { WSMessageListener } from "@/api/ws/illaWS"
import { Callback, ILLA_WEBSOCKET_STATUS } from "@/api/ws/interface"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import {
  UseAgentProps,
  UseAgentReturn,
} from "@/page/AI/components/ws/useAgentProps"
import {
  AI_AGENT_TYPE,
  ChatMessage,
  ChatSendRequestPayload,
  ChatWsAppendResponse,
} from "@/redux/aiAgent/aiAgentState"
import { configActions } from "@/redux/config/configSlice"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import {
  getAIAgentAnonymousAddress,
  getAIAgentWsAddress,
} from "@/services/agent"
import store from "@/store"

export function useAgentConnect(useAgentProps: UseAgentProps) {
  const {
    onConnecting,
    onReceiving,
    onUpdateRoomUsers,
    onRunning,
    onSendPrompt,
  } = useAgentProps

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [generationMessage, setGenerationMessage] = useState<
    ChatMessage | undefined
  >(undefined)

  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const currentUserInfo = useSelector(getCurrentUser)

  const message = useMessage()

  const sendMessage = useCallback(
    (
      payload: ChatSendRequestPayload,
      signal: TextSignal,
      aiAgentType: AI_AGENT_TYPE,
      updateMessage?: boolean,
      messageContent?: ChatMessage,
    ) => {
      onReceiving(true)
      Connection.getTextRoom("ai-agent", "")?.send(
        getTextMessagePayload(
          signal,
          TextTarget.ACTION,
          false,
          null,
          currentTeamInfo?.id ?? "",
          currentUserInfo.userId,
          [payload],
        ),
      )
      if (updateMessage && messageContent) {
        switch (aiAgentType) {
          case AI_AGENT_TYPE.CHAT:
            setChatMessages([...chatMessages, messageContent])
            break
          case AI_AGENT_TYPE.TEXT_GENERATION:
            setGenerationMessage(undefined)
            break
        }
      }
    },
    [chatMessages, currentTeamInfo?.id, currentUserInfo.userId, onReceiving],
  )

  const connect = useCallback(
    async (aiAgentID: string, agentType: AI_AGENT_TYPE) => {
      onConnecting(true)
      let address = ""
      try {
        if (aiAgentID === "" || aiAgentID === undefined) {
          const response = await getAIAgentAnonymousAddress()
          address = response.data.aiAgentConnectionAddress
        } else {
          const response = await getAIAgentWsAddress(aiAgentID)
          address = response.data.aiAgentConnectionAddress
        }
        const messageListener = {
          onMessage: (event, context, ws) => {
            const message = event.data
            if (typeof message !== "string") {
              return
            }
            const dataList = message.split("\n")
            dataList.forEach((data: string) => {
              let callback: Callback<unknown> = JSON.parse(data)

              if (callback.target === TextTarget.ACTION) {
                let chatCallback: Callback<ChatWsAppendResponse> =
                  JSON.parse(data)
                switch (chatCallback.errorCode) {
                  case 0:
                    if (agentType === AI_AGENT_TYPE.CHAT) {
                      const newMessageList = [...chatMessages]
                      const index = newMessageList.findIndex((m) => {
                        return m.threadID === chatCallback.data.threadID
                      })
                      if (index === -1) {
                        newMessageList.push({
                          sender: chatCallback.data.sender,
                          message: chatCallback.data.message,
                          threadID: chatCallback.data.threadID,
                        } as ChatMessage)
                      } else {
                        newMessageList[index].message =
                          newMessageList[index].message +
                          chatCallback.data.message
                      }
                      setChatMessages(newMessageList)
                    } else {
                      if (
                        generationMessage &&
                        generationMessage.threadID ===
                          chatCallback.data.threadID
                      ) {
                        const newMessage = {
                          ...generationMessage,
                        }
                        newMessage.message =
                          newMessage.message + chatCallback.data.message
                        setGenerationMessage(newMessage)
                      } else {
                        setGenerationMessage({
                          sender: chatCallback.data.sender,
                          message: chatCallback.data.message,
                          threadID: chatCallback.data.threadID,
                        } as ChatMessage)
                      }
                    }
                    break
                  case 14:
                    store.dispatch(
                      configActions.updateWSStatusReducer({
                        context: context,
                        wsStatus: ILLA_WEBSOCKET_STATUS.LOCKING,
                      }),
                    )
                    ws.reconnect()
                    break
                  case 15:
                    onReceiving(false)
                }
              }
              if (
                callback.signal === TextSignal.ENTER &&
                callback.broadcast.type == "enter/remote"
              ) {
                const { inRoomUsers } = JSON.parse(callback.broadcast.payload)
                onUpdateRoomUsers(inRoomUsers)
              }
            })
          },
        } as WSMessageListener
        Connection.enterAgentRoom(address, messageListener)
        onConnecting(false)
        onRunning(true)
        onSendPrompt()
      } catch (e) {
        onConnecting(false)
        message.error({
          content: "start fail",
        })
        return
      }
    },
    [
      onConnecting,
      onRunning,
      onSendPrompt,
      onReceiving,
      chatMessages,
      generationMessage,
      onUpdateRoomUsers,
      message,
    ],
  )

  useEffect(() => {
    return () => {
      Connection.leaveRoom("ai-agent", "")
    }
  }, [])

  const reconnect = useCallback(
    async (aiAgentID: string, aiAgentType: AI_AGENT_TYPE) => {
      Connection.leaveRoom("ai-agent", "")
      onRunning(false)
      setChatMessages([])
      setGenerationMessage(undefined)
      await connect(aiAgentID, aiAgentType)
    },
    [connect, onRunning],
  )

  return {
    connect,
    reconnect,
    chatMessages,
    generationMessage,
    sendMessage,
  } as UseAgentReturn
}
