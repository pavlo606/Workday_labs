import { Router } from 'express';

const router = Router();

router.get('/report', (req, res) => {
    res.render("report.ejs", {
        fuck: "fucking ass"
    })
});

export default router;