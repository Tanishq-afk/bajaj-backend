const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.get("/bfhl", (req, res) => {
  const responseObj = {
    operation_code: 1,
  };
  res.status(200).json(responseObj);
});

app.post("/bfhl", (req, res) => {
  const { data = [] } = req.body || {};
  const studentName = "Tanishq Sachdev";
  const studentEmail = "22bcs11288@cuchd.in";
  const studentRollNo = "22BCS11288";
  const studentDob = "16012004";
  const studentNameArray = studentName
    .split(" ")
    .map((name) => name.toLowerCase());
  const userId = [...studentNameArray, studentDob].join("_");

  const requestNumber = [];
  const requestAlphabets = [];

  let highestAlphabet;
  let is_success = true;

  data.forEach((word) => {
    if (word.length === 1) {
      const lowerCaseWord = word.toLowerCase();
      const isAlphabet = lowerCaseWord >= "a" && lowerCaseWord <= "z";
      if (isAlphabet) {
        highestAlphabet =
          highestAlphabet && highestAlphabet.toLowerCase() > lowerCaseWord
            ? highestAlphabet
            : word;
        requestAlphabets.push(word);
      } else {
        requestNumber.push(word);
      }
    } else {
      requestNumber.push(word);
    }
  });

  const responseObj = {
    is_success,
    user_id: userId,
    email: studentEmail,
    roll_no: studentRollNo,
    numbers: requestNumber,
    alphabets: requestAlphabets,
    highest_alphabet: highestAlphabet? [highestAlphabet]: [],
  };
  res.json(responseObj);
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
