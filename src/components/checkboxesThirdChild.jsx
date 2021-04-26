import React, { Component } from "react";

class checkboxesThirdChild extends Component {
    state = {
        item: this.props.item,
    };

    render() {
        return (
            <div
                className={this.state.item.item_type_id}
                id="checkboxThirdChild"
            >
                <label>
                    <input type="checkbox" />
                    {this.props.item.name}
                </label>
            </div>
        );
    }
}
export default checkboxesThirdChild;
