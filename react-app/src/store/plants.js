const LOAD_ALL_PLANTS = 'plants/LOAD_ALL_PLANTS';
const LOAD_PLANT = 'plants/LOAD_PLANT';
const CREATE_PLANT = 'plants/CREATE_PLANT';
const EDIT_PLANT = 'plants/EDIT_PLANT';
const DELETE_PLANT = 'plants/DELETE_PLANT';

// Action creators
export const load_all_plants_ac = (plants) => ({
	type: LOAD_ALL_PLANTS,
    plants
});

export const load_plant_ac = (plant) => ({
	type: LOAD_PLANT,
    plant
});

export const create_plant_ac = (newPlant) => ({
    type: CREATE_PLANT,
    newPlant
})

export const edit_plant_ac = (plant) => ({
    type: EDIT_PLANT,
    plant
})

export const delete_plant_ac = (plantId) => ({
	type: DELETE_PLANT,
    plantId
});

// Thunks
export const getAllPlantsThunk = () => async (dispatch) => {
    const res = await fetch('/api/plants')
    if (res.ok) {
        const plants = await res.json()
        dispatch(load_all_plants_ac(plants))
        return plants
    }
    return res
}

export const getPlantDetailsThunk = (plantId) => async (dispatch) => {
    const res = await fetch(`/api/plants/${plantId}`)
    if (res.ok) {
        const plant = await res.json()
        dispatch(load_plant_ac(plant))
        return plant
    }
    return res
}

export const createPlantThunk = (plant) => async (dispatch) => {
    const res = await fetch('/api/plants/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(plant),
    });
    if (res.ok) {
        const newPlant = await res.json();
        dispatch(create_plant_ac(newPlant));
        console.log(newPlant);
        return newPlant;

    }
    return res;
}

export const editPlantThunk = (editedPlant, plantNeed) => async (dispatch) => {
    const res = await fetch(`/api/plants/${plantNeed.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(editedPlant),
    });
    if (res.ok) {
        const editedPlantnew = await res.json();
        dispatch(edit_plant_ac(editedPlantnew));
        return editedPlantnew;
    }
    return res;
}

export const deletePlantThunk = (plantId) => async (dispatch) => {
    const res = await fetch(`/api/plants/${plantId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const deletedPlant = await res.json()
        dispatch(delete_plant_ac(plantId))
        return deletedPlant
    }
    return res
}

// Reducers
const initialState = {
    allPlants: {},
    singlePlant: {},
};

export default function plantsReducer(state = initialState, action){
    switch (action.type) {

        case LOAD_ALL_PLANTS: {
            console.log('allPlants', action.allPlants)
            const newState = { allPlants: {}, singlePlant: {} }
            // console.log(newState)
            action.plants.allPlants.forEach(plant => {
                newState.allPlants[plant.id] = plant
            })
            return newState
        }

        case LOAD_PLANT: {
            const newState = { ...state, singlePlant: {} }
            newState.singlePlant = action.plant
            return newState
        }

        case CREATE_PLANT: {
            const newState = { ...state, singlePlant:{} }
            newState.allPlants[action.newPlant.id] = action.newPlant
            return newState
        }

        case EDIT_PLANT: {
            const newState = { ...state, singlePlant: {} }
            newState.allPlants[action.plantId] = action.plant
            newState.singlePlant = action.plant
            return newState
        }

        case DELETE_PLANT: {
            const newState = { ...state, singlePlant: {} }
            delete newState.allPlants[action.plantId]
            return newState
        }

        default:
            return state
    }
}
