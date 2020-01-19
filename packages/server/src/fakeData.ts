import GameModel from "./models/GameModel";
import PlayerIdNotFoundError from "./PlayerIdNotFoundError";

export function getGamesForPlayerId(playerId: string): GameModel[] {
    if (!(playerId in gameIdsForPlayerId)) {
        throw new PlayerIdNotFoundError(`Player ${playerId} not found!`);
    }
    const ids = gameIdsForPlayerId[playerId];
    return ids.map(id => gamesData[id]);
}

const gameIdsForPlayerId: {[key: string]: number[]} = {
    boolet37: [
        570, // Dota 2
        108710, // Alan Wake
        105600, // Terraria
        202750, // Alan Wake's American Nightmare
        292030, // The Witcher® 3: Wild Hunt
        373420 // Divinity: Original Sin - Enhanced Edition
    ],
    fvsk: [
        15100, // Assassin's Creed™: Director's Cut Edition
        39690, // ArcaniA
        108710, // Alan Wake
        202750 // Alan Wake's American Nightmare
    ],
    afarnsworth: [
        440, // Team Fortress 2
        108710, // Alan Wake
        292030 // The Witcher® 3: Wild Hunt
    ],
    gviruswastaken: [
        440, // Team Fortress 2
        570, // Dota 2
        730, // Counter-Strike: Global Offensive
        105600 // Terraria
    ]
};

const gamesData: {[key: string]: GameModel} = {
    440: {
        id: 440,
        name: "Team Fortress 2",
        icon: "e3f595a92552da3d664ad00277fad2107345f743",
        logo: "07385eb55b5ba974aebbe74d3c99626bda7920b8"
    },
    570: {
        id: 570,
        name: "Dota 2",
        icon: "0bbb630d63262dd66d2fdd0f7d37e8661a410075",
        logo: "d4f836839254be08d8e9dd333ecc9a01782c26d2"
    },
    730: {
        id: 730,
        name: "Counter-Strike: Global Offensive",
        icon: "69f7ebe2735c366c65c0b33dae00e12dc40edbe4",
        logo: "d0595ff02f5c79fd19b06f4d6165c3fda2372820"
    },
    15100: {
        id: 15100,
        name: "Assassin's Creed™: Director's Cut Edition",
        icon: "cd8f7a795e34e16449f7ad8d8190dce521967917",
        logo: "5450218e6f8ea246272cddcb2ab9a453b0ca7ef5"
    },
    39690: {
        id: 39690,
        name: "ArcaniA",
        icon: "109554c6cb9ce581b57db529fb33af0a738adcf0",
        logo: "ff47f03cb1da4dca9a4c2f0274cf434a33dd8cca"
    },
    105600: {
        id: 105600,
        name: "Terraria",
        icon: "858961e95fbf869f136e1770d586e0caefd4cfac",
        logo: "783399da7d865b7b5b1560891b1e9463345e8fa9"
    },
    108710: {
        id: 108710,
        name: "Alan Wake",
        icon: "ec7953511aaaf5a2c2093b872b5b43c6cab56462",
        logo: "0f9b6613ac50bf42639ed6a2e16e9b78e846ef0a"
    },
    202750: {
        id: 202750,
            name: "Alan Wake's American Nightmare",
            icon: "313aabf37ed0b521ad969d3fe21768d31300f1ca",
            logo: "d3593fa14e4ea8685dc6b1f71dbaa980c013ff02"
    },
    292030: {
        id: 292030,
        name: "The Witcher® 3: Wild Hunt",
        icon: "87118494c65a92e1ac4c9734ce91950c1d6fe9a5",
        logo: "2f22c2e5528b78662988dfcb0fc9aad372f01686"
    },
    373420: {
        id: 373420,
        name: "Divinity: Original Sin - Enhanced Edition",
        icon: "822ff912b2e464fbebbedf7a75ae1eb24921f16b",
        logo: "4e6d09ea2106beeb3ea6a481755a702f71987baf"
    }
};
