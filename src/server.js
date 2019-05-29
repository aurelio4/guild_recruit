const express = require('express');
const mysql = require('mysql');
const app = express();

const SELECT_ALL_ACCOUNTS_QUERY = 'SELECT * FROM accounts';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ascent',
  database: 'website'
});

connection.connect(err => {
  if(err) {
    return err
  }
});

app.get('/accounts/add', (req, res) => {
  const account = [`chelk`, `qweasd`, `qwe@gmail.com`]
  const INSERT_ACCOUNT_QUERY = 'INSERT INTO accounts (`username`, `password`, `email`) VALUES ?'
  connection.query(INSERT_ACCOUNT_QUERY, account.toString(), (err, results) => {
    if (err) {
      return res.send(err)
    }
    else {
      return res.send("successfully added account!")
    }
  })
})

app.get('/accounts', (req, res) => {
  connection.query(SELECT_ALL_ACCOUNTS_QUERY, (err, results) => {
    if(err) {
      return res.send(err)
    }
    else {
      return res.json({
        data: results
      })
    }
  })
})

app.listen(4000, () => {
  console.log("Listening on port 4000")
});
