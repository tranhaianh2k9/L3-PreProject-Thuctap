import React from 'react'
import GeneralComponent from '../Component/GeneralComponent/GeneralComponent'
import { STATUS_OF_END_EMPLOYEE } from 'app/Constants/ListStatus'

const EndEmployees = () => {
  return (
    <GeneralComponent status={STATUS_OF_END_EMPLOYEE} decision={true} ></GeneralComponent>
  )
}

export default EndEmployees