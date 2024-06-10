//const imageForm = document.querySelector("#imageForm")
//const imageInput = document.querySelector("#imageInput")
const imageSubmit= document.querySelector("#imageSubmit")
const imageInput1 = document.querySelector("#image1")
const imageInput2 = document.querySelector("#image2")
const imageInput3 = document.querySelector("#image3")
const imageInput4 = document.querySelector("#image4")
const imageInput5 = document.querySelector("#image5")
const imageInput6 = document.querySelector("#image6")
const imageInput7 = document.querySelector("#image7")
const imageInput8 = document.querySelector("#image8")

function previewImage(input) {
  var imgPreview = document.getElementById(input.id + "-preview");
  imgPreview.src = window.URL.createObjectURL(input.files[0]);
}



var dirPath;
var countFiles = "1";

async function createDirPath(countFiles){
  return "dir-"+countFiles+"-"+Date.now()+"/"
}

async function putImage(file, imagePath){
  setTimeout(function() {
    getButton.style.display = "block"; // Make the get button visible
  }, 5000);
  const { uploadURL} = await fetch("/upload/"+imagePath).then(res => res.json())
  console.log({uploadURL})

  await fetch(uploadURL, {
    method: "PUT",
    headers:  {
      "Content-Type": "multipart/form-data"
    },
    body: file
  })
}


/*
imageForm.addEventListener("get-image", async event => {
  event.preventDefault()
  const userInputElement = document.getElementById("user-input");
  const enteredText = userInputElement.value;
  if (!enteredText){
    console.log("Please enter file name to download");
    const newHeading = document.createElement("h2");
    newHeading.textContent = "Please enter file name to download";
    const targetElement = document.getElementById("imageForm");
    targetElement.appendChild(newHeading);
  }
  else{
    // get secure url from our server

    const { downloadURL} = await fetch("/output/"+enteredText).then(res => res.json());
    console.log({downloadURL});

  // post the image direclty to the s3 bucket
  }
})*/
imageSubmit.addEventListener("submit", async event =>{
  event.preventDefault()
  const file1 = imageInput1.files[0]
  const file2 = imageInput2.files[0]
  const file3 = imageInput3.files[0]
  const file4 = imageInput4.files[0]
  const file5 = imageInput5.files[0]
  const file6 = imageInput6.files[0]
  const file7 = imageInput7.files[0]
  const file8 = imageInput8.files[0]
  
  if (!file1 ){
    console.log("No file to upload");
    alert("No file to upload")
    const targetElement = document.getElementById("imageForm");
    targetElement.appendChild(newHeading);
  }
  else{
    
    console.log(dirPath)
    if(file2){
      countFiles="2"
    }
    if(file3){
      countFiles="3"
    }
    if(file4){
      countFiles="4"
    }
    if(file5){
      countFiles="5"
    }
    if(file6){
      countFiles="6"
    }
    if(file7){
      countFiles="7"
    }
    if(file8){
      countFiles="8"
    }
    dirPath = await createDirPath(countFiles);
    await putImage(file1, dirPath+"image1.bmp")
    if(file2){
      await putImage(file2, dirPath+"image2.bmp")  
    }
    if(file3){
      await putImage(file3, dirPath+"image3.bmp")  
    }
    if(file4){
      await putImage(file4, dirPath+"image4.bmp")  
    }
    if(file5){
      await putImage(file5, dirPath+"image5.bmp")  
    }
    if(file6){
      await putImage(file6, dirPath+"image6.bmp")  
    }
    if(file7){
      await putImage(file7, dirPath+"image7.bmp")  
    }
    if(file8){
      await putImage(file8, dirPath+"image8.bmp")  
    }
  }





})

const uploadButton = document.querySelector("#uploadButton"); // Adjust selector for your upload button
const getButton = document.querySelector("#getButton"); // Adjust selector for your get button
getButton.style.display = "none";

async function getImage(){
  //const userInputElement = document.getElementById("user-input");
  //const enteredText = userInputElement.value;
  //if (!enteredText){
    //console.log("Please enter file name to download");
    //const newHeading = document.createElement("h2");
    //newHeading.textContent = "Please enter file name to download";
    //const targetElement = document.getElementById("imageForm"); 
    //targetElement.appendChild(newHeading);
  //}

  //else{
    // get secure url from our server

  


  var enteredText1 = dirPath.split("/")
  var enteredText = enteredText1[0]+".bmp"
  console.log(enteredText);
  const { downloadURL} = await fetch("/output/"+enteredText).then(res => res.json());
  console.log({downloadURL});
  const img = document.createElement("img")
  img.src = downloadURL
  document.body.appendChild(img)
  // post the image direclty to the s3 bucket
  //}
}


/*imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file1 = imageInput.files[0]
    if (!file1 ){
      console.log("No file to upload");
      const targetElement = document.getElementById("imageForm");
      targetElement.appendChild(newHeading);
    }
    else{
      // get secure url from our server
      const userInputElement = document.getElementById("user-input");

      // Get the value entered by the user
      const enteredText = userInputElement.value;
      const { uploadURL} = await fetch("/upload/"+enteredText).then(res => res.json())
      console.log({uploadURL})
  
    // post the image direclty to the s3 bucket
      await fetch(uploadURL, {
        method: "PUT",
        headers:  {
          "Content-Type": "multipart/form-data"
        },
        body: file1
      })
    // post requst to my server to store any extra data
  }
  })*/

  function clearImage(buttonElement) {
    // Get the parent container of the button
    const imageUploadContainer = buttonElement.parentElement;
  
    // Get the file input element within the container
    const fileInput = imageUploadContainer.querySelector('input[type="file"]');
  
    // Reset the value of the file input element
    fileInput.value = null;
  
    // Clear the image preview
    const imagePreview = imageUploadContainer.querySelector('img');
    imagePreview.src = "";
  
  }