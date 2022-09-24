let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let mysql = require('mysql');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.send({
    error: false,
    message: 'Welcome to RESTful CRUD API with NodeJS, Express, MySQL',
    written_by: 'Teerachai',
    published: 'http://johnwick.com'
  });
});









module.exports = router;
