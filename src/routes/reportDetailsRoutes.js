import { Router } from 'express';
import reportdetailsController from '../controllers/reportDetailsController.js'

const router = Router();

router.get('/', reportdetailsController.getAllReportDetails);

router.get('/:reportdetailsId', reportdetailsController.getOneReportDetails);

router.post('/', reportdetailsController.createNewReportDetails);

router.patch('/:reportdetailsId', reportdetailsController.updateOneReportDetails);

router.delete('/:reportdetailsId', reportdetailsController.deleteOneReportDetails);

export default router;