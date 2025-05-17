import ReportDetails from '../models/reportDetails.js';

const getAllReportDetails = async (callback) => {
    const result = await ReportDetails.findAll()
    callback(null, result);
};

const getOneReportDetails = async (id, callback) => {
    const result = await ReportDetails.findByPk(id)
    callback(null, result);
};

const createNewReportDetails = async (newReportDetails, callback) => {
    const result = await ReportDetails.create(newReportDetails)
    callback(null, result)
};

const updateOneReportDetails = async (id, changes, callback) => {
    console.log(changes);
    const result = await ReportDetails.update(
        changes,
        {
            where: {
                id
            }
        }
    )
    callback(null, result)
};

const deleteOneReportDetails = async (id, callback) => {
    const result = await ReportDetails.destroy({
        where: {
            id
        }
    })
    callback(null, result)
};

export default {
    getAllReportDetails,
    getOneReportDetails,
    createNewReportDetails,
    updateOneReportDetails,
    deleteOneReportDetails,
};
