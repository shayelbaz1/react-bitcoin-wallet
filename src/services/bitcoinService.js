import axios from 'axios'
import { storageService } from './storageService.js'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

async function getRate() {
    const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    return res.data
}

async function getMarketPrice(timestamp='30days') {
    let data = storageService.load('getMarketPrice'+timestamp)
    if (!data) {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=${timestamp}&format=json&cors=true`)
        storageService.store('getMarketPrice'+timestamp, res.data)
        data = res.data
    }
    return data
}

function getConfirmedTransactions() {
    
}