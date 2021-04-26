import React, { Component } from "react";

class checkboxesSecondChild extends Component {
    state = {
        type: this.props.type,
    };

    render() {
        return (
            <div key={this.state.type.id}>
                <label>
                    <input
                        type="checkbox"
                        id="checkboxSecondChild"
                        onChange={() =>
                            this.props.toggleThirdChildVisibility(
                                this.state.type.id
                            )
                        }
                    />
                    {this.state.type.name}
                </label>
            </div>
        );
    }
}

export default checkboxesSecondChild;
