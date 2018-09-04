import { playersArray } from '../index.js'

export default function getPlayerByID(id) {
    for (let i = playersArray.length - 1; i >= 0; i--) {
        if (playersArray[i].playerId === id) {
            return playersArray[i];
        }
    }
};

