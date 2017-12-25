import React from 'react';

class Loading extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="loading">
                <div className="block">
                    <h3 className="point">Loading</h3>
                </div>
            </div>
        )
    }
}

export default Loading;