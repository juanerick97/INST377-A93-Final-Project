// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {

    //res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {

    console.log('POST request detected');


/* 
    Get our API Using nested fetch
    await fetch("https://api.planetterp.com/v1/courses").then(function (response) {
		    // Get a JSON object from the response
        return response.json();
    })
      .then(function (data) {

		    // Log the data to the console
         console.log(data);
         
         res.json(data);

 		    // Cache the data to a variable
 		    const courseData = data;

 		    // Make another API call and pass it into the stream
         return fetch("https://api.planetterp.com/v1/professors");
    })
      .then(function (response) {
		    // Get a JSON object from the response
		    return response.json();
    })
      .then(function (data) {

		    // Log the data to the console
        console.log(data);
        
        res.json(data);

		    // Cache the data to a variable
		    const professorData = data;

		    // Now that you have both APIs back, you can do something with the data

    })
      .catch(function (error) {
		    // if there's an error, log it
		    console.log(error);
	  });
*/



/* 
    Better way using promise.all 
    The Promise.all() method (and promises in general) work in all modern browsers, 
    but have no IE support.
*/

    //------- returns 2 big arrays, first has course data, second has prof data ---------//

    const courseData = await fetch("https://api.planetterp.com/v1/courses");
    const professorData = await fetch("https://api.planetterp.com/v1/professors");

    Promise.all([courseData, professorData])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then(function (data) {
      // Log the data to the console
      // You would do something with both sets of data here
      console.log('Form data', data);
      res.json(data);
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });

/*
    console.log('POST request detected');
    const professorData = await fetch("GET https://api.planetterp.com/v1/professors");
    const professor = await professorData.json();
    console.log('Form data', professor);
    res.json(professor);

    console.log('POST request detected');
    const gradeData = await fetch("GET https://api.planetterp.com/v1/grades");
    const grade = await data.json();
    console.log('Form data', grade);
    res.json(grade);
*/

  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


