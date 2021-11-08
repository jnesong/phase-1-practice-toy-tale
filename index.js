//document.addEventListener(DOMContentLoaded, ()=>{ 
    //don't think I need this bc the index.js file is linked at the bottom of the HTML doc

let form = document.querySelector(".add-toy-form")
    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        addToy4(e.target.value)
        form.reset()
    })

const addToy4 = function(){
    fetch("http://localhost:3000/toys/4")
        .then (function(resp){
            return resp.json()
        })
        .then (function (json){
            console.log(json)
            let toySlinkyDog = document.querySelector("#toy-collection")
            let toyName = document.createElement("h2")
            toyName = json["name"]
            toySlinkyDog.append(toyName)
            toySlinkyDog.id = json["id"] // this sets the id number
            console.log(toySlinkyDog)
            // the above code gets the toy name to be fetched... only if it its c/p'd into the console...
            let toyImage = document.createElement("img")
            toyImage.src = json["image"]
            toySlinkyDog.append(toyImage)
            // this adds the toy's image with the same issue of needing to c/p code into console...
            let toyLikes = document.createElement("p")
            toyLikes = json["likes"] + "  likes"
            toySlinkyDog.append(toyLikes)
        })
}  

//})