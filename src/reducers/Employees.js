const Employees = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const { payload: { employee } } = action
      const { id, ...info } = employee
      return (!state[id] && Object.assign({}, state, { [id]: info })) || state
    }
    case 'ADD_STAFF': {
      const { payload: { ids, managerId } } = action
      return (state[managerId] && Object.assign({}, state, { [managerId]: Object.assign({}, state[managerId], { staff: [...new Set([...(state[managerId].staff || []), ...ids])] }) })) || state
    }
  }
}

export default Employees
