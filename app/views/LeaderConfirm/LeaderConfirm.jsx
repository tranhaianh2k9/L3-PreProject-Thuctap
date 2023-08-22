import React from 'react'
import GeneralComponent from '../Component/GeneralComponent/GeneralComponent'
import { STATUS_EMPLOYEE } from 'app/Constants/ListStatus'

const LeaderConfirm = () => {
  return (
    <GeneralComponent status={STATUS_EMPLOYEE.DA_KET_THUC.CODE} decision={false}></GeneralComponent>
  )
}

export default LeaderConfirm