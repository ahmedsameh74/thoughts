import Cropper from "react-easy-crop";
import { useState } from "react";
import '../index.css'
import { usePhotoContext } from "../hooks/usePhotoContext";
// import { generateDownload } from "../components/cropImage";
import getCroppedImg from "../components/cropImage";
import { dataURLtoFile } from './dataUrlToFile';
// import 'react-easy-crop/react-easy-crop.css'

const Croper = ({photo, setModal, img, cropShape, dispatchImg}) => {
  // const [image, setImage] = useState(photo)
  const {dispatch} = usePhotoContext()
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  // console.log(photo.join(''))
  // console.log(cropShape)


  const cropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCroppedArea(croppedAreaPixels)

  }
  const handleUpdate = async () => {
    // generateDownload(photo.join(""), croppedArea);
    const canvas = await getCroppedImg(photo, croppedArea)
    const canvasDataUrl = canvas.toDataURL('image/jpeg')
    const convertUrlToFile = dataURLtoFile(canvasDataUrl, `image${Math.random(10).toString().slice(2)}`)
    
    
    console.log(convertUrlToFile)
    dispatchImg.payload = convertUrlToFile

    console.log(dispatchImg)
    dispatch(dispatchImg);
    setModal(false)
  }

    return (
      <div className="container-fluid p-2">
        <div className="cropper">
          <Cropper
            image={photo}
            crop={crop}
            cropSize={img}
            zoom={zoom}
            cropShape={cropShape}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={cropComplete}
            classes={{containerClassName: 'cropper', mediaClassName: 'cropper-media', cropAreaClassName: 'cropper-area'}}
            // disableAutomaticStylesInjection={true}
          />
        </div>
        <div className="zoom mt-2 mx-auto">
          <input type="range" min={1} max={5} step={1} value={zoom} onChange={(e) => setZoom(e.target.value)} />
        </div>
        <div className="cropper-btns">
          <button className="btn btn-primary me-2" onClick={handleUpdate}>Upload</button>
          <button className="btn btn-danger" onClick={() => {
            dispatch({type: 'CLEAR'})
            setModal(false)
            } }>Cancel</button>
        </div>
      </div>
    );
}
 
export default Croper;