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
                    <input
                        type="checkbox"
                        onChange={() =>
                            this.props.toggleThirdChildCheckbox(
                                this.state.item.id
                            )
                        }
                        checked={this.props.checked}
                    />
                    <b>{this.props.item.name}</b>
                </label>
            </div>
        );
    }
}
export default checkboxesThirdChild;
