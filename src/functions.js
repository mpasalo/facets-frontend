import api from "./api";

export const getItems = () => {
    return api()
        .get(process.env.REACT_APP_URL + "/api/genders", {
            headers: { "Content-Type": "application/json" },
        })
        .then((result) => {
            return result.data;
        });
};

export const deleteParent = (id) => {
    return api().delete(process.env.REACT_APP_URL + `/api/genders/${id}`, {
        headers: { "Content-Type": "application/json" },
    });
};

export const deleteFirstChild = (id) => {
    return api().delete(
        process.env.REACT_APP_URL + `/api/item-classifications/${id}`,
        {
            headers: { "Content-Type": "application/json" },
        }
    );
};

export const restore = () => {
    return api().patch(process.env.REACT_APP_URL + `/api/genders/restore`, {
        headers: { "Content-Type": "application/json" },
    });
};

export const logIn = (email, password) => {
    return api()
        .post("/login", {
            email: email,
            password: password,
            device_name: "browser",
        })
        .then((response) => {
            return response;
        });
};

export const logOut = () => {
    return api()
        .post("/logout")
        .then((response) => {
            window.location.reload();
        });
};

export const getTrashedClassification = (id) => {
    return api()
        .get(
            process.env.REACT_APP_URL +
                `/api/item-classifications/${id}/trashed`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
        .then((result) => {
            return result.data;
        });
};

export const restoreClassification = (id) => {
    return api()
        .patch(
            process.env.REACT_APP_URL +
                `/api/item-classifications/${id}/restore`,
            {
                headers: { "Content-Type": "application/json" },
            }
        )
        .then((result) => {
            return result.data;
        });
};
