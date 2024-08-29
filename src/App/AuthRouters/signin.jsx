import { useState } from "react";

function SignIn({ onSignUpClick }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (response.ok) {
                 localStorage.setItem("accessToken",data.token)
                 window.location.reload();
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='relative z-10 w-full max-w-md p-8 space-y-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold text-center text-white'>
                Sign in to your account
            </h2>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor='text'
                        className='block text-sm font-medium text-gray-300'>
                        Your email
                    </label>
                    <input
                        type='text'
                        id='text'
                        className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='email@example.com'
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-300'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={password}
                        placeholder="*********"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full px-4 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Sign in
                </button>
                {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
            </form>
            <p className='mt-6 text-sm text-center text-gray-300'>
                Don’t have an account yet?
                <a
                    href='#'
                    className='text-blue-500 hover:underline ml-2'
                    onClick={onSignUpClick}>
                    Sign up
                </a>
            </p>
        </div>
    );
}

export default SignIn;
