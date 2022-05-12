import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { GameList } from "./GameList.js"
import { getCategories, getCurrentGame, getGameCategories } from "./GameManager.js"

export const GameDetails = () => {
    const [game, setGame] = useState({categories: []})
    const [categories, setCategories] = useState([])
    const [gameCategories, setGameCategories] = useState([])
    const [categoryState, setCategoryState] = useState([])
    const {gameId} = useParams()

    useEffect(
        () => {
            getCurrentGame(gameId).then((gameData) => {
                setGame(gameData)
            })
            // .then(() => {
            //     getCategories().then((categoryData) => {
            //         setCategories(categoryData)
            //     })
            // })
            // .then(() => {
            //     getGameCategories().then((gameCategoryData) => {
            //         setGameCategories(gameCategoryData)
            //     })
            // })
            // .then(() => {
            //     let currentGameCategories = gameCategories.filter((gameCategory) => {
            //         return gameCategory.game?.id === game.id;
            //     })
            //     let currentCategories = []
            //     for (const gameCategory of currentGameCategories) {
            //         let foundCategory = categories.filter((category) => {
            //             return category.id === gameCategory.category
            //         })
            //         currentCategories.push(foundCategory)
            //     }
            //     setCategoryState(currentCategories)
            // })
        },
        []
    )

    return (
        <>
        
            <section key={`game--${game.id}`} className="game">
                <div className="game__title">Title: {game.title}</div>
                <div className="game__title">Description: {game.description}</div>
                <div className="game__title">Designer: {game.designer}</div>
                <div className="game__title">Year Released: {game.year_released}</div>
                <div className="game__title">Number of Players: {game.number_of_players}</div>
                <div className="game__title">Estimated Time to Play: {game.estimated_time_to_play} minutes</div>
                <div className="game__title">Age Recommendation: {game.age_recommendation}+</div>
                <div className="game__title">Categories: {game.categories.map(category => <p>{category.name}</p>)}</div>
            </section>
        </>
    )
}