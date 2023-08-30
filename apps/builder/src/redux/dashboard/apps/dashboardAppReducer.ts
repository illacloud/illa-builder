import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import {
  AddDashboardAppPayload,
  ModifyDashboardAppContribute,
  ModifyDashboardAppDeployed,
  ModifyDashboardAppPublic,
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
  let index = state.list.findIndex((element) => {
    return element.appId == action.payload
  })
  if (index != -1) {
    state.list.splice(index, 1)
  }
}

export const updateDashboardAppReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<DashboardApp>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      ...action.payload,
    }
  }
}

export const updateDashboardAppPublicReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<ModifyDashboardAppPublic>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      config: {
        ...state.list[index]?.config,
        public: action.payload.isPublic,
      },
    }
  }
}

export const updateDashboardAppContributeReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<ModifyDashboardAppContribute>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      config: {
        ...state.list[index]?.config,
        publishedToMarketplace: action.payload.publishedToMarketplace,
      },
    }
  }
}

export const updateDashboardAppDeployedReducer: CaseReducer<
  DashboardAppsState,
  PayloadAction<ModifyDashboardAppDeployed>
> = (state, action) => {
  let index = state.list.findIndex((element) => {
    return element.appId == action.payload.appId
  })
  if (index != -1) {
    state.list[index] = {
      ...state.list[index],
      deployed: action.payload.deployed,
    }
  }
}
