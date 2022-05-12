import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getCategories } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])

    const [game, setGame] = useState({
        title: "",
        description: "",
        designer: "",
        year_released: 0,
        number_of_players: 0,
        estimated_time_to_play: 0,
        age_recommendation: 0,
        categories: []
    })

    useEffect(() => {
        getCategories().then(categoriesData => setCategories(categoriesData))
    }, [])

    const changeGameState = (event) => {
        const newGame = Object.assign({}, game)
        if (event.target.name === "categories") {
            newGame.categories.push(parseInt(event.target.value))
        }
        else {
            newGame[event.target.name] = event.target.value
        }
        setGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register Your New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={game.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={game.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="number" name="year_released" required autoFocus className="form-control" 
                        value={game.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control" 
                        value={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimated_time_to_play">Estimated Time to Play: </label>
                    <input type="number" name="estimated_time_to_play" required autoFocus className="form-control" 
                        value={game.estimated_time_to_play}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_recommendation">Age Recommendation: </label>
                    <input type="number" name="age_recommendation" required autoFocus className="form-control"
                        value={game.age_recommendation}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Categories: </label>
                    <select name="categories"
                        proptype="int"
                        onChange={changeGameState}>
                        <option value="0">Select a Category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const createdGame = {
                        title: game.title,
                        description: game.description,
                        designer: game.designer,
                        year_released: parseInt(game.year_released),
                        number_of_players: parseInt(game.number_of_players),
                        estimated_time_to_play: parseInt(game.estimated_time_to_play),
                        age_recommendation: parseInt(game.age_recommendation),
                        categories: game.categories
                    }

                    // Send POST request to your API
                    createGame(createdGame)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}