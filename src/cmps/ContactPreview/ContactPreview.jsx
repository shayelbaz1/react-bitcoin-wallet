import React, { Component } from 'react'

export default class ContactPreview extends Component {
    render() {
        const { contact } = this.props
        return (
            <div>
                <img src={`https://robohash.org/${contact._id}`} alt="" />
                <p>{contact._id}</p>
                <p>{contact.name}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <hr />
            </div>
        )
    }
}
