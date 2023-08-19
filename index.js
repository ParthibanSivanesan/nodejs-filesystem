//API: //http://localhost:9003/ 
//     //http://localhost:9003/timestamp

const PORT = 9003;
const fs = require("fs");
const express = require("express");
const path = require("path");
const dirPath = path.join(__dirname, "timestamps");
const app = express();
 
                  //console.log(dirPath);



//A) API endpoint to create a textfile in perticular folder

app.get("/timestamp", function (req,res){

  let date = new Date();
  let currentDate = date.toDateString().slice(4);
  let currentTime = date.toTimeString().slice(0,8);

                  // console.log("CD", currentDate);
                  // console.log("CT", currentTime);

  let day = date. toDateString().slice(0,3);
  let CD = date.toDateString().slice(4);
  let CT = date.toTimeString().slice(0,8);
                  // console.log("Cd", CD);
                  // console.log("Ct", CT);
                  // console.log("day", day)

  
  let fileName = currentDate.replaceAll(/ /g,'') + '-' + currentTime.replaceAll(/:/g,'.');
  let fileContent = day + ',' + CD.replaceAll(/ /g,'-') + ' ' + CT;
  const timeStamp = ` Current Updated Time : ${fileContent}`;

  fs.writeFileSync(`${dirPath}/${fileName}.txt`, timeStamp, (err) => {
      if (err) {
        return res.send({message: err});
      }
    });
    //res.sendFile(path.join(dirPath, `${fileName}.txt`));
    res.send({message: 'Current timestamp', timestamp: timeStamp});
    
});


//B) API endpoint to retrieve created file with use of foldername

app.get('/timestamp/:filename', function (req, res) {
  const {filename} = req.params;
  let file = filename+".txt";
  try{
      res.sendFile(path.join(dirPath,file));
  }
  catch(error){
      res.send({message:error});
  }

})


app.listen(PORT, () => console.log(`Server started in Localhost Port:9003`));
