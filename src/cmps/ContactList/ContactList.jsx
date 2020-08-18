import React, { Component } from 'react'
import ContactPreview from '../ContactPreview/ContactPreview'
import { ContactFilter } from '../ContactFilter/ContactFilter'

export default class ContactList extends Component {

    render() {
        const { contacts } = this.props
        return (
            <div>
                <h1>Contact List</h1>
                <ContactFilter onChangeFilter={this.props.onChangeFilter} />
                {contacts.map(contact =>
                    <ContactPreview key={contact._id} contact={contact} />)}
            </div>
        )
    }
}
