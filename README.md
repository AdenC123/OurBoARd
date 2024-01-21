# OurBoARd
NWHacks 2024

## API Specification
Uses simple specification from [JSend](https://github.com/omniti-labs/jsend?tab=readme-ov-file#so-how-does-it-work).

- `POST /addImage`:
  - `image` : base64 encoded image
  - Response:
    - `status` : `"success"` or `"fail"` or `"error"`
    - if status was `"error"`, `message` : user-readable string
    - `data` : `null`
- `GET /getBoard`:
  - Response:
      - `status` : `"success"` or `"fail"` or `"error"`
      - if status was `"error"`, `"message"` : user-readable string
      - `data` : 
        - `board` : base64 encoded board image
- `POST /addNote`:
  - `text` : text to put in note
  - Response:
    - `status` : `"success"` or `"fail"` or `"error"`
    - if status was `"error"`, `message` : user-readable string
    - if status was `"fail"`, `data: text:` : reason text is bad
    - `data` : `null`