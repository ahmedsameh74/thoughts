import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useRef, useState } from "react";
import './Create.css';
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React from "react";
import Modal from "../../components/modal/Modal";
// import Cropper from "react-easy-crop";
import Croper from "../../components/Croper";
import { usePhotoContext } from "../../hooks/usePhotoContext";
// import  getCroppedImg  from "../../components/cropImage";



const Create = () => {
    const { image, dispatch: dispatchImg } = usePhotoContext();
    const {dispatch} = usePostContext();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [newCategories, setNewCategories] = useState('');
    const catRef = useRef(null)
    const [body , setBody] = useState("");
    const [photo, setPhoto] = useState("");
    // const [image, setImage] = useState('');
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [img, setImg] = useState({width:800, height: 315})
    const dispatchBlog = { type: "SET_IMG", payload: '' };
    const selectBackground = useRef()
    const selectFontSize = useRef()
    const selectFontColor = useRef()
    const [color, setColor] = useState('#333')
    const [background, setBackground] = useState('#fff')
    const [fontSize, setFontSize] = useState('16px')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const setWindow = () => {
      console.log(windowWidth)
      setWindowWidth(window.innerWidth)
      if(windowWidth < 500) setImg({width: 500, height: 315})
    }
    useEffect(() => {
      window.addEventListener('resize', setWindow)
    })

    // image && console.log(image[0])

    const handleBackround = (e) => {
      console.log(e.target.value)
      selectBackground.current.style.backgroundColor = e.target.value
      setBackground(e.target.value)
    }

    const handleFont = (e) => {
      console.log(e.target.value)
      selectFontSize.current.style.fontSize = e.target.value
      setFontSize(e.target.value)
    }

    const handleColor = (e) => {
      console.log(e.target.value)
      selectFontColor.current.style.color = e.target.value
      setColor(e.target.value)
    }
    
    const handlePhoto = (e) => {

      console.log(e.target.files)
      if(e.target.files && e.target.files.length > 0 ){
        // console.log(e)
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        // reader.readAsDataURL(image[0])
        
        reader.addEventListener('load', () => {
          // dispatchImg({type: 'SET_IMAGE', payload: reader.result})
          setPhoto(reader.result)
          console.log(e.target.files[0])
          e.target.value = null;
          // console.log(reader.result)
        })
      }
    }

    

    useEffect(() => {
      if(!image) return
      console.log(image)
      const reader = new FileReader()
      reader.readAsDataURL(image[0])
      reader.addEventListener('load', () => {
        setPhoto(reader.result)
        // console.log(photo)
        // dispatchImg({type: 'CLEAR'})
      })

    }, [image])
    
    

    // const cropComplete = (croppedArea, croppedAreaPixels) => {
    //   setCroppedAreaPixels(croppedAreaPixels);
    //   // console.log(croppedArea, croppedAreaPixels);
    // };

    // const handleUpload = async () => {
    //   if(photo) {
    //     const croppedImageUrl = await getCroppedImg(URL.createObjectURL(photo), croppedAreaPixels);
    //     setFile(croppedImageUrl.Blob)
    //     console.log(croppedImageUrl);
    //     console.log(file);
    //     setCroppedImage(crop, zoom, croppedImageUrl.url);
    //   }
    // }

    // const setCroppedImage = (crop, zoom, croppedImageUrl) => {
    //   const newPhoto = { ...photo, crop, zoom, croppedImageUrl };
    //   // setImage(newPhoto);
    //   setPhoto(newPhoto)
    //   console.log(photo)
      
    //   setImage("");
    //   // console.log(photo)
    //   // console.log(zoom, crop);
    //   setShowModal(false);
    // };

    // const handleCrop =(crop) => {
    //   setCrop(crop);
      
    //   // console.log(URL.createObjectURL(photo));
    // }
    // const handleZoom = (zoom) => {
    //   setZoom(zoom);
    // }

    const handleModal = (e) => {
        setShowModal(true)
    }

    

    const handleCat = (e) => {
        e.preventDefault();
        const cat = newCategories.trim();
        if(cat && !categories.includes(cat)) {
          setCategories(prev => [...prev, cat]);
        }
        console.log(categories)
        setNewCategories(''); 
        catRef.current.focus();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = { title, body, categories, color, background, fontSize };
        if(!user){
            setError("Please login to create a post");
            return;
        }
        if(image) {
            // const imgData = new FormData();
            console.log(image)
            try {
              const formdata = new FormData();
              // formdata.append("croppedImage", image[0]);
            console.log(image[0].name)
            const fileName = Date.now() + image[0].name;
            formdata.append("name", fileName);
            formdata.append("file", image[0]);
            
            
            console.log(image[0])
            // console.log(imgData);
                // await axios.post("/api/uploads", image[0].formdata);
                const res = await fetch("/api/uploads/blogsheader", {
                  method: "POST",
                  body: formdata,
                });
                const data = await res.json()
                console.log(data)
                content.photo = data.secure_url;
                content.cloudinary_id = data.public_id;
            } catch (error) {
                console.log(error);
            }
        }

        
        console.log(content);
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(content),
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
        })
        
        const data = await res.json();
        console.log(data)

        if(!res.ok){
            setError(data.message);
            console.log(data)
            return;
        }
        if(res.ok){
            dispatch({type: "CREATE_POST", payload: data});
            setTitle("");
            setBody("");
            setPhoto("");
            dispatchImg({type: 'CLEAR'})
            // console.log('submit')
            navigate("/post/" + data._id);
        }
    }

    return (
      <div
        className="create"
      >
        <h1>Let's Blog!</h1>
        <form className="cr" onSubmit={handleSubmit}>
          {image && (
            <div className="mb-3 position-relative">
              <img
                src={image}
                // src={URL.createObjectURL(photo)}
                alt="post"
                style={{ width: "800px", height: "315px" }}
                className="mx-auto d-block"
              />
            </div>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Title
            </span>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <p>
            Categories :{" "}
            {categories.map((cat) => (
              <span className="badge bg-primary ms-2">{cat}</span>
            ))}
          </p>

          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Categories
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => setNewCategories(e.target.value)}
              value={newCategories}
              ref={catRef}
            />
            <button className="btn btn-primary" onClick={handleCat}>
              add
            </button>
          </div>
          <p>Themes: </p>
          <div className="row mb-2">
            <div className="col-md-4">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  onChange={handleFont}
                  ref={selectFontSize}
                >
                  <option defaultValue="16px">Default</option>
                  <option value="15px">15px</option>
                  <option value="20px">20px</option>
                  <option value="25px">25px</option>
                </select>
                <label htmlFor="floatingSelectGrid">Font-Size</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <select
                  className="form-select font"
                  id="floatingSelectGrid"
                  onChange={handleBackround}
                  ref={selectBackground}
                >
                  <option defaultValue="#fff">Default</option>
                  <option value="#ffafcc">#ffafcc</option>
                  <option value="#cdb4db">#cdb4db</option>
                  <option value="#bde0f0">#bde0f0</option>
                </select>
                <label htmlFor="floatingSelectGrid">Background-Color</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelectGrid"
                  onChange={handleColor}
                  ref={selectFontColor}
                  defaultValue="#333"
                >
                  <option defaultValue="#333">Default</option>
                  <option value="#ffafcc">#ffafcc</option>
                  <option value="#cdb4db">#cdb4db</option>
                  <option value="#bde0f0">#bde0f0</option>
                </select>
                <label htmlFor="floatingSelectGrid">Color</label>
              </div>
            </div>
          </div>
          {/* <div className="blog-label">
            {photo && <img src={URL.createObjectURL(photo)} alt="" />}

            <label>Title</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className={error.includes("title") ? "ierror" : ""}
            />
          </div> */}

          {/* <div className="blog-label">
            <label>categories</label>
            <div className="categories">
              <input
                type="text"
                onChange={(e) => setNewCategories(e.target.value)}
                value={newCategories}
                ref={catRef}
              />
              <button className="btn btn-primary" onClick={handleCat}>
                add
              </button>
            </div>
          </div> */}
          <div className="form-floating mt-2">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "100px" }}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <label htmlFor="floatingTextarea2">blog</label>
          </div>
          {/* <div className="blog-label">
            <label>post</label>
            <textarea
              type="text"
              onChange={(e) => setBody(e.target.value)}
              className={error.includes("body") ? "ierror" : ""}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              photo
            </label>
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={handlePhoto}
              onClick={handleModal}
            />
          </div>
          {/* <div className="blog-label">
            <label className="upload">
              photo
              <span>+</span>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </label>
            img width should be 800px and height should be 300px
          </div> */}
          <button className="btn btn-primary">Blog!</button>
          {error && <p className="error">{error}</p>}
        </form>
        {showModal && (
          <Modal>
            {photo && (
              <Croper
                photo={photo}
                dispatchImg={dispatchBlog}
                cropShape={"react"}
                img={img}
                setModal={setShowModal}
              />
            )}
          </Modal>
        )}
      </div>
    );
}
 
export default Create;