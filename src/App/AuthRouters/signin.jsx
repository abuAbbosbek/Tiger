import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function SignIn({ onSignUpClick }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({ login, password }),
                body: JSON.stringify({
                    login: login.trim(),
                    password: password.trim(),
                }),
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
        console.log("Login:", login); // Tahrir qilingan qiymatni tekshirish
        console.log("Password:", password);
    };

    const validateEmail = (email) => {
        // Email formatini tekshiradigan kengaytirilgan regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        // Emailni tekshirish
        if (validateEmail(value)) {
            setError(""); // Xatolik yo'q, email to'g'ri formatda
        } else {
            setError("Please enter a valid email address."); // Xato xabar
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
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-300'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        placeholder="abc@example.com"
                        className={`w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                            error
                                ? "focus:ring-red-500 border-red-500"
                                : "focus:ring-blue-500"
                        }`}
                        value={login}
                        onChange={handleChange}
                        required
                    />
                    {error && (
                        <p className='mt-2 text-sm text-red-500'>{error}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-300'>
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={password}
                            placeholder='***********'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute inset-y-0 right-0 flex items-center pr-3'>
                            {showPassword ? (
                                <EyeSlashIcon className='w-5 h-5 text-gray-500' />
                            ) : (
                                <EyeIcon className='w-5 h-5 text-gray-500' />
                            )}
                        </button>
                    </div>
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
