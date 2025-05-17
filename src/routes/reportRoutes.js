import { Router } from 'express';
import reportController from '../controllers/reportController.js'

const router = Router();

router.get('/', reportController.getAllReports);

router.get('/:reportId', reportController.getOneReport);

router.get('/reportdetails/:reportId', reportController.getReportDetailsForReport);

router.post('/', reportController.createNewReport);

router.patch('/:reportId', reportController.updateOneReport);

router.delete('/:reportId', reportController.deleteOneReport);

export default router;