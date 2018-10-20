import ErrorResponse from "./ErrorResponse";
import GameModel from "./GameModel";

interface GetGamesResponse extends ErrorResponse {
    games: GameModel[];
}
export default GetGamesResponse;
