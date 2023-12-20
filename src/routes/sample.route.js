const express = require('express');


const router = express.Router();

router.get('/proper',(req,res) => {
    res.end('some sample response')
})

module.exports = router