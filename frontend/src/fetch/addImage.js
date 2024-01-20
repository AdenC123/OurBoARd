import {addImageSlug, serverLink} from "./utils";

// Takes image and uploads it to the Python backend
// * img = image file
function addImage(img) {
    fetch(serverLink + addImageSlug, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({image: img}) // body data type must match "Content-Type" header
    })
        .then(response => {})
        .catch(error => console.log("Error: " + error))
}

export default addImage;