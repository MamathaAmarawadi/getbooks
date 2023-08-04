const express = require("express");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const filePath = path.join(__dirname, "goodreads.db");

let data = null;

const initialDBandServer = async () => {
  try {
    data = await open({
      filename: filePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server raunning at http://localhost:3000");
    });
  } catch (e) {
    console.log(`server error ${e.message}`);
    process.exit(1);
  }
};

app.get("/books/", async (request, response) => {
  const getBookdb = `
    select *
    from book
    order by 
    book_id`;
  const ob = await data.all(getBookdb);
  response.send(ob);
});
initialDBandServer();
