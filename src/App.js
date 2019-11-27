import React, { useReducer } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import config from 'bigcorp/config'
import { Config, Employees } from 'bigcorp/src/contexts'
import { Employees as EmployeesReducer } from 'bigcorp/src/reducers'
import { Organization } from 'bigcorp/src/components'
import { theme } from 'bigcorp/src/utils'

const Style = createGlobalStyle`
  body {
    background-color: ${theme.body};
  }
`

const App = () => {
  const [employees, dispatchEmployee] = useReducer(EmployeesReducer, {})

  return (
    <Config.Provider value={config}>
      <Employees.Provider value={{ dispatchEmployee, employees }}>
        <ThemeProvider theme={theme}>
          <Style />
          <Organization />
        </ThemeProvider>
      </Employees.Provider>
    </Config.Provider>
  )
}

export default App
