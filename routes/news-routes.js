import express from 'express';
import * as NewsController from '../controllers/news-controller';
const router = express.Router();

router.get('/all', NewsController.getAll);
router.post('/save', NewsController.save);
router.post('/remove', NewsController.remove);
router.post('/update', NewsController.update);
router.get('/:pageNumber/:perPage', NewsController.getPage);
router.get('/count', NewsController.getNewsCount);

export default router;
