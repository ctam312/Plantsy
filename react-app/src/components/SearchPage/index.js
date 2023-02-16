import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './searchPage.css'

const SearchPage = () => {
  const history = useHistory()
  const [searchedPlantsArr, setSearchedPlantsArr] = useState([]);
  const reduxSearch = useSelector((state) => state.search)

  useEffect(() => {
    const searchData = localStorage.getItem('searchData')
    if (searchData) {
      setSearchedPlantsArr(JSON.parse(searchData));
    }
  }, [reduxSearch])

  return (
    <div>
      {searchedPlantsArr.length ? <div >
        <div className="search-plants-container">
          {searchedPlantsArr.map((plant) => (
            <div
            key={plant.id}
            className="search-plant-card"
            onClick={() => history.push(`/plants/${plant.id}`)}
            >
              <div className="search-plant-top-card-container">
                <img
                  className="search-plant-image"
                  src={plant.preview_image_url}
                  alt=""/>
                </div>
                <div className="search-plant-card-bottom-container">
                  <div className='search-plant-name'>{plant.name}</div>
                  {/* <div>plant avg rating goes here</div> */}
                  <div className='search-plant-price'>{`$${plant.price}`}</div>
                </div>
            </div>
          ))}
        </div>
      </div>
        :
        <>
          <h1>We couldn't find any results for your search</h1>
          <div>Try searching for something else instead?</div>
        </>
        }
    </div>
  )
  };


export default SearchPage;
