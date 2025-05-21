import { Router } from 'express';
import userController from '../controllers/userController.js'

const router = Router();

router.get('/', userController.getAllUsers);

router.get('/reports/:userId', userController.getReportsForUser);

router.post('/login', userController.loginUser);

router.post('/logout', userController.logout);

router.post('/', userController.createNewUser);

router.patch('/:userId', userController.updateOneUser);

router.delete('/:userId', userController.deleteOneUser);

export default router;