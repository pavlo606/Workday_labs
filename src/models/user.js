import { STRING } from "sequelize";
import seq from "../database/connect.js";
import Report from "./report.js";

const User = seq.define("user", {
    username: {
        type: STRING(50),
        allowNull: false,
    },
    role: {
        type: STRING(50),
    },
    email: {
        type: STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: STRING(255),
        allowNull: false,
    },
});

User.hasMany(Report, {as: 'reports', foreignKey: {name: 'user_id', allowNull: false}})

export default User;
