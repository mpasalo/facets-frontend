import React, { Component } from "react";
import { DeleteOutlined } from "@ant-design/icons";

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
                <input
                    type="checkbox"
                    onChange={() =>
                        this.props.toggleThirdChildCheckbox(this.state.item.id)
                    }
                    checked={this.props.checked}
                />
                <b>{this.props.item.name}</b> -
                <button
                    onClick={() =>
                        this.props.deleteThirdChildCategory(this.state.item.id)
                    }
                    className="btn btn-sm btn-danger"
                >
                    <DeleteOutlined />
                </button>
            </div>
        );
    }
}
export default checkboxesThirdChild;
