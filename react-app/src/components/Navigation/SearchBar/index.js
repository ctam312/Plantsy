import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSearch } from "../../../store/SearchReducer";
import { useDispatch } from "react-redux";


const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchInput, setSearchInput] = useState('')
  const allPlants = useSelector(state => state.plants.allPlants)
  const allPlantsArray = Object.values(allPlants)
  // const allPlantsArray2 = Object.values(allPlantsArray[0])
  console.log('allpantsarray ======>', allPlantsArray)

  const searchedPlants = allPlantsArray.filter(plant => {
    if (searchInput == '') {
      return
    } else {
      if (plant.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return plant.name
      }
    }
  })



  const slicedSearchedPlants = searchedPlants.slice(0,10)


  // console.log('searchInput',searchInput)
  console.log('searched plants', searchedPlants)

  // console.log(searchInput)

  const handleSearch = (e) => {
    e.preventDefault()
    // console.log(searchInput)
    dispatch(loadSearch(searchedPlants))
    history.push('/search')
    // setSearchInput('')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <input type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
          <button>Search</button>
        </form>
      </div>
      <div>
        <ul>
          {slicedSearchedPlants.map(plant => <li>{plant.name}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;
