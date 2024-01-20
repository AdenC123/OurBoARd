import {addImageSlug, serverLink} from "./utils";

// Takes image and uploads it to the Python backend
// * img = image file
async function addImage(img) {
    let str;
    imgToBase64(img)
        .then(base64String => {
            str = base64String;
        })
        .catch(error => {
            console.error(error);
        });
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
        body: JSON.stringify({image: str}) // body data type must match "Content-Type" header
    })
        .then(response => {})
        .catch(error => console.log("Error: " + error))
}

function imgToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
}


export default addImage;