import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
      {searchedPlantsArr.length ? <div className="plants-wrapper">
        <div className="all-plants">
          {searchedPlantsArr.map((plant) => (
            <div
            key={plant.id}
            className="plant-card"
            onClick={() => history.push(`/plants/${plant.id}`)}
            >
              <div className="plants-card-wrapper">
                <img
                  className="plants-image"
                  src={plant.preview_image_url}
                  alt=""
                  />
                <div className="plant-price">
                  <span className="price">${plant.price}&nbsp;</span>
                </div>
              </div>

              <div className="plants-details-wrapper">
                  <div className="plant-details">
                      {/* <p className="name">{plant.name}</p> */}
                  </div>
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
