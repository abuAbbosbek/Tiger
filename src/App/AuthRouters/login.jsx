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

// const Login = () => {
//     const [login, setLogin] = useState("");
//     const [password, setPassword] = useState("");

//     async function login1() {
//         console.log(login, password);
//         let item = { login, password };
//         let result = await fetch("http://localhost:3001/user/auth", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify(item),
//         });
//         result = await result.json();
//         localStorage.setItem("user-info", JSON.stringify(result));
//         history.push('/*')
//     }
//     return (
//         <>
//             <div>
//                 <h1>Login</h1>
//                 <div className='col-sm-6 offset-sm-3 '>
//                     <input
//                         type='text'
//                         placeholder='email'
//                         className='form-control'
//                         onChange={(e) => setLogin(e.target.value)}
//                     />
//                     <br />
//                     <input
//                         type='password'
//                         placeholder='password'
//                         className='form-control'
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <br />
//                     <button className='btn btn-primary' onClick={login1}>
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;



// const Login = () => {
//     const [login, setLogin] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

    // async function login1() {
    //     try {
    //         console.log(login, password);
    //         let item = { login, password };
    //         let result = await fetch("http://localhost:3001/user/auth", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //             body: JSON.stringify(item),
    //         });
    //         result = await result.json();
    //         localStorage.setItem("user-info", JSON.stringify(result));

    //         // Redirect to a specific route after successful login
    //         navigate("/dashboard"); // Adjust the path as needed
    //     } catch (error) {
    //         console.error("Error during login:", error);
    //         // Handle errors, e.g., display an error message to the user
    //     }
    // }

//     return (
//         <div>
//             <h1>Login</h1>
//             <div className='col-sm-6 offset-sm-3 '>
//                 <input
//                     type='text'
//                     placeholder='email'
//                     className='form-control'
//                     onChange={(e) => setLogin(e.target.value)}
//                 />
//                 <br />
//                 <input
//                     type='password'
//                     placeholder='password'
//                     className='form-control'
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <br />
//                 <button className='btn btn-primary' onClick={login1}>
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Login;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [login, setLogin] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     async function login1() {
//         try {
//             console.log("login:", login);
//             console.log("password:", password);
//             let item = {
//                 login: login,
//                 password: password,
//             };
//             let result = await fetch("http://localhost:3001/user/auth", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Accept: "application/json",
//                 },
//                 body: JSON.stringify(item),
//             });
//             result = await result.json();
//             localStorage.setItem("user-info", JSON.stringify(result));

//             // Muvaffaqiyatli login bo'lsa, foydalanuvchini boshqa sahifaga yo'naltirish
//             navigate("/dashboard"); // Zaruratga qarab yo'naltirish yo'lini moslang
//         } catch (error) {
//             console.error("Login paytida xatolik yuz berdi:", error);
//             // Xatolikni foydalanuvchiga ko'rsatish uchun ishlov berish
//         }
//     }

//     return (
//         <div>
//             <h1>Login</h1>
//             <div className='col-sm-6 offset-sm-3'>
//                 <input
//                     type='text'
//                     placeholder='Login'
//                     className='form-control'
//                     value={login}
//                     onChange={(e) => setLogin(e.target.value)}
//                 />
//                 <br />
//                 <input
//                     type='password'
//                     placeholder='Password'
//                     className='form-control'
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <br />
//                 <button className='btn btn-primary' onClick={login1}>
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Login;
