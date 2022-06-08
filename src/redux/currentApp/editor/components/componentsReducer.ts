import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  ComponentNode,
  ComponentsState,
} from "@/redux/currentApp/editor/components/componentsState"
import { UpdateComponentPayload } from "@/redux/currentApp/editor/components/componentsPayload"

export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<ComponentNode>
> = (state, action) => {}

export const removeComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<string>
> = (state, action) => {}

export const updateComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPayload>
> = (state, action) => {}
