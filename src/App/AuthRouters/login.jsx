import { useState } from "react";
import SignUp from "./signup";
import SignIn from "./signin";


function Login() {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    return (
        <div className='relative min-h-screen overflow-hidden'>
            <video
                autoPlay
                loop
                muted
                className='absolute top-0 left-0 w-full h-full object-cover'>
                <source
                    src='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
                    type='video/mp4'
                />
                Your browser does not support the video tag.
            </video>
            <div className='relative flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-60'>
                {isSignUp ? (
                    <SignUp onSignInClick={handleSignInClick} />
                ) : (
                    <SignIn onSignUpClick={handleSignUpClick} />
                )}
            </div>
        </div>
    );
}

export default Login;