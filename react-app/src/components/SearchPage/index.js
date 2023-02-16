import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchPage = () => {
  const history = useHistory()
  const searchedPlants = useSelector(state => state.search)
  const searchedPlantsArr = Object.values(searchedPlants)
  console.log('from searchPage ', searchedPlantsArr[0])



  let plantCards;

  // if (searchedPlantsArr.length === 0 ) {
  //   plantCards = (<div>No plants match your search query</div>)
  // } else {
    // plantCards = (
      // searchedPlantsArr.map(plant => {
      //   <div
      //   key={plant.id}
      //   className="plant-card"
      //   onClick={() => history.push(`/plants/${plant.id}`)}
      //   >
      //     <div className="plants-card-wrapper">
      //       <img
      //         className="plants-image"
      //         src={plant.preview_image_url}
      //         alt={`NO IMAGE AVAILABLE`}
      //         />
      //       <div className="plant-price">
      //         <span className="price">${plant.price}&nbsp;</span>
      //       </div>
      //     </div>

      //     <div className="plants-details-wrapper">
      //         <div className="plant-details">
      //             {/* <p className="name">{plant.name}</p> */}
      //         </div>
      //     </div>
      //   </div>
      // })
    // )
  // }
  // console.log('plant cards', plantCards)



  return (
    <div>
      <div>
        {searchedPlantsArr[0]?.name}
      </div>
      <div>
        <img src={searchedPlantsArr[0]?.preview_image_url}/>
      </div>
    </div>
  )
  };


export default SearchPage;
