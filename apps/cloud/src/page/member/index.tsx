import { MemberListPage } from "@illa-public/member-page"
import { teamActions } from "@illa-public/user-data"
import { FC, Suspense, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Await, useLoaderData, useNavigate } from "react-router-dom"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { MemberListLoaderData, MemberProps } from "@/page/member/interface"

export const Member: FC<MemberProps> = () => {
  const data = useLoaderData() as MemberListLoaderData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    data.memberList.then((memberList) => {
      dispatch(teamActions.updateMemberListReducer(memberList))
    })
  }, [data, dispatch])

  const handleAfterLeaveTeam = () => {
    navigate("/workspace", { replace: true })
    dispatch(teamActions.deleteTeamInfoReducer())
  }

  return (
    <Suspense fallback={<FullSectionLoading />}>
      <Await resolve={data.memberList}>
        {() => <MemberListPage afterLeaveTeam={handleAfterLeaveTeam} />}
      </Await>
    </Suspense>
  )
}

Member.displayName = "Member"

const WithReportMember = () => {
  return <Member />
}

export default WithReportMember
