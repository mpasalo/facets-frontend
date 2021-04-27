import React, { Component } from "react";
import {
    getItems,
    deleteParent,
    restore,
    logOut,
    deleteFirstChild,
    getTrashedClassification,
    restoreClassification,
    deleteSecondChild,
} from "../functions";
import CheckboxesSecondChild from "./checkboxesSecondChild";
import CheckboxesThirdChild from "./checkboxesThirdChild";
import LogInModal from "./logInModal";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { LogoutOutlined, DeleteOutlined } from "@ant-design/icons";
import "../index.css";

class facets extends Component {
    state = {
        isAuthenticated: false,
        token: null,
        collection: [],
        logInModalVisiblity: false,
        isFirstChildVisible: false,
        isSecondChildVisible: false,
        isParentChecked: false,
        isFirstChildChecked: false,
        isSecondChildChecked: false,
        isThirdChildChecked: false,
        trashedClassification: [],
    };

    componentDidMount() {
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            this.authenticate(lsToken);
        } else {
            this.setState({
                logInModalVisiblity: true,
            });
        }
    }

    logOutUser = () => {
        logOut();
        this.setState({
            isAuthenticated: false,
            token: null,
        });

        localStorage.clear();
    };

    authenticate = (token) => {
        this.setState({
            isAuthenticated: true,
            token: token,
            logInModalVisiblity: false,
        });

        this.getAllItems();

        localStorage.setItem("token", token);
    };

    getAllItems = () => {
        getItems().then((data) => {
            this.setState({
                collection: [...data],
            });
        });
    };

    toggleSecondChildVisibility = () => {
        this.setState({
            isFirstChildChecked: !this.state.isFirstChildChecked,
            isSecondChildVisible: !this.state.isSecondChildVisible,
        });
    };

    toggleThirdChildVisibility = (id) => {
        this.setState({
            isSecondChildChecked: !this.state.isSecondChildChecked,
        });

        var x = document.getElementsByClassName(id);
        var i;
        for (i = 0; i < x.length; i++) {
            if (x[i].style.display === "block") {
                x[i].style.display = "none";
            } else {
                x[i].style.display = "block";
            }
        }
    };

    toggleAllChecked = () => {
        this.setState({
            isFirstChildChecked: !this.state.isFirstChildChecked,
            isSecondChildChecked: !this.state.isSecondChildChecked,
            isThirdChildChecked: !this.state.isThirdChildChecked,
        });
    };

    deleteParentCategory = (id) => {
        deleteParent(id).then(() => {
            this.getAllItems();
        });
    };

    deleteFirstChildCategory = (id) => {
        deleteFirstChild(id).then(() => {
            this.getAllItems();
        });

        getTrashedClassification(id).then((data) => {
            this.setState({
                trashedClassification: [...data],
            });
        });
    };

    deleteSecondChildCategory = (id) => {
        deleteSecondChild(id);

        let collection = this.state.collection;
        collection.forEach((gender) => {
            gender.item_classifications.forEach((classification) => {
                classification.types = classification.types.filter(
                    (type) => type.id !== id
                );
                classification.is_checked = !classification.is_checked;
            });
        });

        this.setState({ collection: collection });
    };

    deleteThirdChildCategory = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) => {
            gender.item_classifications.forEach((classification) => {
                classification.types.forEach((type) => {
                    if (classification.is_checked === true) {
                        classification.is_checked = !classification.is_checked;
                    }

                    type.items = type.items.filter((item) => item.id !== id);
                });
            });
        });

        this.setState({ collection: collection });
    };

    restoreAll = () => {
        restore().then(() => {
            this.setState({
                isFirstChildVisible: false,
                isSecondChildVisible: false,
            });

            this.getAllItems();
        });
    };

    restoreClassifications = (id) => {
        restoreClassification(id).then(() => {
            this.setState({
                trashedClassification: [],
                isSecondChildVisible: false,
            });

            this.getAllItems();
        });
    };

    closeLogInModal = () => {
        this.setState({
            logInModalVisiblity: false,
        });
    };

    handleAllChecked = (event) => {
        let collection = this.state.collection;
        collection.forEach((gender) => {
            gender.is_checked = event.target.checked;
            gender.item_classifications.forEach((classification) => {
                classification.is_checked = event.target.checked;
                classification.types.forEach((type) => {
                    type.is_checked = event.target.checked;
                    type.items.forEach(
                        (item) => (item.is_checked = event.target.checked)
                    );
                });
            });
        });

        this.setState({ collection: collection });
    };

    deleteAllSelected = () => {
        let collection = this.state.collection;

        collection = collection.filter((gender) => gender.is_checked !== true);

        this.setState({ collection: collection });
    };

    checkAllFirstChildDescendants = (event) => {
        let collection = this.state.collection;
        collection.forEach((gender) =>
            gender.item_classifications.forEach((classification) => {
                classification.is_checked = event.target.checked;
                classification.types.forEach((type) => {
                    type.is_checked = event.target.checked;
                    type.items.forEach(
                        (item) => (item.is_checked = event.target.checked)
                    );
                });
            })
        );

        this.setState({ collection: collection });
    };

    checkAllSecondChildDescendants = (id) => (event) => {
        let collection = this.state.collection;
        collection.forEach((gender) =>
            gender.item_classifications.forEach((classification) =>
                classification.types.forEach((type) => {
                    if (type.id === id) {
                        type.is_checked = event.target.checked;
                    }

                    type.items.forEach((item) => {
                        if (item.item_type_id === id) {
                            item.is_checked = event.target.checked;
                        }
                    });
                })
            )
        );

        this.setState({ collection: collection });
    };

    toggleParentCheckbox = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) => {
            if (gender.id === id) {
                gender.is_checked = !gender.is_checked;
            }
        });
        this.setState({ collection: collection });
    };

    toggleParentCheckbox = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) => {
            if (gender.id === id) {
                gender.is_checked = !gender.is_checked;
            }
        });
        this.setState({ collection: collection });
    };

    toggleFirstChildCheckbox = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) =>
            gender.item_classifications.forEach((classification) => {
                if (classification.id === id) {
                    classification.is_checked = !classification.is_checked;
                }
            })
        );
        this.setState({ collection: collection });
    };

    toggleSecondChildCheckbox = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) =>
            gender.item_classifications.forEach((classification) =>
                classification.types.forEach((type) => {
                    if (type.id === id) {
                        type.is_checked = !type.is_checked;
                    }
                })
            )
        );
        this.setState({ collection: collection });
    };

    toggleThirdChildCheckbox = (id) => {
        let collection = this.state.collection;
        collection.forEach((gender) =>
            gender.item_classifications.forEach((classification) =>
                classification.types.forEach((type) =>
                    type.items.forEach((item) => {
                        if (item.id === id) {
                            item.is_checked = !item.is_checked;
                        }
                    })
                )
            )
        );
        this.setState({ collection: collection });
    };

    render() {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                >
                    <Menu.Item key="1">Home</Menu.Item>
                    {this.state.isAuthenticated ? (
                        <Menu.Item
                            className="float-right"
                            icon={<LogoutOutlined />}
                            onClick={() => this.logOutUser()}
                            key="2"
                        >
                            Logout
                        </Menu.Item>
                    ) : (
                        <Menu.Item className="float-right"></Menu.Item>
                    )}
                </Menu>
                <LogInModal
                    authenticate={this.authenticate}
                    token={this.state.token}
                    logInModalVisiblity={this.state.logInModalVisiblity}
                />
                <div className="container">
                    {this.state.collection.length > 0 ? (
                        this.state.collection.map((gender, i) => (
                            <div key={i}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={gender.is_checked}
                                        onChange={() =>
                                            this.toggleParentCheckbox(gender.id)
                                        }
                                    />
                                    <b>{gender.name}</b> -
                                    <input
                                        type="checkbox"
                                        onClick={this.handleAllChecked}
                                        value="checkedall"
                                    />{" "}
                                    Select All
                                    <button
                                        onClick={() =>
                                            this.deleteParentCategory(gender.id)
                                        }
                                        className="btn btn-sm btn-danger"
                                    >
                                        <DeleteOutlined />
                                    </button>
                                    {this.state.trashedClassification.length >
                                        0 && (
                                        <button
                                            onClick={() =>
                                                this.restoreClassifications(
                                                    gender.id
                                                )
                                            }
                                            className="btn btn-sm btn-success"
                                        >
                                            Restore Deleted Classifications
                                        </button>
                                    )}
                                    <button
                                        onClick={() => this.deleteAllSelected()}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete All Selected
                                    </button>
                                    {gender.is_checked &&
                                        gender.item_classifications.map(
                                            (classification, i) => (
                                                <div key={i}>
                                                    <label>
                                                        <input
                                                            key={
                                                                classification.id
                                                            }
                                                            type="checkbox"
                                                            checked={
                                                                classification.is_checked
                                                            }
                                                            onChange={() =>
                                                                this.toggleFirstChildCheckbox(
                                                                    classification.id
                                                                )
                                                            }
                                                            id="checkboxFirstChild"
                                                        />
                                                        <b>
                                                            {
                                                                classification.name
                                                            }
                                                        </b>
                                                        -
                                                        <input
                                                            type="checkbox"
                                                            onClick={
                                                                this
                                                                    .checkAllFirstChildDescendants
                                                            }
                                                        />{" "}
                                                        Select All
                                                        <button
                                                            onClick={() =>
                                                                this.deleteFirstChildCategory(
                                                                    classification.id
                                                                )
                                                            }
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            <DeleteOutlined />
                                                        </button>
                                                        {classification.is_checked &&
                                                            classification.types.map(
                                                                (type, i) => (
                                                                    <div
                                                                        key={i}
                                                                    >
                                                                        <CheckboxesSecondChild
                                                                            key={
                                                                                type.id
                                                                            }
                                                                            deleteSecondChildCategory={
                                                                                this
                                                                                    .deleteSecondChildCategory
                                                                            }
                                                                            checkAllSecondChildDescendants={this.checkAllSecondChildDescendants(
                                                                                type.id
                                                                            )}
                                                                            toggleSecondChildCheckbox={
                                                                                this
                                                                                    .toggleSecondChildCheckbox
                                                                            }
                                                                            checked={
                                                                                type.is_checked
                                                                            }
                                                                            type={
                                                                                type
                                                                            }
                                                                        />

                                                                        {type.is_checked &&
                                                                            type.items.map(
                                                                                (
                                                                                    item
                                                                                ) => (
                                                                                    <CheckboxesThirdChild
                                                                                        key={
                                                                                            item.id
                                                                                        }
                                                                                        deleteThirdChildCategory={
                                                                                            this
                                                                                                .deleteThirdChildCategory
                                                                                        }
                                                                                        toggleThirdChildCheckbox={
                                                                                            this
                                                                                                .toggleThirdChildCheckbox
                                                                                        }
                                                                                        checked={
                                                                                            item.is_checked
                                                                                        }
                                                                                        item={
                                                                                            item
                                                                                        }
                                                                                    />
                                                                                )
                                                                            )}
                                                                    </div>
                                                                )
                                                            )}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                </label>
                            </div>
                        ))
                    ) : this.state.isAuthenticated ? (
                        <button
                            className="btn btn-sm btn-success"
                            onClick={this.restoreAll}
                        >
                            Restore Gender
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
}

export default facets;
