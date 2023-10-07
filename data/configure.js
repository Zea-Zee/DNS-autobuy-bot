import fs from "fs"


let fullList = JSON.parse(fs.readFileSync("./fullList.json"))
let completeList = JSON.parse(fs.readFileSync("./completeUsers.json"))
let freeList = {
    someData: {
        simAPIKey: "09b6c080d1d47622c16e6145145be53e"
    },
    users: [

    ]
}

freeList.users = fullList.users

for(let i = 0; i < fullList.users.length; i++){
    for(let n = 0; n < completeList.completedUsers.length; n++){
        if(completeList.completedUsers[n].email.user === freeList.users[i].email.user){
            n--;
            
        }
    }
}

fs.writeFileSync("./freeList.json", JSON.stringify(freeList))