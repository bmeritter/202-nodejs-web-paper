import {Router} from 'express';
import PaperController from '../../controller/paper-controller';

const router = Router();
const paperCtrl = new PaperController();

router.get('/', paperCtrl.getAll);
router.get('/:id', paperCtrl.getOne);
router.delete('/:id', paperCtrl.delete);
router.put('/:id', paperCtrl.update);
router.post('/', paperCtrl.create);

export default router;