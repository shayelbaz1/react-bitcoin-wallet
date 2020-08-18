import React, { Component } from 'react'

export class ContactFilter extends Component {
    state = {
        name: '',
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter({ ...this.state })
        })
    }

    render() {
        const { name } = this.state
        return (
            <div>
                <input name="name" type="text" value={name} placeholder="Search" onChange={this.handleChange} />
            </div>
        )
    }
}
