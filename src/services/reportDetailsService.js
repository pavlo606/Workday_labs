import ReportDetailsRepository from '../database/reportDetails.js'

const getAllReportDetails = (callback) => {
    ReportDetailsRepository.getAllReportDetails((err, result) => {
        callback(err, result);
    });
};

const getOneReportDetails = (id, callback) => {
    ReportDetailsRepository.getOneReportDetails(id, (err, result) => {
        callback(err, result);
    });
};

const createNewReportDetails = (newReportDetails, callback) => {
    ReportDetailsRepository.createNewReportDetails(newReportDetails, (err, result) => {
        callback(err, result);
    });
};

const updateOneReportDetails = (id, changes, callback) => {
    ReportDetailsRepository.updateOneReportDetails(id, changes, (err, result) => {
        callback(err, result);
    });
};

const deleteOneReportDetails = (id, callback) => {
    ReportDetailsRepository.deleteOneReportDetails(id, (err, result) => {
        callback(err, result);
    });
};

export default {
    getAllReportDetails,
    getOneReportDetails,
    createNewReportDetails,
    updateOneReportDetails,
    deleteOneReportDetails,
};