import ReportDetailsService from '../services/reportDetailsService.js'

const getAllReportDetails = (req, res) => {
    ReportDetailsService.getAllReportDetails((err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    });
};

const getOneReportDetails = (req, res) => {
    const {
        params: { reportdetailsId },
    } = req;
    if (!reportdetailsId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportdetailsId' can not be empty",
            },
        });
    }
    ReportDetailsService.getOneReportDetails(reportdetailsId, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    });
};

const createNewReportDetails = (req, res) => {
    const { body } = req;
    ReportDetailsService.createNewReportDetails(body, (err, result) => {
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

const updateOneReportDetails = (req, res) => {
    const {
        body,
        params: { reportdetailsId },
    } = req;
    if (!reportdetailsId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportdetailsId' can not be empty",
            },
        });
    }
    ReportDetailsService.updateOneReportDetails(reportdetailsId, body, (err, result) => {
        if (err) {
            return res.status(err.status || 500).send({
                status: 'FAILED',
                data: { error: err },
            });
        }
        res.send({ status: 'OK', data: result });
    })
};

const deleteOneReportDetails = (req, res) => {
    const {
        params: { reportdetailsId },
    } = req;
    if (!reportdetailsId) {
        res.status(400).send({
            status: 'FAILED',
            data: {
                error:
                    "Parameter ':reportdetailsId' can not be empty",
            },
        });
    }
    ReportDetailsService.deleteOneReportDetails(reportdetailsId, (err, result) => {
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
    getAllReportDetails,
    getOneReportDetails,
    createNewReportDetails,
    updateOneReportDetails,
    deleteOneReportDetails,
};