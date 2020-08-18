import React, { Component } from 'react'
import { userService } from '../../services/userService'
import { contactService } from '../../services/contactService'
import { bitcoinService } from '../../services/bitcoinService'
import ContactList from '../../cmps/ContactList/ContactList'
import ChartCMP from '../../cmps/Chart/Chart'

export class BitcoinApp extends Component {
    state = {
        user: null,
        rate: 0,
        contacts: null,
        filterBy: null,
    }
    componentDidMount() {
        this.loadUser()
        this.loadRate()
        this.loadContacts()
    }
    async loadContacts() {
        const contacts = await contactService.getContacts(this.state.filterBy)
        this.setState({ contacts })
    }

    async loadUser() {
        const user = await userService.getUser()
        this.setState({ user })
    }

    onChangeFilter = (filterBy) => {
        console.log('filterBy:', filterBy)
        this.setState({ filterBy }, this.loadContacts)
    }

    async loadRate() {
        const rate = await bitcoinService.getRate()
        this.setState({ rate })
    }

    render() {
        const { user, rate, contacts } = this.state
        if (!user || !rate) return <p>Loading...</p>
        return (
            <div>
                <h1>Bitcoin Wallet</h1>
                <img src={`https://robohash.org/${user.name}`} alt="" />
                <p>{user.name}</p>
                <p>Coins: {user.coins}</p>
                <p>Moves: {user.moves}</p>
                <p>BTC: {rate}</p>
                <hr />
                <ChartCMP />
                <ContactList contacts={contacts} onChangeFilter={this.onChangeFilter} />
            </div>
        )
    }
}
