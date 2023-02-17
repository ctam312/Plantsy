import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadAllSearchThunk } from "../../../store/SearchReducer";
import { useDispatch } from "react-redux";
import './searchbar.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchInput, setSearchInput] = useState('')
  const allPlants = useSelector(state => state.plants.allPlants)
  const allPlantsArray = Object.values(allPlants)

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

  const handleSearch = async (e) => {
    e.preventDefault()

      return await dispatch(loadAllSearchThunk(searchInput))
      .then(() => localStorage.setItem('searchData', JSON.stringify(searchedPlants)))
      .then(() => history.push(`/search/${searchInput}`))
      .then(() => setSearchInput(''))
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <div className='search-bar-container'>
            <input className='search-bar' type='text' value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
            <button className='search-icon' type="submit"><i className="fa fa-search"></i></button>
          </div>
        </form>
      </div>
      <div>
        <ul>
        { slicedSearchedPlants.map(plant =>
          <li className='search-list-item'
          onClick={() => {
          history.push(`/plants/${plant.id}`);
          setSearchInput('');
          }}>
          {plant.name}
          </li>
)}
        </ul>
      </div>
    </div>
  )
}

export default SearchBar;
