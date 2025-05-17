// import fs from "fs";
import { createObjectCsvWriter } from "csv-writer";

const generateCSV = () => {
    const csvWriter = createObjectCsvWriter({
        path: "examples.csv",
        header: [
            { id: "username", title: "username" },
            { id: "role", title: "role" },
            { id: "email", title: "email" },
            { id: "password", title: "password" },
            { id: "type", title: "type" },
            { id: "title", title: "title" },
            { id: "report_date", title: "report_date" },
            { id: "item_name", title: "item_name" },
            { id: "amount", title: "amount" },
            { id: "currency", title: "currency" },
        ],
    });

    const roles = ["admin", "user"];
    const types = ["sales", "finance", "inventory"];
    const items = ["Item A", "Item B", "Item C"];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const records = [];

    for (let i = 0; i < 1000; i++) {
        const username = `user${i}`;
        const email = `user${i}@example.com`;
        records.push({
            username,
            role: getRandomElement(roles),
            email,
            password: "password123",
            type: getRandomElement(types),
            title: `Report ${i}`,
            report_date: new Date().toISOString().split("T")[0],
            item_name: getRandomElement(items),
            amount: Math.floor(Math.random() * 1000) + 100,
            currency: "USD",
        });
    }

    csvWriter.writeRecords(records).then(() => console.log("CSV created!"));
}

export default generateCSV