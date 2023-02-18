
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

export const createPlantReviewThunk = (reviewDetails, myPlant, revImage) => async dispatch => {
    const response = await fetch(`/api/plants/${myPlant.id}/reviews`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reviewDetails)
    });

    if (response.ok) {
        const review = await response.json()
        if (revImage.url) {
            const response2 = await fetch(`/api/reviews/${review.id}/images`, {
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    url: revImage.url,
                    review_id: review.id
                })
            })
            if (response2.ok) {
                const reviewImageData = await response2.json()
                review.review_image.push(reviewImageData)
                await dispatch(createReviewForPlant(review))
                return null
            }
        } else {
            await dispatch(createReviewForPlant(review))
            delete review.review_image
            return null
        }

        // console.log('rev image from thunk ============ ', revImage.url)
        // if (!revImage.url) {
        //     await dispatch(createReviewForPlant(review))
        //     // review.review_image.push(null)
        //     return review
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const updateReviewForPlantThunk = (reviewDetails, review ) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reviewDetails)
    })

    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReviewForPlant(updatedReview))
        return null
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
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
            const getReviews = {}
            action.plantReviews.forEach(review => {
                getReviews[review.id] = review
            })
            return getReviews
        }
        case CREATE_REVIEW_PLANT: {
            const createReviews = {...state}
            createReviews[parseInt(action.review.id)] = action.review
            return createReviews
        }
        case UPDATE_REVIEW_PLANT: {
            const updateReviews = {...state}
            updateReviews[parseInt(action.review.id)] = action.review
            return updateReviews
        }
        case DELETE_REVIEW: {
            const removeReview = {...state}
            delete removeReview[action.reviewId]
            return removeReview
        }
        default: {
            return state
        }
    }
}

export default reviewReducer;
