import { useState , useRef } from "react"


//this form will handle login or signup 
export default function LoginForm(props){

    //logic to reveal or hide password / This works in tandem with the hidePassword Function 
    const [hidePsw , setHidePsw] = useState("password")

    //this will determine if we are authenticating a new user or if we are serving a signup form
    const [isNewUser , setIsNewUser] = useState(false)

    //controlled input state
    const [userName , setUsername] = useState()
    const [password , setPassword] = useState()
    const [rePassword , setRepassword] = useState()

    const passwordRef = useRef()
    const usernameRef = useRef()
    const passwordVerificationRef = useRef()

    let pswCoin = false

   
   

    //const matchingPsw = useRef(false)


    //submit logic that send the data to the parent component
    function handleChange(e){


        setUsername(usernameRef.current.value)
        setPassword(passwordRef.current.value)
        setRepassword(passwordVerificationRef.current.value)

    

       console.log(userName, password ,"Local state" )
    }


    //sets the state on the parent component with the data aquired here 
    function handleSubmit(e){
        //prevent page refresh
        e.preventDefault()

        //if its not a new user we let them submit their credentials
        
            props.setUserInfo({
                newUser : isNewUser,
                userName ,
                password
            })
        
    }

    function handleSignup(e){
        e.preventDefault()

        //check if the passwords match 
        if(password === rePassword){

            props.setUserInfo({
                newUser : isNewUser,
                userName ,
                password
            })
        }
        else{
            //placeholder logic
            alert("passwords do not match")
        }
    }

    function handleReveal(state){

        pswCoin = !pswCoin

        if(state){
            setHidePsw("text")
        }
        else{
            setHidePsw("password")
        }

       
    }

   


    return (
        
        <div className="form-container">

            { !isNewUser ? 

            <form className="login-form-container__form">


                <h2 className="login-form-container__form__title">Login</h2>


                <img
                className="login-form-container__form__userImg"
                src="/assets/user.png"
                alt="User placeholder Img"
                />

                <input
                className="login-form-container__form__username"
                type="text"
                placeholder="Username"
                ref={(usernameRef)}
                onChange={(e)=>{handleChange(e)}}
                />
                

                <img
                className="login-form-container__form__pswImg"
                src="/assets/lock.png"
                alt="Lock Img"
                />

                <input
                className="login-form-container__form__password"
                type={hidePsw}
                placeholder="Password"
                ref={(passwordRef)}
                onChange={(e)=>{handleChange(e)}}
                />

                <a className="login-form-container__form__password__reveal-button">
                    <img
                    className="login-form-container__form__password__reveal-button__img"
                    src="/assets/reveal.png"
                    alt="Reveal password Icon"
                    onClick={()=>{handleReveal(pswCoin)}}
                    />
                </a>

                <button
                className="login-form-container__form__submit"
                onClick={(e)=>{handleSubmit(e)}}
                >
                    Login
                </button>

                <div className="login-form-container__form__line-break"></div>

                <p className="login-form-container__form__new-user-link">
                    Don't have an account<span
                    className="login-form-container__form__new-user-link__click"
                    onClick={()=>{setIsNewUser(true)}}
                    > Sign up
                    </span>
                </p>
               
            </form>


                    :
                

             <form className="signup-form-container__form">


                <h2 className="signup-form-container__form__title">Sign up</h2>


                <img
                className="signup-form-container__form__userImg"
                src="#"
                alt="User placeholder Img"
                />

                <input
                className="signup-form-container__form__username"
                type="text"
                placeholder="Username"
                ref={usernameRef}
                onChange={(e)=>{handleChange(e)}}
                
                />
                

                <img
                className="signup-form-container__form__pswImg"
                src="#"
                alt="Lock Img"
                />

                <input
                className="signup-form-container__form__password"
                type={hidePsw}
                placeholder="Password"
                ref={passwordRef}
                onChange={(e)=>{handleChange(e)}}
               
                />

                <a className="signup-form-container__form__password__reveal-button">
                    <img
                    className="signup-form-container__form__password__reveal-button__img"
                    src="#"
                    alt="Reveal password Icon"
                    onClick={()=>{return}}
                    />
                </a>

                <img
                className="signup-form-container__form__pswImg"
                src="#"
                alt="Lock Img"
                />

                <input
                className="signup-form-container__form__password"
                type={hidePsw}
                ref={passwordVerificationRef}
                placeholder="Re-enter password"
                onChange={(e)=>{handleChange(e)}}
               
                />
                


                <a className="signup-form-container__form__password__reveal-button">
                    <img
                    className="signup-form-container__form__password__reveal-button__img"
                    src="#"
                    alt="Reveal password Icon"
                    onClick={()=>{return}}
                    />
                </a>

                <button
                className="form-container__form__submit"
                onClick={(e)=>{handleSignup(e)}}
                >
                    Signup
                </button>

                <p className="login-form-container__form__new-user-link">
                    Already have an account <span
                    className="login-form-container__form__new-user-link-click"
                    onClick={()=>{setIsNewUser(false)}}
                    > Sign in
                    </span>
                </p>
               
            </form>


            }
           

         </div>
    )
}