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
  
//your code here

  // let form = document.querySelector(".add-toy-form")
  //   form.addEventListener("submit", (e) => {
  //      e.preventDefault()
  //      let newToyName = form.querySelector(".input-text").value
  //     console.log(newToyName)
  //     postNewToy(newToyName)
  //     form.reset()
  //   })//end of form eventListener 

  let arrayToys = []//creating an empty array to fill with json data

  const getTheToys = function(){
      fetch("http://localhost:3000/toys")
      .then ((resp) => resp.json())
      .then ((json) => {
        console.log(json) // check what data is being pulled from the server
        let arrayToys = json
        console.log (arrayToys) // check that the data is in the array

        const makeToyCard = function(toy){ // don't forget to put toy/item as a parameter!
          let toyCard = document.createElement("div")
          toyCard.className = "card"
          let toyCollection = document.querySelector("#toy-collection")
          let toyHeader = document.createElement("h2")
          toyHeader.textContent = toy["name"]
          console.log(toyHeader)
          let toyImage = document.createElement("img")
          toyImage.src = toy["image"]
          toyImage.className = "toy-avatar"
          let toyLikes = document.createElement("p")
          toyLikes.textContent = toy["likes"] + " Likes" //don't forget .textContent here
          let toyButton = document.createElement("button")
          toyButton.textContent = "Like <3"
          toyButton.className = "like-btn"
          toyButton.id = toy["id"]
          toyButton.addEventListener("click", ()=>{
            toyLikes.textContent = ++toy["likes"] + " likes"
          })//end of toyButton event listener

          //append to toy collection
          toyCard.append(toyHeader, toyImage, toyLikes, toyButton,)
          toyCollection.append(toyCard)
          
        }// end of makeToyCard function

        arrayToys.forEach(makeToyCard);

      
      })//end of second .then()

    }//end of postTheToys function
  
    getTheToys()

  // const postNewToy = function (newToyName) {
  //   fetch ("http://localhost:3000/toys"), {
  //     method: "POST", 
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },//end of headers
  //     body:JSON.stringify(newtoyName)
  //   }//end of fetch second argument
  //   .then(res => res.json())
  //   .then(animal => console.log(toy))
  // }//end of postNewToy function

});// this is the end curly brace of the DOMContentLoaded event listener
