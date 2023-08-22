import React from 'react'
import { Breadcrumb } from "egret";
const BreadcrumbComponent = ({manage, title}) => {
  return (
    <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: manage, path: "home" },
            { name: title },
          ]}
        />
      </div>
  )
}

export default BreadcrumbComponent