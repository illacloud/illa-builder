import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { ComponentsState } from "@/redux/currentApp/editor/components/componentsState"
import { BaseDSL } from "@/wrappedComponents/interface"
import { UpdateComponentPayload } from "@/redux/currentApp/editor/components/componentsPayload"

export const addComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<BaseDSL>
> = (state, action) => {}

export const removeComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<string>
> = (state, action) => {}

export const updateComponentReducer: CaseReducer<
  ComponentsState,
  PayloadAction<UpdateComponentPayload>
> = (state, action) => {}
