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
          const toyLikeCount = document.createElement("p")
          toyLikeCount.textContent = eachToy.likes + "  Likes"
          const likeButton = document.createElement("button")
          likeButton.className = "like-btn"
          likeButton.textContent = "Like <3"
          likeButton.id = eachToy.id
          likeButton.addEventListener("click", () => {
            toyLikeCount.textContent = ++eachToy.likes + "  Likes"
          })
          toyCard.append(h2ToyName, toyImage, toyLikeCount, likeButton)
          divToyCollection.append(toyCard)

        }//end of makeToyCard function

      })//end of fetchToys and second .then

  } //end of fetchToys function
  fetchToys()// this puts ORGINAL CARDS ON PAGE LOAD

  //BELOW IS CRUD


  function addNewToy() {
    const form = document.querySelector(".add-toy-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      let newToyName = e.target.name.value
      let newToyURL = e.target.image.value
      console.log(newToyName, newToyURL)

      //POST starts here

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
        .then(newData => console.log(newData))

      makeNewToyCard(newToyName, newToyURL, countStart)
      e.target.reset()
    }) //end of form eventListener



  }//end of addNewToy form
  addNewToy()

  function makeNewToyCard(nameParam, imageParam, likesParam) {
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
    likeButton.addEventListener("click", () => {
      toyLikeCount.textContent = ++likesParam + "  Likes"
    })// end of button eventListener
    toyCard.append(h2ToyName, toyImage, toyLikeCount, likeButton)
    divToyCollection.append(toyCard)
  }// end of makeNewToyCard






})// THE END - end of DOMContentLoaded