import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCurrentGame } from "./GameManager.js"

export const GameDetails = () => {
    const [game, setGame] = useState({categories: [], reviews: []})
    const {gameId} = useParams()
    const history = useHistory()
    const ratingOptions = [1, 2, 3, 4, 5]

    useEffect(
        () => {
            getCurrentGame(gameId).then((gameData) => {
                setGame(gameData)
            })
        },
        []
    )

    return (
        <>

            <section key={`game--${game.id}`} className="game">
                <div className="game__title">Title: {game.title}</div>
                <div className="game__description">Description: {game.description}</div>
                <div className="game__designer">Designer: {game.designer}</div>
                <div className="game__year">Year Released: {game.year_released}</div>
                <div className="game__num_players">Number of Players: {game.number_of_players}</div>
                <div className="game__time">Estimated Time to Play: {game.estimated_time_to_play} minutes</div>
                <div className="game__age">Age Recommendation: {game.age_recommendation}+</div>
                <div className="game__categories">Categories: 
                    {
                        game.categories.map(category => <li>{category.name}</li>)
                    }
                </div>
                {/* <div className="avg__rating">Average Rating: {game.average_rating}</div> */}

                {/* add an onchange that saves it */}
                <div className="game__rating">Rate this game:
                    {
                        ratingOptions.map(r => {return <><input type="radio" name="rating" value={r}/><label>{r}</label></>})
                    }
                </div>
                <div className="game__rating">Reviews:
                    {
                        game.reviews.map(review => <li>{review.review}</li>)
                    }
                </div>
                <button id="btn" onClick={() => history.push(`/game/${game.id}/review`)}> Review Game </button><br></br>
                {
                    game.is_authorized ? <button id={game.id} onClick={() => history.push(`/edit-game/${game.id}`)}> Edit Game </button> : ""
                }
                
            </section>
        </>
    )
}