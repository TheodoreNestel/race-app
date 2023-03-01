import { useState , useRef } from "react"
import anime from "animejs"
import axios from "axios"


//this form will handle login or signup 
export default function LoginForm(props){

    //logic to reveal or hide password / This works in tandem with the hidePassword Function 
    const [hidePsw , setHidePsw] = useState("password")

    //this will determine if we are authenticating a new user or if we are serving a signup form
    const [isNewUser , setIsNewUser] = useState(false)
    
    //LOGIN STATE
    const [userCreds , setUserCreds] = useState()

    //controlled input state
    const [username , setUsername] = useState()
    const [password , setPassword] = useState()
    const [rePassword , setRepassword] = useState()

    const passwordRef = useRef()
    const usernameRef = useRef()
    const passwordVerificationRef = useRef()

    let pswCoin = false

    const blurDivRef = useRef()
    const anim = useRef()
    const reverseAnim = useRef()

   
   

    //const matchingPsw = useRef(false)


    //submit logic that send the data to the parent component
    function handleChange(e){


        setUsername(usernameRef.current.value)
        setPassword(passwordRef.current.value)
        setRepassword(passwordVerificationRef.current.value)

    

       console.log(username, password ,"Local state" )
    }




    //this function will attempt login if its successful it will return the all of the user's data
    async function tryLogin(loginCredentials){

      console.log(loginCredentials)
      try{
       const res = await axios.post('http://localhost:9000/login' , loginCredentials)
       console.log(res , "the returned res from server")
      props.setData(res.data) //this function will return a user's data so we can populate the map page
      props.setPage("mapPage")
     
      }
      catch(error){
        console.log(error , "error from our backend")
      }

      //based on the returned value from this request we switch page and add the user's data (all of it)

     

  }


    async function trySignup(signUpInfo){
      try{
        const res = await axios.post('http://localhost:9000/signup',signUpInfo)
        console.log(res.data)
        props.setData(res.data) //this function will return a user's data so we can populate the map page
        props.setPage("mapPage")
      }
      catch(error){
        console.log(error , "Failure to signup")
        //do something else (flash reason why signup failed)
      }
    }



    //sets the state on the parent component with the data aquired here 
    function handleSubmit(e){
        //prevent page refresh
        e.preventDefault()


        //if these fields are populated we can submit a authentication request
            if(username && password){
              tryLogin({username , password});
            }
            else{
              //Logic pendin (flash probably) **JUN
            }

            

            

            
    }






    function handleSignup(e){
        e.preventDefault()

        //check if the passwords match 
        if(password === rePassword){

            props.setUserInfo({
                newUser : isNewUser,
                username ,
                password
            })

            trySignup({username , password})
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


    //const blurDivRef = useRef(null);



//function written by ChatGPT after several failed attempts on my end
function handleCardSwitch() {
  const blur = blurDivRef.current;

  anime({
    targets: blur,
    duration: 500,
    easing: 'easeInOutQuad',
    update: function(anim) {
      // get the current value of the animation
      const blurValue = anim.progress * 0.5;
      // apply the backdrop-blur filter to the box element
      blur.style.backdropFilter = `blur(${blurValue}px)`;
    },
    complete: function() {
      setIsNewUser(!isNewUser);
      anime({
        targets: blur,
        duration: 500,
        easing: 'easeInOutQuad',
        update: function(anim) {
          // get the current value of the animation
          const blurValue = 50 - anim.progress * 0.5;
          // apply the backdrop-blur filter to the box element
          blur.style.backdropFilter = `blur(${blurValue}px)`;
        },
      });
    },
  });
}



function handleCardSwitch2() {
    const loginForm = document.querySelector('.login-form-container__form');
    const signupForm = document.querySelector('.signup-form-container__form');
    
    const animation = anime({
      targets: '.form-container',
      rotateY: {
        value: '+=180',
        easing: 'easeInOutSine',
        duration: 500
      },
      complete: function(anim) {
        if (loginForm.style.display !== 'none') {
          loginForm.style.display = 'none';
          signupForm.style.display = 'block';
        } else {
          loginForm.style.display = 'block';
          signupForm.style.display = 'none';
        }
        anim.reset();
      }
    });
  }
      
      
      
      

   


    return (
        
        <div className="form-container">

        <div className="blur-div" ref={blurDivRef}
        style={{
            
            backdropFilter: 'blur(0)'
          }}
        >

        </div>

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
                    onClick={()=>{handleCardSwitch()}}
                    > Sign up
                    </span>
                </p>
               
            </form>


                    :
                

             <form className="signup-form-container__form">


                <h2 className="signup-form-container__form__title">Sign up</h2>


                <img
                className="signup-form-container__form__userImg"
                src="/assets/user.png"
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
                className="signup-form-container__form__pswImg1"
                src="/assets/lock.png"
                alt="Lock Img"
                />

                <input
                className="signup-form-container__form__password"
                type="text"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e)=>{handleChange(e)}}
               
                />


                <img
                className="signup-form-container__form__pswImg2"
                src="/assets/lock.png"
                alt="Lock Img"
                />

                <input
                className="signup-form-container__form__password"
                type="text"
                ref={passwordVerificationRef}
                placeholder="Re-enter password"
                onChange={(e)=>{handleChange(e)}}
               
                />                



                <button
                className="signup-form-container__form__submit"
                onClick={(e)=>{handleSignup(e)}}
                >
                    Signup
                </button>

                <p className="signup-form-container__form__new-user-link">
                    Already have an account <span
                    className="login-form-container__form__new-user-link__click"
                    onClick={()=>{handleCardSwitch()}}
                    > Sign in
                    </span>
                </p>
               
            </form>


            }
           

         </div>
    )
}