module.exports = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                status: false,
                message: "Usuário não autenticado."
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: false,
                message: "Você não possui permissão."
            });
        }

        next();

    };

};