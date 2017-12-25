import React from 'react';

class Select extends React.Component {

    constructor() {
        super();
        this.state = {
            optionList: [
                { value: 'currentlyReading', text: 'Currently Reading' },
                { value: 'wantToRead', text: 'Want to Read' },
                { value: 'read', text: 'Read' },
                { value: 'none', text: 'None' },
            ]
        }
    }

    render() {
        const target = this.props.target || 'currentlyReading';
        const listChange = this.props.listChange;
        const book = this.props.book;
        return (
            <select value={target} onChange={e=> listChange(e.target.value,book)}>
                <option disabled>Move to...</option>
                {
                    this.state.optionList.map((option) => <option key={option.value} value={option.value}>{option.text}</option>)
                }
            </select>
        )
    }
}

export default Select;