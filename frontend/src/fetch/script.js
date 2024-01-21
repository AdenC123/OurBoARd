// import {addImageSlug, serverLink} from "./utils";

function $(x) { return document.getElementById(x); }

// FETCH BOARD IMAGE AND DO SOMETHING WITH THE FETCHED IMAGE
function fetchBoardImage() {
    const endpoint = 'http://217.160.150.211:2620/getBoard';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && data.data && data.data.board) {
                // TODO: DO SOMETHING WITH THE BASE64 STRING HERE

            } else {
                console.error('Failed to fetch board image.');
            }
        })
        .catch(error => {
            console.error('Error fetching board image:', error);
        });
}

// ADD IMAGE
function uploadAndSend() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a PNG file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const base64String = e.target.result.split(',')[1];
        sendBase64ToServer(base64String);
    };

    reader.readAsDataURL(file);
}

function sendBase64ToServer(base64String) {
    const endpoint = 'http://217.160.150.211:2620/addImage';

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                image: base64String,
            },
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Image uploaded successfully.');
            } else {
                console.error('Failed to upload image.');
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
}


// Fetch and display board image on page load
fetchBoardImage();
$("uploadBtn").addEventListener("click", uploadAndSend)