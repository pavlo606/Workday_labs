import ReportService from '../services/reportService.js'

const getAllReports = (req, res) => {
    ReportService.getAllReports((err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    });
};

const getOneReport = (req, res) => {
    const {
        params: { reportId },
    } = req;
    console.log(req.session.userId)
    if (!reportId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportId' can not be empty",
            },
        });
    }
    ReportService.getOneReport(reportId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    });
};

const getReportDetailsForReport = (req, res) => {
    const {
        params: { reportId },
    } = req;
    if (!reportId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportId' can not be empty",
            },
        });
    }
    ReportService.getReportDetailsForReport(reportId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    });
};

const createNewReport = (req, res) => {
    const { body } = req;
    if (!body.user_id) {
        body.user_id = req.session.userId
    }
    console.log(body)
    ReportService.createNewReport(body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.status(201).send({
            status: 'OK',
            data: result,
        });
    });
};

const updateOneReport = (req, res) => {
    const {
        body,
        params: { reportId },
    } = req;
    if (!reportId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportId' can not be empty",
            },
        });
    }
    ReportService.updateOneReport(reportId, body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    })
};

const deleteOneReport = (req, res) => {
    const {
        params: { reportId },
    } = req;
    if (!reportId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportId' can not be empty",
            },
        });
    }
    ReportService.deleteOneReport(reportId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.status(200).send({ status: 'OK', data: result });
    });
};

export default {
    getAllReports,
    getOneReport,
    getReportDetailsForReport,
    createNewReport,
    updateOneReport,
    deleteOneReport,
};