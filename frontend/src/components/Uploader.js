import { useState } from "react";
import './Uploader.css'
// import{ MdCloudUpload, MdDelete} from 'react-icons/md'
// import { AiFillFileImage } from 'react-icons/ai'

export default function Uploader() {

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    return (
        <main>
            <form
            onClick={() => document.querySelector(".input-field").click()}>
                <input type="file" accept='image/*' className="input-field" hidden
                onChange={({ target: {files}}) => {
                    files[0] && setFileName(files[0].name)
                    if (files && files.item(0).type.match('image.*')){
                        const fileReader = new FileReader();
                        const string = fileReader.readAsDataURL(files[0])
                        console.log(string)
                        console.log(fileReader)
                        // resolve for axios
                        // fileReader.onload = () => {
                        //     resolve(fileReader.result);
                        // };

                        // reader.onerror = (error) => {
                        //     reject(error);
                        // }
                        setImage(URL.createObjectURL(files[0]))
                        console.log(image)
                    }
                }}
                />
                
                {image ?
                    <img src={image} width={300} height={150} alt={fileName} /> 
                    :
                    <img src={"./media/image-upload-icon.png"} width={300} height={150} alt={"Upload Image"} /> 
                }
                
            </form>
        </main>
    )
}