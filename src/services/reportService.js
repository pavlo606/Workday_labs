import ReportRepository from '../database/report.js'

const getAllReports = (callback) => {
    ReportRepository.getAllReports((err, result) => {
        callback(err, result);
    });
};

const getOneReport = (id, callback) => {
    ReportRepository.getOneReport(id, (err, result) => {
        callback(err, result);
    });
};

const getReportDetailsForReport = (id, callback) => {
    ReportRepository.getReportDetailsForReport(id, (err, result) => {
        callback(err, result);
    });
};

const createNewReport = (newReport, callback) => {
    ReportRepository.createNewReport(newReport, (err, result) => {
        callback(err, result);
    });
};

const updateOneReport = (id, changes, callback) => {
    ReportRepository.updateOneReport(id, changes, (err, result) => {
        callback(err, result);
    });
};

const deleteOneReport = (id, callback) => {
    ReportRepository.deleteOneReport(id, (err, result) => {
        callback(err, result);
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