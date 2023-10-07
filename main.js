import puppeteer from "puppeteer";
import fs from "fs"
import path from "path"
import chalk from "chalk"

import * as emailModule from "./modules/email.mjs"
import * as numberModule from "./modules/number.mjs"
import * as autorizeModule from "./modules/autorizeV2.mjs"
let users = JSON.parse(fs.readFileSync("./data/freeList.json")).users
users = users.slice(0, 5)
let usersR = JSON.parse(fs.readFileSync("./data/completeUsers.json")).completedUsers
console.log(usersR);
console.log("usersR");

async function createNewBrowser(name, proxy){
    try{

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 1,
            args: [
                (proxy ? `--proxy-server=https=${proxy.ipPort}` : ""),
                // `--proxy-server=45.81.137.53:1050`,
                `--window-size=300,900`,
                '--disable-web-security'
            ],
            ignoreDefaultArgs: ["--enable-automation"],
            userDataDir: `./browsersData/${name}`,
            defaultViewport: null,
            devtools: false,
            ignoreHTTPSErrors: true,
        })
        // if(proxy){
        //     const pageP = await browser.newPage()
        //     await pageP.authenticate({
        //         // username: userData.proxy.login,
        //         // password: userData.proxy.password
        //         username: "Zm0lvf",
        //         password: "NGeGtHVA8m"
        //     });
        //     await pageP.goto("https://2ip.ru")
        //     await pageP.close()
        // }
        console.log("BROWSER", browser);
        console.log(name);
        return browser
    } catch (err){
        console.log(`${chalk.red("CATCH ERROR: ")} ${err}`);
    }
}

//CLEANING
    fs.readdir("./cash", (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join("./cash", file), err => {
        if (err) throw err;
      });
    }
  });
  fs.readdir("./cash1", (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join("./cash1", file), err => {
        if (err) throw err;
      });
    }
  });
//   fs.readdir("./browsersData", (err, files) => {
//     if (err) throw err;
  
//     for (const file of files) {
//       fs.unlink(path.join("./browsersData", file), err => {
//         if (err) throw err;
//       });
//     }
//   });


let counter = 0
const stage = 1
let browserInterval = setInterval(async() => {
    if(counter < users.length && stage === 0){
        let browser = await createNewBrowser(users[counter].email.user, users[counter].proxy)
        users[counter].browser = browser
        browserManage(browser, {
            index: counter,
            name: users[counter].email.user
        })
    } else if(counter < usersR.length && stage === 1){
        let browser = await createNewBrowser(usersR[counter].email.user, usersR[counter].proxy)
        usersR[counter].browser = browser
        browserExplore(browser, {
            index: counter,
            name: usersR[counter].email.user
        })
    }
    else{
        clearInterval(browserInterval)
    }
    counter++
}, 5000)


async function browserManage(browser, data){
    try{
        //console.log(autorizeModule.autorizeDNS);
        autorizeModule.autorizeDNS(browser, users[data.index], 1)
        .then(page => {
            autorizeModule.autorizeDNS(browser, users[data.index], 3, page)
            .then(res => {
                //fs.writeFileSync(`./cash/${data.email}.json`, JSON.stringify({}))
                //console.log(emailModule.getEmailCode);
                console.log("DATAIM");
                console.log(users[data.index].email);
                emailModule.getEmailCode(users[data.index].email, "", 0).then(resolve => {
                    console.log("RESOLVE MAIN EMAIL:", resolve);
                    users[data.index].email.codes[0] = resolve
                    autorizeModule.autorizeDNS(browser, users[data.index], 4, page)
                    .then(async (res4) => {
                        await autorizeModule.autorizeDNS(browser, users[data.index], 7, page).then((res7) => {
                            numberModule.waitForStart(users[data.index].startData.startTime).then(async (numW) => {
                                console.log("RESOLVED MAIN");
                                let numberData = await numberModule.takeNum()
                                users[data.index].mobile.number = numberData.number
                                users[data.index].mobile.tzid = numberData.tzid
                                autorizeModule.autorizeDNS(browser, users[data.index], 5, page).then(res5 => {
                                    numberModule.getNumberCode(users[data.index]).then(numRes => {
                                        console.log("MAIN86:", numRes);
                                        console.log("numres", numRes);
                                        users[data.index].mobile.code = numRes
                                        autorizeModule.autorizeDNS(browser, users[data.index], 6, page).then(res6 => {
                                            emailModule.getEmailCode(users[data.index].email, "", 1).then(passCode => {
                                                console.log("PASS MAIN EMAIL:", passCode);
                                                users[data.index].email.codes[1] = passCode
                                                autorizeModule.autorizeDNS(browser, users[data.index], 10, page).then(tenStage => {
                                                    console.log(users[data.index].email.user, chalk.green("IS FINISHED"));
                                                    let completedUsers = JSON.parse(fs.readFileSync("./data/completeUsers.json"))
                                                    const usersD = JSON.parse(fs.readFileSync("./data/usersData.json"))
                                                    // console.log(usersD.users[data.index]);
                                                    // console.log(data.index);
                                                    let writeObj = {
                                                        name: users[data.index].name,
                                                        lastName: users[data.index].lastName,
                                                        birthDate: users[data.index].birthDate,
                                                        nickName: users[data.index].nickName,
                                                        password: "dnsZalupa1488",
                                                        email: {
                                                            user: users[data.index].email.user,
                                                            password: "ALbukerke47",
                                                            host: "imap.gmail.com",
                                                            port: 993,
                                                            tls: true,
                                                            tlsOptions: {
                                                                servername: "imap.gmail.com"
                                                            },
                                                            codes: [
                                            
                                                            ]
                                                        },
                                                        mobile: {
                                                            number: 0,
                                                            tzid: 0,
                                                            mobileCodes: []
                                                        },
                                                        proxy: {
                                                            ipPort: users[data.index].proxy.ipPort,
                                                            login: users[data.index].proxy.login,
                                                            password: users[data.index].proxy.password
                                                        },
                                                        startData: {
                                                            startTime: "h:8 m:00 s:00",
                                                            href: "https://www.dns-shop.ru/ordering/9ef8c6972239a8ec/",
                                                            position: 1
                                                        },
                                                        isError: false,
                                                        isFilled: true
                                                }
                                                    completedUsers.completedUsers.push(writeObj)
                                                    fs.writeFileSync("./data/completeUsers.json", JSON.stringify(completedUsers))
                                                    


                                                    let freeList = JSON.parse(fs.readFileSync("./data/freeList.json"))
                                                    for(let i = 0; i < freeList.users.length; i++){
                                                        let userObj = freeList.users[i]
                                                        if(userObj.email.user === users[data.index].email.user){
                                                            let firstHalf = freeList.users.slice(0, i)
                                                            let secondHalf = freeList.users.slice(i + 1)
                                                            freeList.users = firstHalf.concat(secondHalf)
                                                            fs.writeFileSync("./data/freeList.json", JSON.stringify(freeList))
                                                        }
                                                    }
                                                })
                                            })
                                        })
                                    })  
                                })
                            })
                        })
                    })
                })
            })
        })
    } catch(err){
        console.log("MAIN 69: ");
        console.log(err);
        users[data.index].isError = true
    }
}

async function browserExplore(browser, data){
    try{
        //console.log(autorizeModule.autorizeDNS);
        autorizeModule.autorizeDNS(browser, usersR[data.index], 1)
        .then(page => {
            autorizeModule.autorizeDNS(browser, usersR[data.index], 3, page, true)
            .then(res => {
                console.log("DATAIM");
                console.log(usersR[data.index].email);
                //page.goto("https://www.dns-shop.ru/search/?q=3070+ti&order=price-asc")
                usersR[data.index].isFilled = true
                autorizeModule.autorizeDNS(browser, usersR[data.index], 11, page, true)
                console.log("NICE NICE NICE NICE NICE NICE");  
            })
        })
    } catch(err){
        console.log("MAIN 69: ");
        console.log(err);
        users[data.index].isError = true
    }
}