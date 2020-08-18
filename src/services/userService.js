import { storageService } from './storageService.js'



const USER = 'user'
const gDefaultUser = { name: "Ochoa Hyde", coins: 100, moves:[]}
var gUser = _loadUser()

function getUser() {
    return Promise.resolve(gUser) 
}

function _loadUser() {
    let user = storageService.load(USER)
    if (!user) user = gDefaultUser
    storageService.store(USER, user)
    return user
}

export const userService = {
    getUser
}