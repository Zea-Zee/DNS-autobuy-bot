import fetch from "node-fetch";
import chalk from "chalk";
import fs from "fs"
import { time } from "console";
const APIKey = "09b6c080d1d47622c16e6145145be53e"
const userId = "2525894"
let numInfo = {
    number: "", 
    code: "",
    status: "",
    numId: ""
}

// async function takeNum(userData){
//     let data = (await fetch(`https://onlinesim.ru/demo/api/getNum.php?apikey=${APIKey}&service=dns-shop&number=true`)).json()
//     return data
// }

// function getNumberCode(userData){
//     console.log("step1");
//     return new Promise(function(resolve, reject){
//       try{
//         let confirmCode = ""
//         fs.writeFileSync(`./cash/(${emailData.user}).json`, JSON.stringify({code: ""}))
//         let mailInterval = setInterval(async () => {
//           await getEmails(userData)
//           confirmCode = JSON.parse(fs.readFileSync(`./cash/(${emailData.user}).json`)).msg
//           console.log("NUM25", confirmCode);
//             if(confirmCode){
//               console.log("confirmCode", confirmCode)
//               clearInterval(mailInterval)
//               resolve(confirmCode)
//             } else console.log("empty")
//         }, 500)
//       } catch(err){
//         console.log(chalk.red("ERROR Number 33str"));
//         console.log(err);
//       }
//     }).then(res => {
//       console.log(confirmCode)
//       return confirmCode
//     })
//   }

// async function takeCode(userData){
//     fetch(`https://onlinesim.ru/api/getState.php?apikey=${APIKey}&tzid=${userData.number.tzud}`, {
//         method: "POST",
//         body: {
//             tzid: +numInfo.numId
//         }
//     })
//     .then(response => response.json())
//     .then(result => {
//         fs.writeFileSync(`./cash/(${userData.user}).json`, result)
//     });
// }


async function takeNum(userData){
  try {
    let data = (await fetch(`https://onlinesim.ru/api/getNum.php?apikey=${APIKey}&service=dns-shop&number=true`)).json()
    return data
  } catch (err) {
    console.log(chalk.red("NUM ERROR"));
    console.log(err);
  }
}

function getNumberCode(userData){
  try {
    console.log("step1 - number");
    return new Promise(function(resolve, reject){
      try{
        let confirmCode = ""
        fs.writeFileSync(`./cash/(${userData.email.user}).json`, JSON.stringify(""))
        let mailInterval = setInterval(async () => {
          if(JSON.parse(fs.readFileSync(`./timeSol/num.json`))){
            await takeCode(userData)
            confirmCode = JSON.parse(fs.readFileSync(`./cash/(${userData.email.user}).json`))
            console.log("NUM33", confirmCode);
              if(confirmCode){
                  clearInterval(mailInterval)
                  resolve(confirmCode)
                  return confirmCode
              } else console.log("empty")
          } else console.log("NUM STOPPED");
        }, 15000)
      } catch(err){
        console.log(chalk.red("ERROR Number 42str"));
        console.log(err);
      }
    }).then(res => {
      console.log("NUM65:", res)
      return res
    })
  } catch (err) {
    console.log(chalk.red("NUM ERROR"));
    console.log(err);
  }
  }

async function takeCode(userData){

  try {
    fetch(`https://onlinesim.ru/api/getState.php?apikey=${APIKey}&tzid=${userData.mobile.tzid}`)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        //STUPID TIME SOLUTION
        if(result){
          if(result[0]){
            if(result[0].msg) fs.writeFileSync(`./cash/(${userData.email.user}).json`, JSON.stringify(result[0].msg))
          }
        }
    });
  } catch (err) {
    console.log(chalk.red("NUM ERROR"));
    console.log(err);
  }
}

function waitForStart(startTime){
  try {
    return new Promise(function(resolve, reject){
      let data = new Date()
      let timeLeft = ((data.getHours() - +startTime.slice(2, 4)) * 3600 + (data.getMinutes() - +startTime.slice(7, 9)) * 60 + (data.getHours() - +startTime.slice(12, 14))) * 1000
      console.log(-(timeLeft))
      setTimeout(() => {
        console.log("RESOLVED NUM");
        resolve("start")
      }, -timeLeft)
    })
  } catch (err) {
    console.log(chalk.red("NUM ERROR"));
    console.log(err);
  }
}


export {takeNum, takeCode, getNumberCode, waitForStart}