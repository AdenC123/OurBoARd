window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    fetchBoardImage(renderBoard);
});

// FETCH BOARD IMAGE
function fetchBoardImage(fnCallback) {
    const endpoint = 'https://106c-217-160-150-211.ngrok-free.app/getBoard';
    console.log("fetching");
    fetch(endpoint, {
        headers: {'ngrok-skip-browser-warning': 0}
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && data.data && data.data.board) {
                // TODO: DO SOMETHING WITH THIS BASE64 STRING
                fnCallback(data.data.board);
                // console.log(data.data.board);
            } else {
                console.error('Failed to fetch board image.');
            }
        })
        .catch(error => {
            console.error('Error fetching board image:', error);
        });
}

// CONVERT IMAGE AND SEND TO SERVER
function convertImageToBase64(inputFile, fnCallback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const base64String = e.target.result.split(',')[1];
        sendBase64ToServer(base64String, fnCallback);
    };
    reader.readAsDataURL(inputFile);
}

function sendBase64ToServer(base64String, fnCallback) {
    const endpoint = 'https://106c-217-160-150-211.ngrok-free.app/addImage';
    console.log(base64String);
    fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 0
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({image: base64String}),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert("Image uploaded successfully");
                fnCallback();
            } else {
                console.error('Failed to upload image.');
            }
        })
        .catch(error => {
            console.error('Error uploading image', error);
        });
}

// SEND TEXT TO SERVER
function sendTextToServer(string, fnCallback) {
    const endpoint = 'https://106c-217-160-150-211.ngrok-free.app/addNote';
    fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({text: string}),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                fnCallback();
            } else {
                console.error('Failed to upload note.');
            }
        })
        .catch(error => {
            console.error('Error uploading note', error);
        });
}