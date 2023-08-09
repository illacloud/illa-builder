import { TextSignal } from "@/api/ws/textSignal"
import {
  AI_AGENT_TYPE,
  ChatMessage,
  ChatSendRequestPayload,
} from "@/redux/aiAgent/aiAgentState"
import { CollaboratorsInfo } from "@/redux/currentApp/collaborators/collaboratorsState"

export interface UseAgentProps {
  onConnecting: (isConnecting: boolean) => void
  onRunning: (isRunning: boolean) => void
  onReceiving: (isReceiving: boolean) => void
  onUpdateRoomUsers: (roomUsers: CollaboratorsInfo[]) => void
  onSendPrompt: () => void
  onStartRunning: () => void
}

export interface UseAgentReturn {
  connect: (aiAgentID: string, agentType: AI_AGENT_TYPE) => Promise<void>
  reconnect: (aiAgentID: string, agentType: AI_AGENT_TYPE) => Promise<void>
  sendMessage: (
    payload: ChatSendRequestPayload,
    signal: TextSignal,
    aiAgentType: AI_AGENT_TYPE,
    updateMessage?: boolean,
    messageContent?: ChatMessage,
  ) => void
  generationMessage: ChatMessage | undefined
  chatMessages: ChatMessage[]
}
