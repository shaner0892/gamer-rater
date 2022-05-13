import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { createReview } from './GameManager.js'


export const ReviewForm = () => {
    const history = useHistory()
    const {gameId} = useParams()
    const [review, setReview] = useState({
        review: "",
        game: gameId
    })

    const changeReviewState = (event) => {
        const newReview = Object.assign({}, review)
        newReview[event.target.name] = event.target.value
        setReview(newReview)
    }

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">Write a Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={review.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const createdReview = {
                        review: review.review,
                        game: gameId
                    }

                    // Send POST request to your API
                    createReview(createdReview)
                        .then(() => history.push(`/game-details/${gameId}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}