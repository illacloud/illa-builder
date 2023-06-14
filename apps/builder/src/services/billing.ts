import { cloudRequest } from "@/api/http"
import {
  SUBSCRIBE_PLAN,
  SUBSCRIPTION_CYCLE,
  SubscribeInfo,
} from "@/illa-public-component/MemberList/interface"

export enum CAPACITY_TYPE {
  LICENSE = 1, // 团队坐席
  DRIVE_VOLUME, // drive 容量
  DRIVE_TRAFFIC, // drive 流量
  POSTGRES_DATABASE_RECORD_VOLUME, // 数据库条目总数
}

export enum PurchaseItem {
  DRIVE_TRAFFIC_1GB = 1,
}

export interface LicenseSubscribeInfo extends SubscribeInfo {}

export interface DriveSubscribeInfo extends SubscribeInfo {
  volume: number // 存储容量, 单位为字节,
  balance: number // 存储容量剩余, 单位为字节
}

export interface TrafficSubscribeInfo {
  balance: number // 存储流量剩余, 单位为字节
}

export interface TeamSubscription {
  teamLicense: {
    current: LicenseSubscribeInfo
    next: LicenseSubscribeInfo
  }
  driveVolume: {
    current: DriveSubscribeInfo
    next: DriveSubscribeInfo
  }
  driveTraffic: TrafficSubscribeInfo
}

interface PortalURLResponse {
  url: string
}

interface SubscribeResponse {
  url: string
}

export const getPortalURL = async (returningURL: string) => {
  const { data } = await cloudRequest<PortalURLResponse>(
    {
      url: `/billing/getPortalURL`,
      method: "POST",
      data: { returningURL },
    },
    { needTeamID: true },
  )
  return data
}

export const getTeamSubscription = async () => {
  const { data } = await cloudRequest<TeamSubscription>(
    {
      url: `/billing`,
      method: "GET",
    },
    { needTeamID: true },
  )
  return data
}

export const purchase = async (requestData: {
  item: PurchaseItem
  quantity: number // 需要购买的物品数量, 比如 ITEM_DRIVE_TRAFFIC_1GB 购买4GB, 就填写4
  successRedirect: string // Success redirect URL
  cancelRedirect: string // Cancel redirect URL
}) => {
  return await cloudRequest<SubscribeResponse>(
    {
      url: `/billing/purchase`,
      method: "POST",
      data: requestData,
    },
    { needTeamID: true },
  )
}

export const subscribe = async (requestData: {
  plan: SUBSCRIBE_PLAN
  quantity: number // License quantity
  cycle: SUBSCRIPTION_CYCLE
  successRedirect: string // Success redirect URL
  cancelRedirect: string // Cancel redirect URL
}) => {
  return await cloudRequest<SubscribeResponse>(
    {
      url: `/billing/subscribe`,
      method: "POST",
      data: requestData,
    },
    { needTeamID: true },
  )
}

export const modifySubscribe = async (requestData: {
  plan: SUBSCRIBE_PLAN
  quantity: number // License quantity
  cycle: SUBSCRIPTION_CYCLE
}) => {
  return await cloudRequest(
    {
      url: `/billing/subscribe`,
      method: "PATCH",
      data: requestData,
    },
    { needTeamID: true },
  )
}

export const cancelSubscribe = async (plan: SUBSCRIBE_PLAN) => {
  return await cloudRequest(
    {
      url: `/billing/subscribe`,
      method: "DELETE",
      data: { plan },
    },
    { needTeamID: true },
  )
}
