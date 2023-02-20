import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { isNumber } from "@illa-design/react"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { MemberInfo, Team, TeamInfo } from "@/redux/team/teamState"

export const updateTeamReducer: CaseReducer<Team, PayloadAction<Team>> = (
  state,
  action,
) => {
  const { payload } = action
  if (!payload) return
  return payload
}

export const updateCurrentIdReducer: CaseReducer<
  Team,
  PayloadAction<string>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    currentId: payload,
  }
  return state
}

export const updateTeamItemsReducer: CaseReducer<
  Team,
  PayloadAction<TeamInfo[]>
> = (state, action) => {
  if (!state) return
  const { payload } = action
  state = {
    ...state,
    items: payload,
  }
  return state
}

export const updateCurrentRoleReducer: CaseReducer<
  Team,
  PayloadAction<USER_ROLE>
> = (state, action) => {
  const { payload } = action
  if (!isNumber(payload) || !state) return
  let { currentId, items } = state
  const currentIndex = items?.findIndex((item) => item.id === currentId)
  if (currentIndex !== undefined && items?.[currentIndex]) {
    items[currentIndex].myRole = payload
  }
  return {
    ...state,
    items,
  }
}

export const updateMemberListReducer: CaseReducer<
  Team,
  PayloadAction<MemberInfo[]>
> = (state, action) => {
  const { payload } = action
  if (!payload) return

  return {
    ...state,
    memberList: payload,
  }
}
