import { Params } from "@/redux/resource/restapiResource"

export interface Agent {
  icon: string
  name: string
  description: string
  mode: string
  modal: string
  maxToken: number
  variable: Params[]
  temperature: number
  prompt: string
}

export enum SenderType {
  User = 1,
  Agent = 2,
}

export interface ChatSender {
  senderID: string
  senderType: SenderType
}

export interface ChatMessage {
  threadID: string
  prompt: string
  variable: Params[]
  message: string
  sender: ChatSender
}
