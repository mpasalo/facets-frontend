import React, { Component } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import CheckboxesThirdChild from "./checkboxesThirdChild";

class checkboxesSecondChild extends Component {
    state = {
        type: this.props.type,
    };

    render() {
        return (
            <div key={this.state.type.id}>
                <input
                    type="checkbox"
                    id="checkboxSecondChild"
                    checked={this.props.checked}
                    onChange={() =>
                        this.props.toggleSecondChildCheckbox(this.state.type.id)
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
                        this.props.deleteSecondChildCategory(this.state.type.id)
                    }
                    className="btn btn-sm btn-danger"
                >
                    <DeleteOutlined />
                </button>
                {this.state.type.is_checked &&
                    this.state.type.items.map((item) => (
                        <CheckboxesThirdChild
                            key={item.id}
                            deleteThirdChildCategory={
                                this.props.deleteThirdChildCategory
                            }
                            toggleThirdChildCheckbox={
                                this.props.toggleThirdChildCheckbox
                            }
                            checked={item.is_checked}
                            item={item}
                        />
                    ))}
            </div>
        );
    }
}

export default checkboxesSecondChild;
