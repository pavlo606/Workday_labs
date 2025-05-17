import Report from '../models/report.js';

const getAllReports = async (callback) => {
    const result = await Report.findAll()
    callback(null, result);
};

const getOneReport = async (id, callback) => {
    const result = await Report.findByPk(id)
    callback(null, result);
};

const getReportDetailsForReport = async (id, callback) => {
    const report = await Report.findByPk(id)
    const reportDetails = await report.getReportdetals()
    callback(null, reportDetails);
};

const createNewReport = async (newReport, callback) => {
    const result = await Report.create(newReport)
    callback(null, result)
};

const updateOneReport = async (id, changes, callback) => {
    console.log(changes);
    const result = await Report.update(
        changes,
        {
            where: {
                id
            }
        }
    )
    callback(null, result)
};

const deleteOneReport = async (id, callback) => {
    const result = await Report.destroy({
        where: {
            id
        }
    })
    callback(null, result)
};

export default {
    getAllReports,
    getOneReport,
    getReportDetailsForReport,
    createNewReport,
    updateOneReport,
    deleteOneReport,
};
