import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPlantsThunk } from "../../store/plants";
import "./AllPlants.css"

function AllPlants() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllPlantsThunk());
  }, [dispatch]);

  const allPlants = useSelector((state) => state.plants.allPlants);
  const allPlantsArr = Object.values(allPlants);
  if (!allPlantsArr) return null;

  return (
    <>
    <div className="under-nav-header">
      <div className="welcome-header">Welcome to Plantsy!</div>
    </div>
    <div className= "circle-box-container">
      <span className="front-page-circle">
        P
      </span>
      <span className="front-page-circle">
        L
      </span>
      <span className="front-page-circle">
        A
      </span>
      <span className="front-page-circle">
        N
      </span >
      <span className="front-page-circle">
        T
      </span>
      <span className="front-page-circle">
        S
      </span>
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
    </>
  );
}

export default AllPlants;
