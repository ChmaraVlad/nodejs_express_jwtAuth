const {  validationResult } = require('express-validator');

module.exports = (req, res) => {
     const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return errors.array()
  }
  return null
}