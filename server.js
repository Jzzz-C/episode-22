const fs = require("fs");
const http = require("http");

const users = [
  // {
  //   namee: "user1",
  //   email: "user1@gmail.com",
  // },
  // {
  //   namee: "user2",
  //   email: "user2@gmail.com",
  // },
  // {
  //   namee: "user3",
  //   email: "user3@gmail.com",
  // },
];

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/users") {
    let method = req.method;
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      return res.end();
    } else if (method === "POST") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        users.push(JSON.parse(data));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(users));
        return res.end();
      });
    } else if (method === "PUT") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const newData = JSON.parse(data);
        console.log(newData);
        const userFound = users.find((user) => user.email === newData.email); // email check have many methods
        if (userFound) {
          userFound.name = newData.name;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
        }
        console.log(users);
        return res.end();
      });
    } else if (method === "DELETE") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        const dataFromClient = JSON.parse(data);
        // console.log(dataFromClient);
        const deleteUser = users.find(
          (user) => user.email === dataFromClient.email
        );
        if (deleteUser) {
          users.splice(users.indexOf(deleteUser), 1);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify(users));
        }
        // console.log(users);
        return res.end();
      });
    }
  } else if (req.url === "/fileUpload") {
    const fileType = req.headers["content-type"].split("/")[1]; //This is file type
    const writeStream = fs.createWriteStream(`file.${fileType}`);
    req.pipe(writeStream);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Upload Success..." }));
    res.end();

    // const writeStream = fs.createWriteStream("photo.jpg");
    // req.pipe(writeStream);
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.write(JSON.stringify({ message: "Upload Success..." }));
    // return res.end();

    // let data = "";
    // req.on("data", (chunk) => {
    //   data += chunk;
    // });
    // req.on("end", () => {
    //   // const dataFromClientServer = JSON.parse(data);
    //   // console.log(dataFromClientServer);
    //   fs.writeFileSync("text.txt", data);
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.write(JSON.stringify({ message: "Upload Success..." }));
    //   return res.end();
    // });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else {
    res.write("<h1>Error...</h1>");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server from Backend...");
});

// // This use from Database.
// GET = read or fetch data
// PUT = modify existing data
// POST = insert new data
// DELETE = remove existing data
