import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getCategories, getCurrentGame, putGame } from './GameManager.js'


export const EditGameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [game, setGame] = useState({})
    const {gameId} = useParams()

    useEffect(() => {
        getCategories().then(categoriesData => setCategories(categoriesData))
    }, [])

    useEffect(
        () => {
            getCurrentGame(parseInt(gameId)).then((gameData) => {
                    setGame(gameData)
            })
        },
        []
    )

    const editGameState = (event) => {
        const editedGame = Object.assign({}, game)
        if (event.target.name === "categories") {
            editedGame.categories.push(parseInt(event.target.value))
        }
        else {
            editedGame[event.target.name] = event.target.value
        }
        setGame(editedGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit Your Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={game.description}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={game.designer}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="number" name="year_released" required autoFocus className="form-control" 
                        value={game.year_released}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control" 
                        value={game.number_of_players}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimated_time_to_play">Estimated Time to Play: </label>
                    <input type="number" name="estimated_time_to_play" required autoFocus className="form-control" 
                        value={game.estimated_time_to_play}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_recommendation">Age Recommendation: </label>
                    <input type="number" name="age_recommendation" required autoFocus className="form-control"
                        value={game.age_recommendation}
                        onChange={editGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Categories: </label><br></br>
                    {
                        categories.map(
                            c => {
                                return <><label> {c.name} </label>
                                <input type="checkbox" id={c.id} name="categories" checked={c.id === game.categories?.id ? "checked" : ""} required autoFocus className="form-control" onChange={editGameState}/>
                                
                                    {/* { 
                                        if (c.id === game.categories?.id) {
                                            <input type="checkbox" id={c.id} checked name="categories" required autoFocus className="form-control" onChange={editGameState}/>
                                        } else {
                                            <input type="checkbox" id={c.id} name="categories" required autoFocus className="form-control" onChange={editGameState}/>
                                        }
                                    } */}
                                </>
                            }
                        )
                    }
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        title: game.title,
                        description: game.description,
                        designer: game.designer,
                        year_released: parseInt(game.year_released),
                        number_of_players: parseInt(game.number_of_players),
                        estimated_time_to_play: parseInt(game.estimated_time_to_play),
                        age_recommendation: parseInt(game.age_recommendation),
                        categories: game.categories
                    }

                    // Send PUT request to your API
                    putGame(updatedGame, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}