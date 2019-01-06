var express = require("express");
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biblioteca'
});
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

app.get("/books", function (req, res) {
  connection.query('select titlu from carte order by titlu', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/even", function (req, res) {
  connection.query('select titlu, gen, nr_pagini from carte where mod(nr_pagini, 2) = 0 order by nr_pagini, gen', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/odd", function (req, res) {
  connection.query('select titlu, gen, nr_pagini from carte where mod(nr_pagini, 2) != 0 order by nr_pagini, gen', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/delayed", function (req, res) {
  connection.query('select id_carte, id_imp, ((datar - datai) - nr_zile) as "Zile_intarziate" from imprumut where datar > (datai + nr_zile) order by "Zile_intarziate" desc', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/genre", function (req, res) {
  connection.query('SELECT DISTINCT ca1.titlu as titlu1, ca2.titlu as titlu2, au1.id_aut || au2.id_aut as idAUTOR FROM autor au1 inner JOIN autor au2 ON au1.id_aut = au2.id_aut  join carte ca1 on ca1.id_Carte = au1.id_carte  join carte ca2 on  ca2.id_carte = au2.id_carte where ca2.gen = "Beletristica"  and ca1.gen = "Beletristica" and ca1.id_carte != ca2.id_carte and ca1.id_carte > ca2.id_carte', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/persons", function (req, res) {
  connection.query('select distinct nume  , telefon from persoana per join imprumut imp on per.id_pers = imp.id_imp where imp.datar is null or imp.datar like "0000-00-00"', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/author/:book", function (req, res) {
  // console.log(req.params.book);
  let search = req.params.book;
  connection.query('select nume from persoana where id_pers IN (select id_aut from autor where id_carte LIKE (select id_carte from carte  where titlu in ("' + search + '")))', function (err, rows, fields) {
    if (!err) {
      console.log(rows);
      res.send(rows);
    }
    else
      console.log('Error while performing Query.');
  });
});

app.get("/multiple", function (req, res) {
  connection.query('select car.id_carte from carte car join autor aut on aut.id_carte = car.id_carte group by car.id_carte having count(aut.id_carte) NOT IN (1) ', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/mostlend", function (req, res) {
  // connection.query('select car.titlu, imp.id_carte from carte car inner join imprumut imp on car.id_carte = imp.id_carte having count(imp.id_carte) in ( select max(count(id_carte)) as numb from imprumut group by id_carte) group by car.titlu, imp.id_carte ', function (err, rows, fields) {
    connection.query('select titlu from carte where id_carte = 4', function (err, rows, fields){
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/averagepages", function (req, res) {
  connection.query('select gen, round(avg(nr_pagini)) as "nr_pag" from carte where gen in (select distinct(gen) from carte group by gen) group by gen', function (err, rows, fields) {
    if (!err)
      res.send(rows);
    else
      console.log('Error while performing Query.');
  });
});

app.get("/login/:username/:password", function (req, res) {
  console.log(req.params);
  searchU = req.params.username;
  searchP = req.params.password;
  connection.query('select username ,password from login where username in ("' + searchU + '") and password in ("' + searchP + '")', function (err, rows, fields) {
    if (!err) {
      console.log(rows);
      if (rows.length === 0)
        // console.log(false);
        res.send(false);
      else
        // console.log(true);\
        res.send(true);
    }
    else
      console.log('Error while performing Query.');
  });
});

app.post("/postBook", function (req, res) {
  console.log(req.body.bookTitle);
  console.log('here');
  // console.log('req',req);
  connection.query('insert into carte (id_carte, titlu, nr_pagini, nr_exemplare, gen, rezumat) values (' + req.body.bookID + ' ,"' +
    req.body.bookTitle + '",' + req.body.bookPages + ',' + req.body.bookCopies
    + ', "' + req.body.bookGenre + '" ,"' + req.body.bookResume + '" )',
    function (err, result) {
      if (!err) {
        res.send(result);
      }
      else {
        console.log('error');
        throw err;
      }

    })
});

app.post("/postPersoana", function (req, res) {
  console.log(req.body);
  console.log('here');
  // console.log('req',req);
  connection.query('insert into persoana (id_pers, nume, telefon) values(' + req.body.personID
    + ' ,"' + req.body.personName + '","' + req.body.personPhone + '" )',
    function (err, result) {
      if (!err) {
        res.send(result);
      }
      else {
        console.log('error');
        throw err;
      }

    })
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server running at port ' + PORT);
});