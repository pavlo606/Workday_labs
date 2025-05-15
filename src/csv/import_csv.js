import { createReadStream } from "fs";
import csv from "csv-parser";
import User from "../models/user.js";
import userService from "../services/userService.js";
import Report from "../models/report.js";
import ReportDetails from "../models/reportDetails.js";

const results = [];

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
                // user = await User.create({
                    // username,
                    // role,
                    // email,
                    // password,
                // });
                userService.createNewUser({
                    username,
                    role,
                    email,
                    password,
                }, async (err, result) => {
                    // console.log(result)
                    // user = result
                    const report = await Report.create({
                        type,
                        title,
                        report_date,
                        user_id: result.id,
                    });
                    console.log(report)
                    await ReportDetails.create({
                        item_name,
                        amount,
                        currency,
                        report_id: report.id,
                    });
                })
            } else {

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
                    reportId: report.id,
                });
            }
        }

        console.log("Import completed");
    });
