import LoginForm from "../components/LoginForm"
import { useState } from "react"


export default function MainPage(){


    //state that we drill into the form component this will be the same state wether its a new user or a current one
    const [formData , setFormData] = useState({
        newUser : false,
        username : "",
        password : ""
    })

    console.log(formData , "current form data")

    return (
       <div className="main-page">
            <div className="main-page__background-video-container">
                    <img
                    src="/assets/bg-placeholder.jpg"
                    className="main-page__background-video-container__video"
                    />
            </div>

            <div className="main-page__forms">
                <LoginForm setUserInfo={setFormData}/>
            </div>

       </div>
    )
}