import React from "react"
import { Divider } from "@illa-design/divider"
import { MySQLPanel } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Resources"
import { Transformer } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/Transformer"
import { EventHandler } from "@/page/Editor/components/ActionEditor/ActionEditorPanel/EventHandler"

export const ResourcePanel = () => {
  return (
    <>
      <Divider />
      <MySQLPanel />
      <Transformer />
      <Divider />
      <EventHandler />
    </>
  )
}
