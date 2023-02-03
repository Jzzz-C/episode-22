// const fs = require("fs"); // ==> fs is run in Server, not run in Browser.

// // Write File First Method
// fs.writeFile("text.txt", "text data", () => {
//   console.log("This is write from server..");
// });

// // Write File Second Method
// fs.writeFileSync("hello.txt", "hello world..");

// Create Files On Server Code

const handleChange = async () => {
  const fileUpload = document.querySelector("#fileUpload");
  // console.log(fileUpload.files);
  const response = await fetch(
    "http://localhost:3000 => https://episode-22.onrender.com/",
    {
      method: "POST",
      body: fileUpload.files[0], // This is main point...
      // body: JSON.parse('{ "message": "THIS IS FOR YOU.." }'),
    }
  );

  console.log(await response.json());
};
