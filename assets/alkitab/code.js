const Books = require("./Books.json")
const fs = require("fs")

let l1 = []
let count = 0

for (var key in Books){
    l1.push({
        id: count,
        abb: key,
        title: Books[key].name,
        total: Books[key].total
    })
    count++
}

console.log(JSON.stringify(l1))