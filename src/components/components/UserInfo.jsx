



//this component will display all info the system has on the user and give the user the option to edit / add more 
//this component will be async as this will be in charge of the patch request

import axios from "axios"
import { useState , useRef } from "react"
import AvatarEditor from "react-avatar-editor"
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function UserInfo(props){

    
    //console.log(props.data)

    //this will be where we keep track of a user's current data if this object is edited
    //and the back button is hit this will be set to the server to edit a user's info
    const [userData , setUserData] = useState({...props.data})
    //in tandem with the above state this will keep track of wether or not handleEdit has been called
    //if it has then the user has changed their data and a call to the server needs to be made to update the new datas
    const hasbeenEdited = useRef(false)


    //This ref will be used for the avatar crop tool 
    const editorRef = useRef()
    //state that keeps track of the scale the user input
    const [scale , setScale] = useState(1)
    

    //to keep a copy of the original for edits sake
    const [original , setOriginal] = useState(props.data)
    
  

    //state to track wether or not we are editing a particular option / all changes in the input
    const [editUsername , setEditUsername] = useState({
        status : false,
        username : props.data.username
    })
    const [editCarMake , setEditCarMake] = useState({
        status : false,
        carMake : props.data.carMake
    })
    const [editCarModel , setEditCarModel] = useState({
        status : false,
        carModel : props.data.carModel
    })
    const [editHp , setEditHp] = useState({
        status : false, 
        hp : props.data.hp
    })
    const [editImg , setEditImg] = useState({
        status : false,
        img : props.data.userPfp
    })

    



    //all our data / inputs for the data which will change based on if we are in edit mode or not
    //per line of data 
    const inputs = {
        username :  <h1 className="user-info-card__display__header__username-block__username">
                {editUsername.username}
                    </h1>,
        usernameEdit : <input
            type="text"
            name="username"
            defaultValue={editUsername.username}
            className="user-info-card__display__header__username-block__username-edit"
            onChange={(e) => stateController(setEditUsername , {[e.target.name] : e.target.value})}
        />,
        carMake : <h3
            className="user-info-card__display__content__car-make-block__display">
                Car make: {editCarMake.carMake}
                </h3>,
        carMakeEdit : <input
            className="user-info-card__display__content__car-make-block__display-edit"
            type="text"
            name="carMake"
            defaultValue={editCarMake.carMake}
            onChange={(e) => stateController(setEditCarMake , {[e.target.name] : e.target.value})}
                />,
        carModel : <h3
            className="user-info-card__display__content__car-model-block__display">
                    Car model: {editCarModel.carModel}
                    </h3>,
        carModelEdit : <input 
            className="user-info-card__display__content__car-model-block__display-edit"
            type="text"
            name="carModel"
            defaultValue={editCarModel.carModel}
            onChange={(e) => stateController(setEditCarModel , {[e.target.name] : e.target.value})}
        />,
        horsepower : <h3
            className="user-info-card__display__content__hp-block__hp">
                 Horsepower: {editHp.hp}
                    </h3>,
        horsepowerEdit : <input
            className="user-info-card__display__content__hp-block__hp-edit"
            type="text"
            name="hp"
            defaultValue={editHp.hp}
            onChange={(e) => stateController(setEditHp , {[e.target.name] : e.target.value})}
        />

    }


    //chad moment beeg brain function 
    //inverses the status , sets the new data from on change
    function stateController(stateSetter , newData){
            stateSetter(prevState =>({
                ...prevState,
                status : !newData ? !prevState.status : prevState.status,
                ...newData

            }))

            //assemble all the data into a single object
            if(!newData)setUserData({
                username : editUsername.username,
                carMake : editCarMake.carMake,
                carModel : editCarModel.carModel,
                hp : editHp.hp ,
                userPfp : editImg.img
                
            })
            
    }


    //function that handles the files uploaded
    //ai assisted code 
    //also crop tool 
    const handleImg = (e) => {
        const file = e.target.files[0];
        const maxSize = 500; // maximum size of the canvas
        const fReader = new FileReader();
      
        if (file) {
          fReader.readAsDataURL(file);
        }
      
        fReader.onload = () => {
          const img = new Image();
          img.src = fReader.result;
      
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
      
            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }
      
            canvas.width = width;
            canvas.height = height;
      
            ctx.drawImage(img, 0, 0, width, height);
      
            stateController(setEditImg, { img: canvas.toDataURL() });
          };
        };
      };
      
      

    //function that handles the img scale input from the user
    const handleScale = (e) =>{
        const scale = parseFloat(e.target.value);
        setScale(scale);
    }

    //function that saves the user's modified img with the crop tool 
    const handleSave = async () => {
        const canvas = editorRef.current.getImage();
        const croppedImage = canvas.toDataURL();

        // do something with the cropped image
        //set it as a dataUrl for the user to see immediatly 
        setEditImg((prevState) => ({
          ...prevState,
          img: croppedImage
        }));

      };



    // const handleSave = () => {
    //     if (editorRef.current) {
    //       const canvas = editorRef.current.getImage();
    //       canvas.toBlob((blob) => {
    //         const croppedImage = new File([blob], "avatar.png", { type: "image/png" });
    //         setEditImg((prevState) => ({
    //           ...prevState,
    //           img: croppedImage,
    //         }));
    //       }, "image/png");
    //     }
    //   };
      
    //console.log(editImg.img , "current Img") //large weird file


        async function updateUser(){

            
            //we craft the payload
            const dataUpdatePayload = {
                username : original.username,
                updatedUser : userData
            }
           

            try {
                const response = await axios.put('https://race-app-backend.onrender.com/edituser', dataUpdatePayload);
               
                //return response.data;
              }
              catch (error) {
               
                toast.error(error.response.data.message)
              }
        }

        //not async yet 
        function handleExit(){
            
            updateUser()
            props.setNewData(userData)
            props.close()
        }


     return(



    
       <div className="user-info-card">

        <ToastContainer />

   

            <div className="user-info-card__display">

                <div className="user-info-card__display__header">
                   { 

                   !editImg.status ? 
                    <img
                        className="user-info-card__display__header__pfp"
                        src={editImg.img}
                    />

                    : ""
                    }
                    {/** uncomplete file upload thing for the img */}
                            <img
                            className="user-info-card__display__header__pfp-edit-icon"
                            src="/assets/edit-icon.png"
                            onClick={() => {
                                setEditImg((prevState) => {
                                return {
                                    ...prevState,
                                    status: !prevState.status
                                };
                                });
                            }}
                            />
                        {

                            editImg.status ? 

                            <div className="user-info-card__display__header__img-edit-zone">
                            
                           
                            
                            
                            <AvatarEditor
                                ref={editorRef}
                                image={editImg.img}
                                width={250}
                                height={250}
                                border={50}
                                color={[255, 255, 255, 0.6]} // RGBA
                                scale={scale}
                                borderRadius={125}
                                className="test"
                            />

                            <div className="user-info-card__display__header__img-edit-zone__input-control">
                            <label className="user-info-card__display__header__img-edit-zone__input-control__inputs-label">
                            <input
                                className="user-info-card__display__header__img-edit-zone__input-control__inputs-label__file"
                                type="file"
                                name="img"
                                onChange={handleImg}
                            />
                            Select New Icon
                            </label>
                            <input type="range" value={scale} min="1" max="3" step="0.01" onChange={handleScale}
                            className="user-info-card__display__header__img-edit-zone__input-control__scale-bar"
                             />


                            <button
                            className="user-info-card__display__header__img-edit-zone__input-control__submit"
                            onClick={()=>{
                                stateController(setEditImg);
                                handleSave();
                            }}
                            >
                                Submit

                            </button>
                           </div>
                        </div>

                        :

                        ""
                        
                        }

                
                    <div className="user-info-card__display__header__underline"></div>

                    <div className="user-info-card__display__header__username-block">
                        {
                            editUsername.status ? inputs.usernameEdit : inputs.username
                           
                        }
                         <button
                         className="user-info-card__display__header__username-block__button"
                         onClick={()=> stateController(setEditUsername)}
                         
                         >
                            {
                                editUsername.status ? "Update" : "Edit"
                            }

                         </button>
                    </div>                   

                </div>


                <div className="user-info-card__display__content">

                    <div className="user-info-card__display__content__car-make-block">
                        {
                            editCarMake.status ? inputs.carMakeEdit : inputs.carMake
                        }
                         <button
                         className="user-info-card__display__content__car-make-block__button"
                         onClick={()=> stateController(setEditCarMake)}
                         
                         >
                            {
                                editCarMake.status ? "Update" : "Edit"
                            }
                         </button>
                    </div>

                    <div className="user-info-card__display__content__car-model-block">
                        {
                            editCarModel.status ? inputs.carModelEdit : inputs.carModel
                        }
                         <button
                         className="user-info-card__display__content__car-model-block__button"
                         onClick={()=> stateController(setEditCarModel)}
                        
                         >
                            {
                                editCarModel.status ? "Update" : "Edit"
                            }
                         </button>
                    </div>
                   
                    <div className="user-info-card__display__content__hp-block">
                        {
                            editHp.status ? inputs.horsepowerEdit : inputs.horsepower
                        }
                         <button
                         className="user-info-card__display__content__hp-block__button"
                         onClick={()=> stateController(setEditHp)}
                         
                         >
                            {
                                editHp.status ? "Update" : "Edit"
                            }
                         </button>
                    </div>
                   

                </div>

                <button
                className="user-info-card__display__back-button"
                onClick={()=>handleExit()}
                >
                    Back
                </button>

            </div>

            

       </div>




    )
}




//userInfo : {
    //         username : "User's username",
    //         carMake : "user's car make ie: Honda",
    //         carModel : "User's car model ie : Type R",
    //         hp : "user's car horsepower ie : 305",
    //         userPfp : "user's pfp in whatever format that is"
    //     }