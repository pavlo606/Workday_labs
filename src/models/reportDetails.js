import { STRING, DECIMAL } from "sequelize";
import seq from "../database/connect.js";
// import User from "./user.js";

const ReportDetails = seq.define("report_details", {
    item_name : {
        type: STRING(100),
        allowNull: false,
    },
    amount: {
        type: DECIMAL(15, 2),
        allowNull: false,
    },
    currency  : {
        type: STRING(10),
        allowNull: false,
    }
});

// ReportDetails.hasMany(User, {as: "users"})

export default ReportDetails;
