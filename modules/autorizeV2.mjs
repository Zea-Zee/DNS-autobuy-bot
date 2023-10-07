import puppeteer from "puppeteer";
import chalk from "chalk"

async function autorizeDNS1(browser, login, params, password){
    try{
        //OPEN PAGE AND PREPARE FOR START
        const page = await browser.newPage();
        if(config.config.isMobile){
            await page.emulate(puppeteer.devices['iPhone XR'])
            await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1")
        }
        await page.goto("dns-shop.ru")

        //SELECT CITY
        await page.waitForSelector(".w-choose-city-widget-label")
        await page.evaluate(city => {

        }, city)




        //AUTORIZE

        await page.goto("https://www.dns-shop.ru/profile/menu")
        await page.waitForSelector(".user-page__login-btn")
        await page.evaluate(() => {
            document.querySelector(".user-page__login-btn").click()
        }, city)

        await page.waitForSelector(".form-entry-or-registry__inputn")
        await page.evaluate(() => {
            document.querySelector(".form-entry-or-registry__input").querySelector("input").click()
        }, city)
        await page.keyboard.type(login, {delay: 400})
        await page.keyboard.press("Enter")

        await page.waitForSelector(".form-confirm-code__input")
        await page.evaluate(() => {
            document.querySelector(".form-confirm-code__input").querySelector("input").click()
        }, city)
        await page.keyboard.type(login, {delay: 400})
        await page.keyboard.press("Enter")
    } 
    catch(err){
        console.log(err);
    }
}




async function autorizeDNS(browser, userData, part, page, signIn){
    try{
        //OPEN PAGE AND PREPARE FOR START
        if(part === 1){
            const page = await browser.newPage();
            //await page.emulate(puppeteer.devices['iPhone XR'])
            //await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1")
            await page.setDefaultNavigationTimeout(3000000); 
            if(userData.proxy){
                await page.authenticate({
                    username: userData.proxy.login,
                    password: userData.proxy.password
                    // username: "Zm0lvf",
                    // password: "NGeGtHVA8m"
                });
                console.log("useauth");
            }
            // await page.goto("dns-shop.ru")
            return page
        }




        // //SELECT CITY
        if(part === 2){
            // await page.waitForSelector(".w-choose-city-widget-label")
            // await page.evaluate(city => {

            // }, city)
        }




        //AUTORIZE
        if(part === 3){
            let isFinished = false
            while(!isFinished){
                try{
                    isFinished = true
                    //ENTER EMAIL
                    await page.goto("https://www.dns-shop.ru/profile/menu")
                    await page.waitForTimeout(1500)
                    await page.waitForSelector(".w-choose-city-widget")
                    await page.waitForSelector(".user-page__login-btn")
                    await page.waitForTimeout(1500)
                    await page.evaluate(() => {
                        let usrpg = document.querySelector(".user-page")
                        usrpg.querySelector(".w-choose-city-widget").click()
                        usrpg.querySelector(".w-choose-city-widget").click()
                        usrpg.querySelector(".w-choose-city-widget").click()
                    })
                    await page.waitForTimeout(1000)
                    //await page.waitForSelector(`input[data-role="search-city"]`)
                    await page.focus(`input[data-role="search-city"]`)
                    await page.keyboard.type("Иркутск", {delay: 47})
                    await page.keyboard.press("Enter")
                    // await page.waitForSelector(".chat-btn_load")
                    console.log("auth 98");
                    await page.waitForTimeout(1500)




            if(signIn){
                await page.goto("https://www.dns-shop.ru/profile/menu", {waitUntil: 'domcontentloaded', timeout: 0})
                await page.waitForSelector(".user-page__login-btn")
                await page.waitForTimeout(1500)
                await page.evaluate(() => {
                    document.querySelector(".user-page__login-btn").click()
                })
                console.log("auth 113");
                await page.waitForSelector(".form-entry-or-registry__input")
                await page.evaluate(() => {
                    document.querySelector(".block-other-login-methods__password-caption").click()
                })
                console.log("mail 118");
                await page.focus(`input[autocomplete="username"]`)
                await page.keyboard.type(userData.email.user, {delay: 125})
                await page.focus(`input[autocomplete="current-password"]`)
                await page.waitForTimeout(1000)
                await page.keyboard.type(userData.password, {delay: 145})
                await page.keyboard.press("Enter")
                await page.keyboard.press("Enter")
                await page.keyboard.press("Enter")
                console.log("auth 122");
            } else {
                await page.goto("https://www.dns-shop.ru/profile/menu", {waitUntil: 'domcontentloaded', timeout: 0})
                await page.waitForSelector(".user-page__login-btn")
                await page.waitForTimeout(1500)
                await page.evaluate(() => {
                    document.querySelector(".user-page__login-btn").click()
                })
                console.log("auth 113");
                await page.waitForSelector(".form-entry-or-registry__input")
                // await page.evaluate(() => {
                //     document.querySelector(".form-entry-or-registry__input").querySelector("input").click()
                // })
                console.log("mail 118");
                await page.focus(".base-ui-input-row__input")
                await page.keyboard.type(userData.email.user, {delay: 125})
                await page.keyboard.press("Enter")
                await page.keyboard.press("Enter")
                await page.keyboard.press("Enter")
                console.log("auth 122");
            }
            await page.waitForTimeout(25000)
            isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }

            // const isAutorized = await page.evaluate(() => {
            //     // const name = document.querySelector(".user-page__user-name").querySelector("p").innerText;
            //     // if(name.toLowerCase().indexOf("гость") !== -1) return true
            //     // else return false
            //     if(document.querySelector(".user-page__user-name").querySelector("p")) return true
            //     else return false 
            // })
        }
    
        // await page.evaluate(() => {
        //     document.querySelector(".form-confirm-code__input").querySelector("input").click()
        // })
        // await page.focus(".rc-anchor-content")
        // await page.focus(".recaptcha-checkbox-border")
        // await page.mouse.click()
        // userData.code = await page.evaluate(() => {
        //     return prompt("Введите код")
        // })


        //CONFIRM EMAIL
        if(part === 4){
            let isFinished = false
            while(!isFinished){
                try{
                    await page.waitForSelector(".form-confirm-code__input")
                    await page.focus(".base-ui-input-row__input")
                    await page.keyboard.type(userData.email.codes[0], {delay: 141})
                    await page.keyboard.press("Enter")       
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }


        //NNED TO ORDER NUMBER.then
        if(part === 5){
            //enter ordered num and then wait for code
            // await page.goto("https://profile.dns-shop.ru")
            // await page.waitForSelector(".setting__list")

            let isFinished = false
            while(!isFinished){
                try{
                    await page.goto("https://profile.dns-shop.ru", {waitUntil: 'domcontentloaded', timeout: 0})
                    await page.waitForTimeout(1000)
                    await page.waitForSelector(`input[name="ProfileSettingsForm[phone]"]`)
                    await page.waitForTimeout(1000)
                    await page.focus(`input[name="ProfileSettingsForm[phone]"]`)
                    const isNumbered = await page.evaluate(() => {
                        const number = document.querySelector(`input[name="ProfileSettingsForm[phone]"]`).value
                        if(number.length > 3) return true
                        else return false
                    })
                    await page.focus(`input[name="ProfileSettingsForm[phone]"]`)
                    await page.keyboard.type(`${userData.mobile.number.slice(2)}`, {delay: 141})
                    await page.keyboard.press("Enter")
                    await page.click(".personal-info-confirm-container__btn")       
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }

        //CONFIRM NUMBER
        if(part === 6){

            let isFinished = false
            while(!isFinished){
                try{
                    //ENTER NUMBER CODE
                    await page.waitForSelector(`input[class="base-ui-input-row__input"]`)
                    await page.focus(`input[class="base-ui-input-row__input"]`)
                    await page.keyboard.type(userData.mobile.code, {delay: 78})
                    await page.keyboard.press("Enter")
                    //part = 8;
                    part = 9       
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }
            // // await page.focus(`div[data-role="phone-confirm-btn-container"] > button[data-role="confirm-btn"]`)
            // await page.click(`button[data-role="confirm-btn"]`)
            // await page.waitForSelector(".setting__list")
            // await page.focus(`.base-phone-confirm-code-check__input`)
            // userData.numCode = await page.evaluate(() => {
            //     return prompt("Введите код")
            // })
            // await page.keyboard.type(userData.numCode, {delay: 141})
            // await page.keyboard.press("Enter")

            // await page.focus(`input[name="ProfileSettingsForm[firstname]"]`)
            // await page.evaluate(() => {
            //     document.querySelector(`input[name="ProfileSettingsForm[firstname]"]`).value = ""
            // })
            // await page.keyboard.type(userData.name, {delay: 141})
            // await page.keyboard.press("Enter")

            // await page.focus(`input[name="ProfileSettingsForm[lastname]"]`)
            // await page.evaluate(() => {
            //     document.querySelector(`input[name="ProfileSettingsForm[lastname]"]`).value = ""
            // })
            // await page.keyboard.type(userData.lastName, {delay: 141})
            // await page.keyboard.press("Enter")

            // await page.focus(`input[name="ProfileSettingsForm[nickname]"]`)
            // await page.evaluate(() => {
            //     document.querySelector(`input[name="ProfileSettingsForm[nickname]"]`).value = ""
            // })
            // await page.keyboard.type(userData.nickName, {delay: 141})
            // await page.keyboard.press("Enter")

            // await page.focus(`input[name="ProfileSettingsForm[birthdate]"]`)
            // await page.evaluate(() => {
            //     document.querySelector(`input[name="ProfileSettingsForm[birthdate]"]`).value = ""
            // })
            // await page.keyboard.type(userData.birthDate, {delay: 141})
            // await page.keyboard.press("Enter")


        //ENTER USER DATA
        if(part === 7){

            let isFinished = false
            while(!isFinished){
                try{
                    await page.waitForTimeout(5000)
                    await page.goto("https://profile.dns-shop.ru", {waitUntil: 'domcontentloaded', timeout: 0})
                    await page.waitForSelector(".setting__list")
                    await page.waitForSelector(`input[name="ProfileSettingsForm[firstname]"]`)
                    await page.waitForTimeout(500)
                    await page.focus(`input[name="ProfileSettingsForm[firstname]"]`)
                    await page.keyboard.down('Control');
                    await page.keyboard.press('KeyA');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await page.keyboard.type(userData.name, {delay: 97})
                    await page.keyboard.press("Enter")
                    await page.waitForTimeout(5000)
            
                    await page.focus(`input[name="ProfileSettingsForm[lastname]"]`)
                    await page.keyboard.down('Control');
                    await page.keyboard.press('KeyA');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await page.keyboard.type(userData.lastName, {delay: 121})
                    await page.keyboard.press("Enter")
                    await page.waitForTimeout(5000)
            
                    await page.focus(`input[name="ProfileSettingsForm[nickname]"]`)
                    await page.keyboard.down('Control');
                    await page.keyboard.press('KeyA');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await page.keyboard.type(`${"stock"}${(Math.random()*Math.random()).toFixed(7)}`, {delay: 251})
                    await page.keyboard.press("Enter")
                    await page.waitForTimeout(5000)
            
                    await page.focus(`input[name="ProfileSettingsForm[birthdate]"]`)
                    await page.keyboard.down('Control');
                    await page.keyboard.press('KeyA');
                    await page.keyboard.up('Control');
                    await page.keyboard.press('Backspace');
                    await page.keyboard.type(userData.birthDate, {delay: 451})
                    await page.keyboard.press("Enter")
                    await page.waitForTimeout(5000)       
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }

        if(part === 8 ){
            // await page.goto(`${userData.startData.href}`)
            // await page.waitForTimeout(10000)
            // await page.goto("https://2ip.ru/")

            let isFinished = false
            while(!isFinished){
                try{
                    
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }

                await page.goto("https://www.dns-shop.ru/ordering/8b6ff8517e7cdce9/", {waitUntil: 'load', timeout: 0})
                await page.waitForSelector(".hype-landing-products")
                await page.waitForSelector(".hype-landing-products__item-button")
                await page.evaluate(() => {
                    let cardz = document.querySelector(".hype-landing-products")
                    let card = cardz.querySelectorAll(".hype-landing-products__item")[2]
                    card.querySelector(".hype-landing-buy-button").click()
                })

                let startTime = "h:15 m:00 s:30"
                let data = new Date()
                let timeLeft = ((data.getHours() - +startTime.slice(2, 4)) * 3600 + (data.getMinutes() - +startTime.slice(7, 9)) * 60 + (data.getHours() - +startTime.slice(12, 14))) * 1000
                console.log(-(timeLeft))
                let counter = 0;
                let maxCounter = 6
                setTimeout(() => {
                    let inter = setInterval(() => {
                        if(counter <= maxCounter){
                            if(counter !== 2 && counter !== 3 && counter !== 4 && counter !== 7){
                                let cardz = document.querySelector(".hype-landing-products")
                                let card = cardz.querySelectorAll(".hype-landing-products__item")[counter]
                                card.querySelector(".hype-landing-buy-button").click()
                            }
                            counter++
                        } else {
                            counter = 0;
                        }
                    }, 9000)
                    setTimeout(() => {
                        clearInterval(inter)
                    }, 6000000)
                }, -timeLeft)
        }

        if(part === 9){
            //base-modal__header-close-icon
            let isFinished = false
            while(!isFinished){
                try{
                    await page.waitForTimeout(1500)
                    await page.evaluate(() => {
                        try {
                            if(document.querySelector(".base-modal__header-close-icon")) document.querySelector(".base-modal__header-close-icon").click()
                        } catch (err) {
                            console.log("evaluate error 394 str");
                            console.log(err);
                        }
                    })
                    await page.evaluate(() => {
                        document.querySelector(`a[data-role="personal-info-password-change"]`).click()
                    })
                    await page.waitForSelector(`.base-ui-input-row__input[type="password"]`)
                    await page.focus(`.base-ui-input-row__input[type="password"]`)
                    await page.keyboard.type(userData.password, {delay: 427})
                    //await waitForTimeout(5000)       
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }


        if(part === 10){

            let isFinished = false
            while(!isFinished){
                try{
                    await page.focus(`.base-ui-input-row__input_with-icon[type="tel"]`)
                    await page.keyboard.type(userData.email.codes[1], {delay: 141})
                    await page.waitForTimeout(5000)
                    await page.keyboard.press("Enter")  
                    await page.waitForTimeout(30000)
                    await page.evaluate(() => {
                        if(document.querySelector(".base-ui-button_big-flexible-width")) document.querySelector(".base-ui-button_big-flexible-width").click()
                    })     
                    isFinished = true
                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }

        if(part === 11){

            let isFinished = false
            while(!isFinished){
                try{
                    await page.goto("https://www.dns-shop.ru/ordering/2b4d2c1bfebff938/")
                    await page.waitForSelector(".hype-landing-products")
                    await page.waitForSelector(".hype-landing-products__item-button")
                    await page.waitForTimeout(255)
                    await page.evaluate(() => {
                        try {
                            let buttons = document.querySelectorAll(".hype-landing-products__item-button")
                            buttons[0].click

                        } catch (err) {
                            console.log(err);
                        }
                    })     
                    isFinished = true

                    let startTime = "h:15 m:00 s:30"
                    let data = new Date()
                    let timeLeft = ((data.getHours() - +startTime.slice(2, 4)) * 3600 + (data.getMinutes() - +startTime.slice(7, 9)) * 60 + (data.getHours() - +startTime.slice(12, 14))) * 1000
                    console.log(-(timeLeft))
                    let counter = 0;
                    let maxCounter = 6
                    setTimeout(() => {
                        let inter = setInterval(async () => {
                            if(counter <= maxCounter){
                                if(counter !== 2 && counter !== 3 && counter !== 4 && counter !== 7){
                                    await page.evaluate(() => {
                                        try {
                                            let cardz = document.querySelector(".hype-landing-products")
                                            let card = cardz.querySelectorAll(".hype-landing-products__item")[counter]
                                            card.querySelector(".hype-landing-buy-button").click()
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    })
                                }
                                counter++
                            } else {
                                counter = 0;
                            }
                        }, 9000)
                        setTimeout(() => {
                            clearInterval(inter)
                        }, 6000000)
                    }, -timeLeft)

                } catch(err){
                    console.log(chalk.red("ERROR AT  STR"))
                    console.log(err);
                }
            }
        }

        if(part === "test"){
            await page.goto("https://2ip.ru")
            await page.waitForTimeout(100000)
        }

    } 
    catch(err){
        console.log(err);
        userData.isError = true
    }
}



export {autorizeDNS}