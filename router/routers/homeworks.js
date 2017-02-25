import {Router} from 'express';
import HomeworkController from '../../controller/homework-controller';

const router = Router();
const homeworkCtrl = new HomeworkController();

router.get('/', homeworkCtrl.getAll);
router.get('/:id', homeworkCtrl.getOne);
router.delete('/:id', homeworkCtrl.delete);
router.put('/:id', homeworkCtrl.update);
router.post('/', homeworkCtrl.create);

export default router;