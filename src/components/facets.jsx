import React, { Component } from "react";
import {
    getItems,
    deleteParent,
    restore,
    logOut,
    deleteFirstChild,
    getTrashedClassification,
    restoreClassification,
} from "../functions";
import CheckboxesSecondChild from "./checkboxesSecondChild";
import CheckboxesThirdChild from "./checkboxesThirdChild";
import LogInModal from "./logInModal";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
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

    toggleFirstChildVisibility = () => {
        this.setState({
            isFirstChildVisible: !this.state.isFirstChildVisible,
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
                                        onChange={() =>
                                            this.toggleFirstChildVisibility()
                                        }
                                    />
                                    {gender.name}{" "}
                                    <button
                                        onClick={() =>
                                            this.deleteParentCategory(gender.id)
                                        }
                                        className="btn btn-sm btn-danger"
                                    >
                                        Delete
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
                                    {this.state.isFirstChildVisible &&
                                        gender.item_classifications.map(
                                            (classification, i) => (
                                                <div key={i}>
                                                    <label>
                                                        <input
                                                            key={
                                                                classification.id
                                                            }
                                                            type="checkbox"
                                                            onChange={() =>
                                                                this.toggleSecondChildVisibility()
                                                            }
                                                            id="checkboxFirstChild"
                                                        />
                                                        {classification.name}
                                                        <button
                                                            onClick={() =>
                                                                this.deleteFirstChildCategory(
                                                                    classification.id
                                                                )
                                                            }
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                        {this.state
                                                            .isSecondChildVisible &&
                                                            classification.types.map(
                                                                (type, i) => (
                                                                    <div
                                                                        key={i}
                                                                    >
                                                                        <CheckboxesSecondChild
                                                                            toggleThirdChildVisibility={
                                                                                this
                                                                                    .toggleThirdChildVisibility
                                                                            }
                                                                            key={
                                                                                type.id
                                                                            }
                                                                            type={
                                                                                type
                                                                            }
                                                                        />

                                                                        {type.items.map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <CheckboxesThirdChild
                                                                                    item={
                                                                                        item
                                                                                    }
                                                                                    key={
                                                                                        item.id
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
