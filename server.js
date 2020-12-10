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

    // Hold the list of departements
    const list_of_departments = 
    [
      "AASP","AAST"
,"AGNR"
,"AMSC"
,"AMST"
,"ANSC"
,"ANTH"
,"AOSC"
,"ARAB"
,"ARCH"
,"AREC"
,"ARHU"
,"ARMY"
,"ARSC"
,"ARTH"
,"ARTT"
,"ASTR"
,"BCHM"
,"BEES"
,"BIOE"
,"BIOL"
,"BIOM"
,"BIPH"
,"BISI"
,"BMGT"
,"BMSO"
,"BSCI"
,"BSCV"
,"BSGC"
,"BSOS"
,"BSST"
,"BUAC"
,"BUDT"
,"BUFN"
,"BULM"
,"BUMK"
,"BUSI"
,"BUSM"
,"BUSO"
,"CBMG"
,"CCJS"
,"CHBE"
,"CHEM"
,"CHIN"
,"CHPH"
,"CHSE"
,"CLAS"
,"CLFS"
,"CMLT"
,"CMSC"
,"COMM"
,"CPBE"
,"CPET"
,"CPGH"
,"CPJT"
,"CPMS"
,"CPPL"
,"CPSA"
,"CPSD"
,"CPSF"
,"CPSG"
,"CPSN"
,"CPSP"
,"CPSS"
,"DANC"
,"DATA"
,"EALL"
,"ECON"
,"EDCP"
,"EDHD"
,"EDHI"
,"EDMS"
,"EDSP"
,"EDUC"
,"ENAE"
,"ENCE"
,"ENCH"
,"ENCO"
,"ENEB"
,"ENEE"
,"ENES"
,"ENFP"
,"ENGL"
,"ENMA"
,"ENME"
,"ENPM"
,"ENRE"
,"ENSE"
,"ENSP"
,"ENST"
,"ENTM"
,"ENTS"
,"EPIB"
,"FGSM"
,"FILM"
,"FIRE"
,"FMSC"
,"FREN"
,"GEMS"
,"GEOG"
,"GEOL"
,"GERM"
,"GREK"
,"GVPT"
,"HACS"
,"HDCC"
,"HEBR"
,"HEIP"
,"HESI"
,"HESP"
,"HHUM"
,"HISP"
,"HIST"
,"HLSA"
,"HLSC"
,"HLTH"
,"HNUH"
,"HONR"
,"IDEA"
,"IMDM"
,"IMMR"
,"INAG"
,"INFM"
,"INST"
,"ISRL"
,"ITAL"
,"JAPN"
,"JOUR"
,"JWST"
,"KNES"
,"KORA"
,"LARC"
,"LASC"
,"LATN"
,"LBSC"
,"LGBT"
,"LING"
,"MAIT"
,"MATH"
,"MEES"
,"MIEH"
,"MITH"
,"MLAW"
,"MLSC"
,"MSBB"
,"MSML"
,"MUED"
,"MUSC"
,"NACS"
,"NAVY"
,"NEUR"
,"NFSC"
,"NIAP"
,"NIAV"
,"PEER"
,"PERS"
,"PHIL"
,"PHPE"
,"PHSC"
,"PHYS"
,"PLCY"
,"PLSC"
,"PORT"
,"PSYC"
,"RDEV"
,"RELS"
,"RUSS"
,"SLAA"
,"SLLC"
,"SMLP"
,"SOCY"
,"SPAN"
,"SPHL"
,"STAT"
,"SURV"
,"TDPS"
,"THET"
,"TLPL"
,"TLTC"
,"UMEI"
,"UNIV"
  ,"URSP"
  ,"USLT"
  ,"VMSC"
  ,"WMST"
 ]

/* 
    Better way using promise.all 
    The Promise.all() method (and promises in general) work in all modern browsers, 
    but have no IE support.
*/

    //------- returns 2 big arrays, first has course data, second has prof data ---------//
    
    // This loop through all the departments and fetch their course data
    let courses_by_dep = [];
    var i;
    for(i = 0; i < list_of_departments.length; i++)
    {
      courses_by_dep[i] = await fetch("https://api.planetterp.com/v1/courses?department="+list_of_departments[i], {method: 'GET'});
    }

    // The api only returns a max of 1000 data point, so we are missing several courses by doing this way.
    const courseData = await fetch("https://api.planetterp.com/v1/courses?limit=1000", {method: 'GET'});
    
    const professorData = await fetch("https://api.planetterp.com/v1/professors?limit=1000", {method: 'GET'});
    const gradeData = await fetch( "https://api.planetterp.com/v1/grades", {method: 'GET'});

    // makes one big array to be passed to the script side, teacher data is the last entry in the array
    const all_data = courses_by_dep.concat(professorData);

    Promise.all(all_data) // change all_data to [courseData, professorData] to only include 1000 data point but increase performance
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

  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


