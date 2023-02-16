import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPlantsThunk } from "../../store/plants";
import "./AllPlants.css"

function AllPlants() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  console.log(user)

  useEffect(() => {
    dispatch(getAllPlantsThunk());
  }, [dispatch]);

  const allPlants = useSelector((state) => state.plants.allPlants);
  const allPlantsArr = Object.values(allPlants);
  if (!allPlantsArr) return null;

  let userLoggedIn;

  if (user !== null) {
    userLoggedIn = (
      <div className="welcome-header">Welcome back, <span className="underlined-name">{user?.username}</span>!</div>
    )
  } else {
    userLoggedIn = (
      <div className="welcome-header">Pick out your favorite plant!</div>
    )
  }


  return (
    <div className="all-plants-container">
      <div className="under-nav-header">
        {userLoggedIn}
      </div>
      <div className= "circle-box-container">
        <span className="front-page-circle first-pic"></span>
        <span className="front-page-circle second-pic"></span>
        <span className="front-page-circle third-pic"></span>
        <span className="front-page-circle fourth-pic"></span >
        <span className="front-page-circle fifth-pic"></span>
        <span className="front-page-circle sixth-pic"></span>
      </div>
      <div className="plants-wrapper">
        <div className="all-plants">
          {allPlantsArr.map((plant) => (
            <div
            key={plant.id}
            className="plant-card"
            onClick={() => history.push(`/plants/${plant.id}`)}
            >
              <div className="plants-card-wrapper">
                <img
                  className="plants-image"
                  src={plant.preview_image_url}
                  alt={`NO IMAGE AVAILABLE`}
                  />
                <div className="plant-price">
                  <span className="price">${plant.price.toFixed(2)}&nbsp;</span>
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
    </div>
  );
}

export default AllPlants;
