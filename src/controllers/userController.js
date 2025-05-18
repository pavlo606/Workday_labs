import userService from "../services/userService.js";

const getAllUsers = (req, res) => {
    userService.getAllUsers((err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.send({ status: "OK", data: result });
    });
};

const getOneUser = (req, res) => {
    const {
        params: { userId },
    } = req;
    if (!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Parameter ':userId' can not be empty",
            },
        });
    }
    userService.getOneUser(userId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.send({ status: "OK", data: result });
    });
};

const getReportsForUser = (req, res) => {
    const {
        params: { userId },
    } = req;
    if (!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Parameter ':userId' can not be empty",
            },
        });
    }
    userService.getReportsForUser(userId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.send({ status: "OK", data: result });
    });
};

const loginUser = (req, res) => {
    const { body } = req;
    userService.loginUser(body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        req.session.userId = result.id;
        res.status(201).send({
            status: "OK",
            data: result,
        });
    });
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout falid");
        }
        res.clearCookie("connect.sid");
        res.send("logout successful");
    });
};

const createNewUser = (req, res) => {
    const { body } = req;
    userService.createNewUser(body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.status(201).send({
            status: "OK",
            data: result,
        });
    });
};

const updateOneUser = (req, res) => {
    const {
        body,
        params: { userId },
    } = req;
    if (!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Parameter ':userId' can not be empty",
            },
        });
    }
    userService.updateOneUser(userId, body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.send({ status: "OK", data: result });
    });
};

const deleteOneUser = (req, res) => {
    const {
        params: { userId },
    } = req;
    if (!userId) {
        res.status(400).send({
            status: "FAILED",
            data: {
                error: "Parameter ':userId' can not be empty",
            },
        });
    }
    userService.deleteOneUser(userId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: "FAILED",
                data: { error: err },
            });
        }
        res.status(200).send({ status: "OK", data: result });
    });
};

export default {
    getAllUsers,
    getOneUser,
    getReportsForUser,
    loginUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};
