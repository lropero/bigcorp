import React, { useContext, useEffect, useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import { withTheme } from 'styled-components'

import { Card } from 'bigcorp/src/components'
import { Employees } from 'bigcorp/src/contexts'
import { useApi } from 'bigcorp/src/hooks'

const Organization = ({ theme }) => {
  const api = useApi()
  const [ceoId, setCeoId] = useState(null)
  const { dispatchEmployee, employees } = useContext(Employees)

  useEffect(() => {
    const fetch = async () => {
      const ceo = await api.ceo()
      if (ceo.id) {
        dispatchEmployee({ payload: { employee: ceo }, type: 'ADD' })
        setCeoId(ceo.id)
      }
    }
    fetch()
  }, [])

  const generateGetStaff = (id) => async () => {
    if (!Array.isArray(employees[id].staff)) { // Avoid unnecessary API calls
      const staff = await api.staff(id)
      for (const employee of staff) {
        dispatchEmployee({ payload: { employee }, type: 'ADD' })
      }
      dispatchEmployee({ payload: { ids: staff.map((employee) => employee.id), managerId: id }, type: 'ADD_STAFF' })
    }
  }

  const renderStaff = (staff) => {
    return staff.length ? (
      staff.map((id) => (
        <TreeNode key={id} label={<Card employee={employees[id]} getStaff={generateGetStaff(id)} />}>
          {renderStaff(employees[id].staff || [])}
        </TreeNode>
      ))
    ) : null
  }

  const renderTree = () => {
    return ceoId ? (
      <Tree label={<Card employee={employees[ceoId]} getStaff={generateGetStaff(ceoId)} />} lineBorderRadius='12px' lineColor={theme.line} lineWidth='2px'>
        {renderStaff(employees[ceoId].staff || [])}
      </Tree>
    ) : null
  }

  return renderTree()
}

export default withTheme(Organization)
