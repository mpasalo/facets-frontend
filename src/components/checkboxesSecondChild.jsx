import React, { Component } from "react";
import { DeleteOutlined } from "@ant-design/icons";

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
                        checked={this.props.checked}
                        onChange={() =>
                            this.props.toggleSecondChildCheckbox(
                                this.state.type.id
                            )
                        }
                    />
                    <b>{this.state.type.name}</b>
                    -
                    <input
                        type="checkbox"
                        onClick={this.props.checkAllSecondChildDescendants}
                    />{" "}
                    Select All
                    <button
                        onClick={() =>
                            this.props.deleteSecondChildCategory(
                                this.state.type.id
                            )
                        }
                        className="btn btn-sm btn-danger"
                    >
                        <DeleteOutlined />
                    </button>
                </label>
            </div>
        );
    }
}

export default checkboxesSecondChild;
