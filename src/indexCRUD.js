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

  //this is the GET
  const divToyCollection = document.querySelector("#toy-collection")

  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(resp => resp.json())
      .then(toyArray => {
        console.log(toyArray)

        toyArray.forEach(makeToyCard)

        function makeToyCard(eachToy) {
          const toyCard = document.createElement("div")
          toyCard.className = "card"
          const h2ToyName = document.createElement("h2")
          h2ToyName.textContent = eachToy.name
          const toyImage = document.createElement("img")
          toyImage.src = eachToy.image
          toyImage.className = "toy-avatar"
          const donateToy = document.createElement("button")
          donateToy.textContent = "Donate </3"
          donateToy.addEventListener("click", ()=>{
            toyCard.remove()
            deleteToy(eachToy.id)
            function deleteToy (idParam) {
              fetch(`http://localhost:3000/toys/${idParam}`,{
              method:"DELETE",
              headers:{
                "Content-Type":"application/json"
              }
              })//end of fetch in deleteToy
              .then (resp => resp.json())
              .then (dataToy => console.log(dataToy))
            }//end of deleteToy function
          })//end of donate event listener

          const toyLikeCount = document.createElement("p")
          toyLikeCount.textContent = eachToy.likes + "  Likes"
          const likeButton = document.createElement("button")
          likeButton.className = "like-btn"
          likeButton.textContent = "Like <3"
          likeButton.id = eachToy.id
          likeButton.addEventListener("click", () => {
            toyLikeCount.textContent = ++eachToy.likes + "  Likes"
            updateLikes(eachToy.id)
            function updateLikes(paramId) {
              fetch(`http://localhost:3000/toys/${paramId}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({"likes": eachToy.likes})
              }) //end of fetch PATCH
                  .then(resp => resp.json())
                  .then(oneToyData => console.log(oneToyData))
              }// end of function updateLikes
          })//end of like Button event listener




          toyCard.append(h2ToyName, toyImage, toyLikeCount, likeButton, donateToy)
          divToyCollection.append(toyCard)

        }//end of makeToyCard function

      })//end of fetchToys and second .then

  } //end of fetchToys function
  fetchToys()// this puts ORGINAL CARDS ON PAGE LOAD

  //this is the POST
  function addNewToy() {
    const form = document.querySelector(".add-toy-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let newToyName = e.target.name.value
      let newToyURL = e.target.image.value
      console.log(newToyName, newToyURL)

      let countStart = "0";

      let formToy = {
        "name": newToyName,
        "image": newToyURL,
        "likes": countStart
      }

      let configToys = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formToy)
      }// end of configToys variable
      fetch("http://localhost:3000/toys", configToys)
        .then(response => response.json())
        .then(toyData => {
          console.log(toyData.id)
          makeNewToyCard(newToyName, newToyURL, countStart, toyData.id)
        })
      e.target.reset()
    }) //end of form eventListener
  }//end of addNewToy form
  addNewToy() //end of POST/form

  function makeNewToyCard(nameParam, imageParam, likesParam, idParam) {
    const toyCard = document.createElement("div")
    toyCard.className = "card"
    const h2ToyName = document.createElement("h2")
    h2ToyName.textContent = nameParam
    const toyImage = document.createElement("img")
    toyImage.src = imageParam
    toyImage.className = "toy-avatar"
    let toyLikeCount = document.createElement("p")
    toyLikeCount.textContent = likesParam + "  Likes"
    const likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.textContent = "Like <3"
    likeButton.id = idParam
    likeButton.addEventListener("click", () => {
      toyLikeCount.textContent = ++likesParam + "  Likes"
    })// end of button eventListener

    //append to toyCard
    toyCard.append(h2ToyName, toyImage, toyLikeCount, likeButton)
    divToyCollection.append(toyCard)
  }// end of makeNewToyCard







})// THE END - end of DOMContentLoaded