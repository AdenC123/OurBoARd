import { addImageSlug, getBoardSlug, serverLink } from "./utils";

// Gets the current board from backend
// Returns image file
async function getBoard() {
    try {
        const response = await fetch(serverLink + getBoardSlug, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: ''
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let image = new Image();
        image.src = 'data:image/png;base64,' + data.image;
        return image;
    } catch (error) {
        console.log('Error:', error);
    }
}

export default getBoard;
