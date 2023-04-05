import LoginForm from "../components/LoginForm"
import { useState } from "react"


export default function MainPage(props){


    //state that we drill into the form component this will be the same state wether its a new user or a current one
    const [formData , setFormData] = useState({
        newUser : false,
        username : "",
        password : ""
    })

    //can I use a useEffect to wait for data to be fill before making an asyn call to the back end ? 
    //Might be best to let the form it self check for login so data is more localized

    //console.log(formData , "current form data")

    return (
       <div className="main-page">
            <div className="main-page__background-video-container">
                    <img
                    src="/assets/bg-placeholder.jpg"
                    className="main-page__background-video-container__video"
                    />
            </div>

            <div className="main-page__forms">
                <LoginForm setUserInfo={setFormData} setPage={props.setPage} setData={props.setData} anim={props.anim}/>
            </div>

       </div>
    )
}