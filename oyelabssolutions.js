// consider a database having customer details table of phone-number and user name
// I develop an api url with path parameter 'login' if user already exist it send s the response of user-already exist.
// the user must login with password,phone-number like a facebook if the password is invalid it specifies 'password is Invalid

const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const databasePath = path.join(__dirname, "customerDetails.db"); //assume that there is a data base of customer details

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//Make a api for phone number login
app.post("/login/", async (request, response) => {
  const { number, username, password } = request.body;
  //check user
  const userDetailsQuery = `select * from customerDetails where phonenumber = '${number}';`;
  const userDetails = await database.get(userDetailsQuery);
  if (userDetails !== undefined) {
    const isPasswordValid = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (isPasswordValid) {
      const payload = { username: username, phonenumber: number };
      const jwtToken = jwt.sign(payload, "MY_KEY");
      response.send({ jwtToken });
    } else if (number in userDetails) {
      response.send("user already exists");
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  } else {
    response.status(400);
    response.send("invalid number");
  }
});

//2.Refer to the tables below, Write a sql query for finding the subjects for each
//student, the subjects should be order by alphabetically .

const SQLQuery = `
    SELECT 
    customerid,name,subjectName AS subjects
    FROM
   (customers LEFT JOIN Subject_student_mapping ON customers.customerId = Subject_student_mapping.customerId) As TABLE_1
   LEFT JOIN Subjects ON TABLE_1.subjectId = Subjects.subjectId
   GROUP BY
   name
   ORDER BY
    name ASC
`;
//3. Write a function in node that inserts the following data in mysql , the email should
//be unique and if the email already exists in the system then the name of the customer
//will be updated with the new name that is there in the array for that customer.

const customers = [
  {
    id: 1,
    email: "anurag11@yopmail.com",
    name: "anurag",
  },
  {
    id: 2,
    email: "sameer11@yopmail.com",
    name: "sameer",
  },
  {
    id: 3,
    email: "ravi11@yopmail.com",
    name: "ravi",
  },
  {
    id: 4,
    email: "akash11@yopmail.com",
    name: "akash",
  },
  {
    id: 5,
    email: "anjali11@yopmail.com",
    name: "anjai",
  },
  {
    id: 6,
    email: "santosh11@yopmail.com",
    name: "santosh",
  },
];
/* AssUme That we have Table with Name customer having Columns CustomerID,name,email of  let insert the into it */

customers.map((eachUser) => {
  const { id, email, name } = eachUser;
  const inserting_query = `
    INSERT INTO customer(customerId,name,email)
    VALUES
     (${id},'${email}','${name}')
  `;
});

//Create a new object which have all the properties of object person and student
const person = {
  id: 2,
  gender: "mail",
};
const student = {
  name: "ravi",
  email: "ravi11@yopmail.com",
};

const newObject = new Object();
newObject.id = person.id;
newObject.gender = person.gender;
newObject.name = student.name;
newObject.email = student.email;

console.log(newObject);

/* 6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
, one number from 1 to 100 is missing , Please write the code for finding the missing
number */
//const num_list = [1....100]// let us assume that we have an array of 1 to 100 randomly integers.

/*const sortedNumList = num_list.sort();
for (let i = 0; i <= 100; i++) {
  condition = num_list.includes(i);
  if (condition === false) {
    print(i);
  }
}*/

/*5. Make a promisified function for the function having callback below , after the
function is promisified then call the function like you call a promise */

const request = require("request");
function getGoogleHomePage(finalCallBack) {
  request("http://www.googe.com", function (error, response, body) {
    console.error("error:", error); // Print the error if one occurred
    finalCallBack(error);
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
    finalCallBack(null, body);
  });
}

const result = () => {
  return new Promise(  (resolve, reject) => {
    function getGoogleHomePage(finalCallBack) {
       request  ("http://www.google.com", function  (error, response, body) {
        console.error("error:", error); // Print the error if one occurred
         finalCallBack(error);
        console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
        console.log("body:", body); // Print the HTML for the Google homepage.
        finalCallBack(null, body);
      });
    }
    console.log(getGoogleHomePage((result) => {})

    }));
  });
};
const x = result();
console.log(x);

                 /*or */ 
const url = "http://www.google.com"

const doNetworkCall = async () => {   //Async Function always returns Promise object
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
};

const asyncPromise = doNetworkCall();
console.log(asyncPromise); //Async Function always returns Promise object