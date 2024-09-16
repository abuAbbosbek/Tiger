import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ onSignInClick, onSignUpClick }) {
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [passport_series, setPassport_series] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const Homepage = useNavigate("/home");
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/user/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    login,
                    password,
                    name,
                    birthday,
                    passport_series,
                    phone_number,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("accessToken", data.token);
                Homepage('/home')
                window.location.reload();
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }
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
                Create your account
            </h2>
            <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <div>
                        <div>
                            <label
                                htmlFor=''
                                className='block text-sm font-medium text-gray-300'>
                                Your name
                            </label>
                            <input
                                type='text'
                                id='text'
                                className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor='date'
                                className='block text-sm font-medium text-gray-300'>
                                Birthday
                            </label>
                            <input
                                type='date'
                                id='date'
                                className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-200'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='text'
                                className='block text-sm font-medium text-gray-300'>
                                Passport Series
                            </label>
                            <input
                                type='text'
                                id='text'
                                className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={passport_series}
                                placeholder='AD1234567'
                                onChange={(e) => {
                                    let value = e.target.value.toUpperCase();
                                    let letters = value
                                        .slice(0, 2)
                                        .replace(/[^A-Z]/g, ""); // Faqat harflar, birinchi 2 ta belgi
                                    let numbers = value
                                        .slice(2)
                                        .replace(/[^0-9]/g, ""); // Faqat raqamlar, keyingi 5 ta belgi
                                    setPassport_series(
                                        letters + numbers.slice(0, 7)
                                    ); // Belgilarni 2 ta harf va 5 ta raqamga cheklash
                                }}
                                maxLength={9} // Umumiy uzunlikni 7 ga cheklash
                                style={{ textTransform: "uppercase" }}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label
                                htmlFor='phone'
                                className='block text-sm font-medium text-gray-300'>
                                Your phone number
                            </label>
                            <input
                                type='tel'
                                id='phone'
                                className='w-full p-3 mt-1 text-gray-900 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='+998 99 683 11 06'
                                value={phone_number}
                                onChange={(e) => {
                                    let value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    ); // Faqat raqamlarni saqlaydi

                                    // +998 bilan boshlanishi uchun
                                    if (value.startsWith("998")) {
                                        value = "+" + value;
                                    } else {
                                        value = "+998" + value;
                                    }

                                    // Formatlash
                                    if (value.length > 4)
                                        value =
                                            value.slice(0, 4) +
                                            " " +
                                            value.slice(4);
                                    if (value.length > 7)
                                        value =
                                            value.slice(0, 7) +
                                            " " +
                                            value.slice(7);
                                    if (value.length > 11)
                                        value =
                                            value.slice(0, 11) +
                                            " " +
                                            value.slice(11);
                                    if (value.length > 14)
                                        value =
                                            value.slice(0, 14) +
                                            " " +
                                            value.slice(14);

                                    setPhone_number(value);
                                }}
                                maxLength={17} // +998 99 683 11 06 formatida maksimal uzunlik
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-300'>
                                Email
                            </label>
                            <input
                                type='email'
                                id='email'
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
                                <p className='mt-2 text-sm text-red-500'>
                                    {error}
                                </p>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className='absolute inset-y-0 right-0 flex items-center pr-3'>
                                    {showPassword ? (
                                        <EyeSlashIcon className='w-5 h-5 text-gray-500' />
                                    ) : (
                                        <EyeIcon className='w-5 h-5 text-gray-500' />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onSignUpClick}
                    type='submit'
                    className='w-full px-4 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Sign up
                </button>
                {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
            </form>
            <p className='mt-6 text-sm text-center text-gray-300'>
                Already have an account?
                <a
                    href='#'
                    className='text-blue-500 hover:underline ml-2'
                    onClick={onSignInClick}>
                    Sign in
                </a>
            </p>
        </div>
    );
}

export default SignUp;
