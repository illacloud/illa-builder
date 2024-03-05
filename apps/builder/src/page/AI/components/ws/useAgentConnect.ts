import { isPremiumModel } from "@illa-public/market-agent"
import { AI_AGENT_TYPE } from "@illa-public/public-types"
import {
  CollarModalType,
  handleCollaPurchaseError,
  useCollarModal,
} from "@illa-public/upgrade-modal"
import { getCurrentTeamInfo, getCurrentUser } from "@illa-public/user-data"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { Connection, getTextMessagePayload } from "@/api/ws"
import { WSMessageListener } from "@/api/ws/illaWS"
import { Callback } from "@/api/ws/interface"
import { TextSignal, TextTarget } from "@/api/ws/textSignal"
import {
  ChatMessage,
  ChatSendRequestPayload,
  ChatWsAppendResponse,
} from "@/page/AI/components/PreviewChat/interface"
import {
  UseAgentProps,
  UseAgentReturn,
} from "@/page/AI/components/ws/useAgentProps"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"
import {
  getAIAgentAnonymousAddress,
  getAIAgentWsAddress,
} from "@/services/agent"
import { formatMessageString } from "./utils"

export type AgentMessageType = "chat" | "stop_all" | "clean"

export function useAgentConnect(useAgentProps: UseAgentProps) {
  const {
    onConnecting,
    onReceiving,
    onSendClean,
    onUpdateRoomUsers,
    onRunning,
    onSendPrompt,
    onStartRunning,
  } = useAgentProps

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [generationMessage, setGenerationMessage] = useState<
    ChatMessage | undefined
  >(undefined)

  const chatMessagesRef = useRef<ChatMessage[]>([])
  const generationMessageRef = useRef<ChatMessage | undefined>(undefined)

  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const currentUserInfo = useSelector(getCurrentUser)

  const message = useMessage()
  const collaModal = useCollarModal()
  const { t } = useTranslation()

  const sendMessage = useCallback(
    (
      payload: ChatSendRequestPayload,
      signal: TextSignal,
      aiAgentType: AI_AGENT_TYPE,
      type: AgentMessageType,
      updateMessage?: boolean,
      messageContent?: ChatMessage,
    ) => {
      onReceiving(true)
      const encodePayload: ChatSendRequestPayload = payload
      Object.keys(encodePayload).forEach((key) => {
        if (key === "prompt") {
          const text = encodePayload[key]
          if (isPremiumModel(payload.model)) {
            encodePayload[key] = encodeURIComponent(
              formatMessageString(text, messageContent?.knowledgeFiles),
            )
          } else {
            encodePayload[key] = encodeURIComponent(encodePayload[key])
          }
        }
        if (key === "variables") {
          encodePayload[key] = encodePayload[key].map((v) => {
            return {
              ...v,
              value: encodeURIComponent(v.value),
            }
          })
        }
      })

      Connection.getTextRoom("ai-agent", "")?.send(
        getTextMessagePayload(
          signal,
          TextTarget.ACTION,
          true,
          {
            type: type,
            payload: {},
          },
          currentTeamInfo?.id ?? "",
          currentUserInfo.userID,
          [encodePayload],
        ),
      )
      if (updateMessage && messageContent) {
        switch (aiAgentType) {
          case AI_AGENT_TYPE.CHAT:
            chatMessagesRef.current = [
              ...chatMessagesRef.current,
              messageContent,
            ]
            setChatMessages([...chatMessages, messageContent])
            break
          case AI_AGENT_TYPE.TEXT_GENERATION:
            break
        }
      }
    },
    [chatMessages, currentTeamInfo?.id, currentUserInfo.userID, onReceiving],
  )

  const onUpdateChatMessage = useCallback((message: ChatMessage) => {
    const newMessageList = [...chatMessagesRef.current]
    const index = newMessageList.findIndex((m) => {
      return m.threadID === message.threadID
    })
    if (index === -1) {
      newMessageList.push({
        sender: message.sender,
        message: message.message,
        threadID: message.threadID,
      } as ChatMessage)
    } else {
      newMessageList[index].message =
        newMessageList[index].message + message.message
    }
    chatMessagesRef.current = newMessageList
    setChatMessages(newMessageList)
  }, [])

  const onUpdateGenerationMessage = useCallback((message: ChatMessage) => {
    if (
      generationMessageRef.current &&
      generationMessageRef.current.threadID === message.threadID
    ) {
      const newMessage = {
        ...generationMessageRef.current,
      }
      newMessage.message = newMessage.message + message.message
      generationMessageRef.current = newMessage
      setGenerationMessage(newMessage)
    } else {
      const m = {
        sender: message.sender,
        message: message.message,
        threadID: message.threadID,
      } as ChatMessage
      generationMessageRef.current = m
      setGenerationMessage(m)
    }
  }, [])

  const cleanMessage = useCallback(() => {
    chatMessagesRef.current = []
    setChatMessages([])
    generationMessageRef.current = undefined
    setGenerationMessage(undefined)
  }, [])

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
          onMessage: (event) => {
            const m = event.data
            if (typeof m !== "string") {
              return
            }
            const dataList = m.split("\n")
            dataList.forEach((data: string) => {
              let callback: Callback<unknown> = JSON.parse(data)
              if (callback.errorCode === 0) {
                switch (callback.broadcast?.type) {
                  case "enter/remote":
                    const { inRoomUsers } = callback.broadcast.payload as {
                      inRoomUsers: CollaboratorsInfo[]
                    }
                    onUpdateRoomUsers(inRoomUsers)
                    cleanMessage()
                    onSendClean()
                    break
                  case "chat/remote":
                    let chatCallback = callback.broadcast
                      .payload as ChatWsAppendResponse
                    if (agentType === AI_AGENT_TYPE.CHAT) {
                      onUpdateChatMessage(chatCallback)
                    } else {
                      onUpdateGenerationMessage(chatCallback)
                    }
                    break
                  case "stop_all/remote":
                    break
                  case "clean/remote":
                    onSendPrompt()
                    break
                }
              } else {
                switch (callback.errorCode) {
                  case 1:
                    onReceiving(false)
                    onRunning(false)
                    message.error({
                      content: t("editor.ai-agent.message.start-failed"),
                    })
                    break
                  case 15:
                    onReceiving(false)
                    break
                  case 16:
                    message.error({
                      content: t("editor.ai-agent.message.token"),
                    })
                    break
                  case 17:
                  case 18:
                    collaModal({
                      modalType: CollarModalType.TOKEN,
                      from: "agent_run",
                    })
                    break
                  case 3:
                    break
                }
              }
            })
          },
          onClosed: () => {
            onReceiving(true)
          },
        } as WSMessageListener
        Connection.enterAgentRoom(address, messageListener)
        onConnecting(false)
        onRunning(true)
        onReceiving(true)
        onStartRunning()
      } catch (e) {
        onConnecting(false)
        const res = handleCollaPurchaseError(
          e,
          CollarModalType.TOKEN,
          "agent_run",
        )
        if (res) return
        message.error({
          content: t("editor.ai-agent.message.start-failed"),
        })
        return
      }
    },
    [
      cleanMessage,
      message,
      onConnecting,
      onReceiving,
      onRunning,
      onSendClean,
      onSendPrompt,
      onStartRunning,
      onUpdateChatMessage,
      onUpdateGenerationMessage,
      onUpdateRoomUsers,
      collaModal,
      t,
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
      chatMessagesRef.current = []
      setChatMessages([])
      generationMessageRef.current = undefined
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
