const { validationResult } = require('express-validator');

const ErrorMessageHandle = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
    } else {
        next();
    }
}

module.exports = ErrorMessageHandle;