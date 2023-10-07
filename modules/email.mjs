import { clear } from "console";
import { createRequire } from "module";
import chalk from "chalk"
import fs from "fs"
const require = createRequire(import.meta.url);
const Imap = require("imap")
const {simpleParser} = require('mailparser');

// async function checkMessages(emailData){
//   let checkEmailInterval = setInterval(() => {
//     const code = JSON.stringify(fs.readFileSync(`../cash/${emailData}.json`))
//     if(code.length){
//       clearInterval(checkEmailInterval)
//     }
//   }, 5000)
// }

function getEmailCode(emailData, confirmCode, stage){
  console.log("step1");
  return new Promise(function(resolve, reject){
    try{
      fs.writeFileSync(`./cash/(${emailData.user}).json`, JSON.stringify({code: ""}))
      fs.writeFileSync(`./cash1/(${emailData.user}).json`, JSON.stringify({code: ""}))
      let mailInterval = setInterval(async () => {
        if(JSON.parse(fs.readFileSync(`./timeSol/num.json`))){
          await getEmails(emailData, confirmCode, stage)
          if(stage === 0) confirmCode = JSON.parse(fs.readFileSync(`./cash/(${emailData.user}).json`)).code
          else if(stage === 1) confirmCode = JSON.parse(fs.readFileSync(`./cash1/(${emailData.user}).json`)).code
          console.log("MAIL23", confirmCode);
            if(confirmCode){
              console.log("confirmCode", confirmCode)
              clearInterval(mailInterval)
              resolve(confirmCode)
            } else console.log("empty")
        } else console.log("MAIL STOPPED");
      }, 30000)
    } catch(err){
      console.log(chalk.red("ERROR EMAIL 34str"));
      console.log(err);
    }
  }).then(res => {
    console.log(confirmCode)
    return confirmCode
  })
}


function getEmails(emailData, codeVar, stage) {
    try {
        const imapConfig = {
            user: emailData.user,
            password: emailData.password,
            host: emailData.host,
            port: emailData.port,
            tls: emailData.tls,
            tlsOptions: {servername: 'imap.gmail.com'}
        };

      const imap = new Imap(imapConfig);
      imap.once('ready', () => {
        imap.openBox('INBOX', false, () => {
          imap.search([['TO', emailData.user]], (err, results) => {
            console.log(chalk.red("NOTHING TO FETCH"));
            console.log(results);
            if(results.length){
              const f = imap.fetch(results, {bodies: ''});
              f.on('message', msg => {
                msg.on('body', stream => {
                  simpleParser(stream, async (err, parsed) => {
                    const {from, subject, textAsHtml, text} = parsed;
                    //console.log("from", from);
                    const beginCodePos = parsed.html.indexOf("<strong>") + 8
                    const finishCodePos = parsed.html.indexOf("</strong>")
                    // console.log("pos:", chalk.yellow(parsed.html.slice(beginCodePos)));
                    // console.log("pos:", chalk.red(parsed.html.slice(beginCodePos, finishCodePos)));
                    // console.log(chalk.blue(parsed.to.text));
                    //console.log(parsed);
                      codeVar = parsed.html.slice(beginCodePos, finishCodePos)
                      console.log("66str", codeVar);
                      
                      if(stage === 1) fs.writeFileSync(`./cash1/(${emailData.user}).json`, JSON.stringify({code: codeVar}))
                      else fs.writeFileSync(`./cash/(${emailData.user}).json`, JSON.stringify({code: codeVar}))
                    // console.log("TO NEEEDED", emailData.user);
                    // console.log("TO real", chalk.magenta(parsed.to.text));
                    //fs.writeFileSync("data.json", JSON.stringify(parsed))
                    //console.log("28 string", "{{{{{{{{{{{{{{{{{{{", parsed, "}}}}}}}}}}}}}}}}}}}}}}}}}}");
                    /* Make API call to save the data
                       Save the retrieved data into a database.
                       E.t.c
                    */
                  });
                });
                msg.once('attributes', attrs => {
                  const {uid} = attrs;
                  imap.addFlags(uid, ['\\Deleted'], () => {
                    // Mark the email as read after reading it
                    //console.log('Marked as read!');
                  });
                });
              });
              f.once('error', ex => {
                //imap.closeBox()
                imap.end();
                return Promise.reject(ex);
              });
              f.once('end', () => {
                //console.log(mailData);
                // fs.writeFileSync("data.json", JSON.stringify(mailData))
                console.log('Done fetching all messages!');
                imap.end();
              });
            } else{
              console.log(chalk.red("NOTHING TO FETCH"));
              console.log(results);
              imap.end();
            }
          });
        });
      });
  
      imap.once('error', err => {
        console.log(err);
        //imap.closeBox()
        imap.end();
      });
  
      imap.once('end', () => {
        console.log('Connection ended');
        imap.end();
        // fs.writeFileSync("data.json", JSON.stringify(mailData))
      })
  
      imap.connect()
    } catch (ex) {
      console.log('an error occurred');
      console.log(ex);
    }
  }



  export {getEmails, getEmailCode}