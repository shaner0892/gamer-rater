import React from "react"
import { Route } from "react-router-dom"
import { EditGameForm } from "./game/EditGameForm.js"
import { GameDetails } from "./game/GameDetails.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { ReviewForm } from "./game/ReviewForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route path="/game-details/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route path="/games/new">
                <GameForm />
            </Route>
            <Route path="/game/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
            <Route path="/edit-game/:gameId(\d+)">
                <EditGameForm />
            </Route>
        </main>
    </>
}