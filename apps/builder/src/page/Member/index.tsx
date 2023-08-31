import MemberPage from "@illa-public/member-page"
import { teamActions } from "@illa-public/user-data"
import { FC, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Await, useLoaderData } from "react-router-dom"
import { FullPageLoading } from "@/components/FullPageLoading"
import { MemberInfo, MemberProps } from "@/page/Member/interface"
import { memberPageContainerStyle } from "./style"

export interface MemberListLoaderData {
  memberList: Promise<MemberInfo[]>
}

export const Member: FC<MemberProps> = () => {
  const data = useLoaderData() as MemberListLoaderData

  const dispatch = useDispatch()

  useEffect(() => {
    data.memberList.then((memberList) => {
      dispatch(teamActions.updateMemberListReducer(memberList))
    })
  }, [data, dispatch])

  return (
    <Suspense fallback={<FullPageLoading />}>
      <Await resolve={data.memberList}>
        {() => (
          <div css={memberPageContainerStyle}>
            <MemberPage />
          </div>
        )}
      </Await>
    </Suspense>
  )
}

export default Member

Member.displayName = "Member"
