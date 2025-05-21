export function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).send("Потрібна авторизація");
    }
    next();
}
