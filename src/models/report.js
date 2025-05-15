import { STRING, DATE } from "sequelize";
import seq from "../database/connect.js";
import ReportDetails from "./reportDetails.js";

const Report = seq.define("report", {
    type: {
        type: STRING(20),
        allowNull: false,
    },
    title: {
        type: STRING(50),
        allowNull: false,
    },
    report_date: {
        type: DATE,
        allowNull: false,
    }
});

Report.hasMany(ReportDetails, {as: "reportdetals", foreignKey: {name: 'report_id', allowNull: false}})

export default Report;
