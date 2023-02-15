import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddDashboardAppPayload,
  ModifyConfigDashboardAppPayload,
  RenameDashboardAppPayload,
} from "@/redux/dashboard/apps/dashboardAppPayload"
import {
  DashboardApp,
  DashboardAppsState,
} from "@/redux/dashboard/apps/dashboardAppState"

export const updateDashboardAppListReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<DashboardApp[]>
> = (state, action) => {
  state.list = action.payload
}

export const addDashboardAppReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<AddDashboardAppPayload>
> = (state, action) => {
  let payload = action.payload
  if (payload.index == undefined) {
    state.list = [payload.app, ...state.list]
  } else {
    state.list.splice(payload.index, 0, payload.app)
  }
}

export const removeDashboardAppReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<string>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.appId == action.payload
  })
  if (index != -1) {
    state.list.splice(index, 1)
  }
}

export const renameDashboardAppReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<RenameDashboardAppPayload>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      appName: action.payload.newName,
    }
  }
}

export const modifyConfigDashboardAppReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<ModifyConfigDashboardAppPayload>
> = (state, action) => {
  let index = state.list.findIndex((element, index) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      config: {
        ...state.list[index]?.config,
        ...action.payload.config,
      },
    }
  }
}
