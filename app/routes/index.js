let express = require('express');
let router = express.Router();

let conn = require("./connect");

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



/* GET Show all book */
router.get('/books', (req, res) => {
  let sql = "SELECT * FROM books";

  conn.query(sql, (err, result, field) => {
    if (err) throw err;

    let message = "";

    if (result === undefined || result == 0 ) {
      message = "Book table is empty";
    } else {
      message = "Successfully retrieved all books";
    }

    return res.send({
      error:false,
      data: result,
      message:message
    });

  })
})



/* POST Add a new book */
router.post('/addbook', (req, res) => {
  let name = req.body.name;
  let author = req.body.author;

  //validation
  if(!name || !author) {

    return res.status(400).send({ 
      error:true, 
      message: "please provide book name and author."
    });

  } else {

    let sql = "INSERT INTO books SET name=? , author=?";
    
    conn.query(sql, [name, author], (err, result) => {
      if (err) throw err;

      let message = "Insert book successfully"
      return res.status(201).send({
        error:false,
        data: result,
        message: message
      })
    })
    
  }
})






module.exports = router;
