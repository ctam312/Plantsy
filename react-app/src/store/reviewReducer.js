
const GET_REVIEWS_PLANT = 'reviews/getPlantReviews';
const CREATE_REVIEW_PLANT = 'reviews/createPlantReview';
const UPDATE_REVIEW_PLANT = 'reviews/updatePlantReview'
const DELETE_REVIEW = 'reviews/deleteUserReview';


// Action Creators
const loadReviewsForPlant = (plantReviews) => ({
    type: GET_REVIEWS_PLANT,
    plantReviews
});

const createReviewForPlant = (review) => ({
    type: CREATE_REVIEW_PLANT,
    review
})

const updateReviewForPlant = (review) => ({
    type: UPDATE_REVIEW_PLANT,
    review
})

const deleteReviewForPlant = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


export const loadPlantReviewsThunk = (plantId) => async dispatch => {
    const response = await fetch(`/api/plants/${plantId}/reviews`)

    if (response.ok) {
        const plantReviews = await response.json();
        dispatch(loadReviewsForPlant(plantReviews))
        return plantReviews
    }
}

export const createPlantReviewThunk = (reviewDetails, plantId) => async dispatch => {
    const response = await fetch(`/api/plants/${plantId}/reviews`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reviewDetails)
    });

    if (response.ok) {
        const review = await response.json()
        await dispatch(createReviewForPlant(review))
        return review
    }
}

export const updateReviewForPlantThunk = (reviewDetails, reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reviewDetails)
    })

    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReviewForPlant(updatedReview))
        return updatedReview
    }
}

export const deleteReviewForPlantThunk = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        await dispatch(deleteReviewForPlant(reviewId))
    }

    return response
}

// review
// plant = {
//     1: {review1: {review,
//          user :{userdata},
//         reviewimages: {reviewimage: url},
//     2: {review2: {review,
//         user :{userdata},
//         reviewimages: {reviewimage: url}
//     } }

const initialState = {plant: {}}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_PLANT: {
            const newState = {}
            action.plantReviews.reviews.forEach(review => {
                newState[review.id] = review
            })
        }
        // case CREATE_REVIEW_PLANT: {
        // }
        // case UPDATE_REVIEW_PLANT: {

        // }
        // case DELETE_REVIEW: {

        // }
        default: {
            return state
        }
    }
}

export default reviewReducer;
