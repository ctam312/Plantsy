
const GET_REVIEWS_PLANT = 'reviews/getPlantReviews';
const CREATE_REVIEW_PLANT = 'reviews/createPlantReview';
const UPDATE_REVIEW_PLANT = 'reviews/updatePlantReview'
const DELETE_REVIEW = 'reviews/deleteUserReview';

// Action Creators
const loadReviewsForPlant = (reviews) => ({
    type: GET_REVIEWS_PLANT,
    reviews
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

