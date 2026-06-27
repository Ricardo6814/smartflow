const express = require ('express');
const clientRouter = express.Router();

clientRouter.get('/', (req, res) => {
    res.json({ message: "Route Clients" });
});

module.exports = clientRouter;