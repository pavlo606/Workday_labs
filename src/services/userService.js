import { compare, genSalt, hash as _hash } from 'bcrypt';

import userRepository from '../database/user.js';

const saltRounds = 10; // The number of rounds for hashing the password

const getAllUsers = (callback) => {
    userRepository.getAllUsers((err, result) => {
        callback(err, result);
    });
};

const getOneUser = (id, callback) => {
    userRepository.getOneUser(id, (err, result) => {
        callback(err, result);
    });
};

const getReportsForUser = (id, callback) => {
    userRepository.getReportsForUser(id, (err, result) => {
        callback(err, result);
    });
};

const loginUser = (credentials, callback) => {
    userRepository.loginUser(credentials, (err, result) => {
        if (result) {
            compare(credentials.password, result.password_hash, (bcrypt_err, authoristaion_result) => {
                if (bcrypt_err) {
                    console.error('Error comparing passwords:', bcrypt_err);
                    callback(bcrypt_err, result);
                    return;
                }

                if (authoristaion_result) {
                    console.log('Passwords match! User authenticated.');
                    delete result.dataValues.password_hash
                    callback(err, result);
                } else {
                    console.log('Passwords do not match! Authentication failed.');
                    err = {status: 401, message: 'Invalid credentials'};
                    callback(err, null);
                }
            });
        } else {
            err = {status: 401, message: 'Invalid credentials'};
            callback(err, null);
        }
    });
};

const createNewUser = (newUser, callback) => {
    genSalt(saltRounds, (err, salt) => {
        _hash(newUser.password, salt, (err, hash) => {
            if (err) {
                callback(err, {});
                return;
            }

            newUser.password_hash = hash;
            delete newUser.password;

            userRepository.createNewUser(newUser, (err, result) => {
                delete result.dataValues.password_hash
                callback(err, result);
            });
        });
    });
};

const updateOneUser = (id, changes, callback) => {
    if (changes.password) {
        genSalt(saltRounds, (err, salt) => {
            _hash(changes.password, salt, (err, hash) => {
                if (err) {
                    callback(err, {});
                    return;
                }

                changes.password_hash = hash;
                delete changes.password;

                userRepository.createNewUser(changes, (err, result) => {
                    callback(err, result);
                });
            });
        });
    } else {
        userRepository.updateOneUser(id, changes, (err, result) => {
            callback(err, result);
        });
    }
};

const deleteOneUser = (id, callback) => {
    userRepository.deleteOneUser(id, (err, result) => {
        callback(err, result);
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