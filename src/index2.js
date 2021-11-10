let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // your code here

const getToys = ()=> {
    fetch ("http://localhost:3000/toys")
    .then (resp => resp.json())
    .then (jsonToys => {
        console.log(jsonToys);
        let arrayToys = jsonToys
        console.log(arrayToys)

        const makeToyCard = (toy) =>{
            let toyCard = document.createElement("div")
            toyCard.className = "card"
            let toyHeader = document.createElement("h2")
            toyHeader.textContent = toy["name"]
            let toyImage = document.createElement("img")
            toyImage.src = toy["image"]
            toyImage.className = "toy-avatar"
            let toyLikeNum = document.createElement("p")
            toyLikeNum.textContent = toy["likes"] + "  Likes"
            let toyButton = document.createElement("button")
            toyButton.textContent = "Like <3"
            toyButton.id = toy["id"]
            toyButton.className= ".like-btn"
            toyButton.addEventListener("click", ()=>{
                toyLikeNum.textContent = ++toy["likes"] + "  Likes"
            })
            
            //append area
            toyCard.append(toyHeader, toyImage, toyLikeNum, toyButton)
            let toyCollection = document.querySelector("#toy-collection")
            toyCollection.append(toyCard)
        } //end of makeToyCard function
    
    arrayToys.map(makeToyCard) //cannot access makeToyCard before initialization 



    }) //end of second .then with getToys fetch
}//end of getToys function
getToys()

const addNewToy = ()=> {
    let form = document.querySelector(".add-toy-form")
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        let newToyName = form.querySelector(".input-text").value
        let newToyImage = form.querySelector(".input-text2").value
        console.log(newToyName)
        console.log(newToyImage)
        makeNewToyCard(newToyName, newToyImage)
    })//end of form event listner
    form.reset()

   function makeNewToyCard(namePara, imagePara){
        let toyCard = document.createElement("div")
        toyCard.className = "card"
        let toyHeader = document.createElement("h2")
        toyHeader.textContent = namePara
        let toyImage = document.createElement("img")
        toyImage.src = imagePara
        toyImage.className = "toy-avatar"
        let toyLikeNum = document.createElement("p")
        startToyNum = 0
        toyLikeNum.textContent = startToyNum + "  Likes"
        let toyButton = document.createElement("button")
        toyButton.textContent = "Like <3"
        toyButton.className= ".like-btn"
        toyButton.addEventListener("click", ()=>{
            toyLikeNum.textContent = ++startToyNum + "  Likes"
        })
        //append area
        toyCard.append(toyHeader, toyImage, toyLikeNum, toyButton)
        let toyCollection = document.querySelector("#toy-collection")
        toyCollection.append(toyCard)
    } //end of makenewToyCard function
    
}// end of addNewToy function

addNewToy()



















})// this is the end of document event listener for DOM Content Loaded