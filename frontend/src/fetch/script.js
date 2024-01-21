// FETCH BOARD IMAGE
function fetchBoardImage() {
    const endpoint = 'http://217.160.150.211:2620/getBoard';

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success' && data.data && data.data.board) {
                // TODO: DO SOMETHING WITH THIS BASE64 STRING
                document.getElementById("boardImage").src = "data:image/png;base64," + data.data.board;
                // console.log(data.data.board);
            } else {
                console.error('Failed to fetch board image.');
            }
        })
        .catch(error => {
            console.error('Error fetching board image:', error);
        });
}

// UPLOAD IMAGE AND SEND TO SERVER
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
    console.log(base64String);
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
        body: JSON.stringify({image: base64String}),
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
            console.error('Error uploading image', error);
        });
}


// Fetch and display board image on page load
document.getElementById("uploadBtn").addEventListener("click", uploadAndSend);