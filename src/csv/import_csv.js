import { createReadStream } from "fs";
import csv from "csv-parser";
import User from "../models/user.js";
import userService from "../services/userService.js";
import Report from "../models/report.js";
import ReportDetails from "../models/reportDetails.js";
import generateCSV from "./csv_generator.js";
import strategy from "../outputStrategies/strategy.js";

const results = [];

const createUserAsync = (userData) => {
    return new Promise((resolve, reject) => {
        userService.createNewUser(userData, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const writeToDB = async () => {
    generateCSV();

    createReadStream("examples.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
            for (const row of results) {
                const {
                    username,
                    role,
                    email,
                    password,
                    type,
                    title,
                    report_date,
                    item_name,
                    amount,
                    currency,
                } = row;

                let user = await User.findOne({ where: { email } });
                if (!user) {
                    user = await createUserAsync({
                        username,
                        role,
                        email,
                        password,
                    });
                }
                const report = await Report.create({
                    type,
                    title,
                    report_date,
                    user_id: user.id,
                });
                await ReportDetails.create({
                    item_name,
                    amount,
                    currency,
                    report_id: report.id,
                });
                strategy.log(
                    `Imported: [User: ${user.username}], [Report: ${report.title}], [Item: ${row.item_name}]`
                );
            }

            strategy.log("Import completed");
        });
};

export default writeToDB;
