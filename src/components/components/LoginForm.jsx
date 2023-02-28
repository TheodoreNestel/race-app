import { useState , useRef } from "react"
import anime from "animejs"


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

    const blurDivRef = useRef()
    const anim = useRef()
    const reverseAnim = useRef()

   
   

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


            //call an async function here to send user's login info to the back end and test if the values are legal
            
            //then if we we get data back and not a 404 then we can change cards with the new data 
            //new data is props.SetData then we switch to the next page
            props.setPage("mapPage")
    }



    async function tryLogin(){
      //make a request to the back end if we have a returning user to try and authenticate him 
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


        //async request to create the user / then request the empty user and return it to populate the next page
        //then we switch page since the data is populated using props.setData to the newly returned signuped User obj
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