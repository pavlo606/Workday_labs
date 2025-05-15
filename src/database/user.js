import User from '../models/user.js';

const getAllUsers = async (callback) => {
    const result = await User.findAll()
    callback(null, result);
};

const getOneUser = async (id, callback) => {
    const result = await User.findByPk(id)
    callback(null, result);
};

const getReportsForUser = async (id, callback) => {
    const user = await User.findByPk(id)
    const reports = await user.getReports()
    callback(null, reports);
};

const loginUser = async (credentials, callback) => {
    const result = await User.findOne({ where: { email: credentials.email }});
    callback(null, result);
};


const createNewUser = async (newUser, callback) => {
    const result = await User.create(newUser)
    callback(null, result)
};

const updateOneUser = async (id, changes, callback) => {
    console.log(changes);
    const result = await User.update(
        changes,
        {
            where: {
                id
            }
        }
    )
    callback(null, result)
};

const deleteOneUser = async (id, callback) => {
    const result = await User.destroy({
        where: {
            id
        }
    })
    callback(null, result)
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
