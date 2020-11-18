//Commit Test 1

// To hold our data
const rawdata = [];

/* Get data from server into our array as a json. This will get 2D array.
rawdata[0] will have course data and rawdata[1] will have professors data.
*/
async function getDatafromserver()
{

        fetch('/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((fromServer) => fromServer.json())
          .then((jsonFromServer) => rawdata.push(...jsonFromServer))
          .then(console.log(rawdata))
          .catch((err) => {
            console.log(err);
          });
}

getDatafromserver()


/* Function to get course grade based on parameter */

// Problem here is that the api does not allow access like this from the browser for security reasons.

async function getCourseGrade(course_name)
{
    const data = await fetch('https://api.planetterp.com/v1/grades?course=' + course_name);
    const grade_data = data.json();
    console.log(grade_data);
    return grade_data;
}

// Testing with INST377
const test_grade = getCourseGrade("INST377");