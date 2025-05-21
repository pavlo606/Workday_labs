import { Router } from "express";
import userService from "../services/userService.js";
import reportService from "../services/reportService.js";

const getReportsForUserAsync = (id) => {
    return new Promise((resolve, reject) => {
        userService.getReportsForUser(id, (err, result) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

const getReportDetailsForReportAsync = (id) => {
    return new Promise((resolve, reject) => {
        reportService.getReportDetailsForReport(id, (err, result) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(result)));
        });
    });
};

const router = Router();

router.get("/login", (req, res) => {
    res.render("pages/login.ejs", {});
});

router.get("/report", async (req, res) => {
    if (req.session.userId) {
        res.render("pages/report.ejs", {
            userId: req.session.userId,
            reports: await getReportsForUserAsync(req.session.userId),
        });
    } else {
        res.redirect("/api/view/login");
    }
});

router.get("/reportdetails/:reportId", async (req, res) => {
    if (req.session.userId) {
        res.render("pages/reportDetails.ejs", {
            userId: req.session.userId,
            reportDetails: await getReportDetailsForReportAsync(
                req.params.reportId
            ),
            ...req.params,
        });
    } else {
        res.redirect("/api/view/login");
    }
});

export default router;
