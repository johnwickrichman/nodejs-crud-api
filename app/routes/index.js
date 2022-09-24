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
router.post('/book', (req, res) => {
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




/* GET Retrieve book by ID */
router.get('/book/:id', (req, res) => {

  let book_id = req.params.id;

  //validation
  if (!book_id) {

    return res.status(400).send({
      error: true,
      message: "Please provide book ID",
    })

  } else {

    let sql = "SELECT * FROM books WHERE id=?";

    conn.query(sql, [book_id], (err, result) => {
      if (err) throw err;

      let message = "";
      if ( result === undefined || result.length == 0) {
        message = "Book not found";
      } else {
        message = "Successfully retrieved book data"
      }

      return res.send({
        error: false,
        data: result[0],
        message: message
      })
    })

  }
})




/* POST Update book by ID */
router.put('/book', (req, res) => {

  let book_id = req.body.id;
  let name = req.body.name;
  let author = req.body.author;

  //validation
  if (!book_id || !name || !author) {

    return res.status(400).send({
      error: true,
      message: "Please provide book_id , name and author"
    })

  } else {

    let sql = "UPDATE books SET name=? , author=? WHERE id=?";

    conn.query(sql, [name, author, book_id] , (err, result) => {
      if (err) throw err;

      let message = [];
      if (result.changedRows === 0) {
        // ถ้า changedRows มีค่าเท่ากับ 0 แสดงว่าไม่มีการเปลี่ยนแปลงข้อมูลเดิม
        message = "Book not found or data are same";
      } else {
        message = "Book Successfully updated";
      }

      return res.send({
        error: false,
        data: result,
        message: message
      })
    })

  }
})

















module.exports = router;
