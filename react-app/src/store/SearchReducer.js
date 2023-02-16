
const LOAD_SEARCH = 'search/LOAD_SEARCH'

export const loadSearch = (search) => ({
  type: LOAD_SEARCH,
  search
})


const initialState = {}

export default function searchReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_SEARCH: {
      const newState = {}
      action.search.forEach(plant =>
        newState[plant.id] = plant
        )
      return newState
    }
    default:
      return state
  }
}
