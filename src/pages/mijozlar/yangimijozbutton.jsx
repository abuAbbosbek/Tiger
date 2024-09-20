import { useNavigate } from "react-router-dom";
import "boxicons";
import { useState } from "react";
import Uzbekistan from "../../../public/uzbekistan.png";
import Russia from "../../../public/russia.png";
import UnitedStates from "../../../public/united-states.png";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/customers");
    };

    const [content, setContent] = useState();
    const [activeTab, setActiveTab] = useState("Erkak");
    const [activeTab1, setActiveTab1] = useState("");
    const [activeTab2, setActiveTab2] = useState("");

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const month = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => 1900 + i
    );

    const [countryCode, setCountryCode] = useState("+998");

    const handleCountryCodeChange = (e) => {
        setCountryCode(e.target.value);
    };

    const [value, setValue] = useState("");

    const handleInputChange = (e) => {
        let input = e.target.value.replace(/\D/g, "");

        if (input.length > 10) {
            input = input.slice(0, 10);
        }

        let formattedValue = input;
        if (input.length > 8) {
            formattedValue = `${input.slice(0, 2)}-${input.slice(
                2,
                5
            )}-${input.slice(5, 7)}-${input.slice(7, 9)}`;
        } else if (input.length > 6) {
            formattedValue = `${input.slice(0, 2)}-${input.slice(
                2,
                5
            )}-${input.slice(5, 7)}-${input.slice(7)}`;
        } else if (input.length > 4) {
            formattedValue = `${input.slice(0, 2)}-${input.slice(
                2,
                5
            )}-${input.slice(5)}`;
        } else if (input.length > 2) {
            formattedValue = `${input.slice(0, 2)}-${input.slice(2)}`;
        }

        setValue(formattedValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace" && value.endsWith("-")) {
            setValue(value.slice(0, -1));
        }
    };

    const menuItems = [
        {
            name: "Asosiy",
        },
        { name: "Manzil", content: "Manzil sahifa kontenti" },
        {
            name: "Ijtimoiy tarmoqlar",
            content: "Ijtimoiy tarmoqlar sahifa kontenti",
        },
        { name: "Qarindoshlar", content: "Qarindoshlar sahifa kontenti" },
        {
            name: "Guruhlar / Teglar",
            content: "Guruhlar / Teglar sahifa kontenti",
        },
        { name: "Xabarlar", content: "Xabarlar sahifa kontenti" },
        { name: "Kartalar", content: "Kartalar sahifa kontenti" },
    ];

    return (
        <>
            <div className='flex justify-between mb-5 items-center p-4 bg-white shadow-md rounded-lg'>
                <button
                    className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'
                    onClick={handleButtonClick}>
                    <box-icon
                        name='chevron-left'
                        type='solid'
                        color='#ffffff'></box-icon>
                    <h1 className='text-lg font-semibold'>Ortga</h1>
                </button>
                <button className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'>
                    <h1 className='text-lg font-semibold'>Yaratish</h1>
                </button>
            </div>
            <div className='flex h-screen'>
                <div className='w-1/4 bg-white p-4 shadow-lg'>
                    <ul className='space-y-4'>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    className={`w-full text-left p-2 rounded ${
                                        content === item.content
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setContent(item.content)}>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='w-3/4 p-5'>
                    <div>
                        <h1 className='text-4xl mb-7'>Asosiy</h1>
                        <div>
                            <div className='flex'>
                                <div className='mb-4 flex-1'>
                                    <label
                                        className='block text-black mb-4 text-xl'
                                        htmlFor='input'>
                                        Ism
                                    </label>
                                    <input
                                        type='text'
                                        id='input'
                                        className='w-[350px] p-4 bg-slate-200 border rounded-xl'
                                        placeholder='Ismni kiriting...'
                                    />
                                </div>
                                <div className='mb-4 flex-1'>
                                    <label
                                        className='block text-black mb-4 text-xl'
                                        htmlFor='input'>
                                        Familiya
                                    </label>
                                    <input
                                        type='text'
                                        id='input'
                                        className='w-[350px] p-4 bg-slate-200 border rounded-xl'
                                        placeholder='Familiyani  kiriting...'
                                    />
                                </div>
                                <div className='mb-4 flex-1'>
                                    <label
                                        className='block text-black mb-4 text-xl'
                                        htmlFor='input'>
                                        Otasining ismi
                                    </label>
                                    <input
                                        type='text'
                                        id='input'
                                        className='w-[350px] p-4 bg-slate-200 border rounded-xl'
                                        placeholder='Otasining ismini kiriting...'
                                    />
                                </div>
                            </div>
                            <div className='flex  gap-14'>
                                <div className='max-w-sm mt-5'>
                                    <label className='block text-gray-700 text-xl  mb-2'>
                                        Tug`ilgan kuni
                                    </label>
                                    <div className='flex space-x-2'>
                                        <select className='w-20 p-3 border bg-slate-200 text-center rounded-xl'>
                                            <option value='' disabled selected>
                                                KK
                                            </option>
                                            {days.map((month) => (
                                                <option
                                                    key={month}
                                                    value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>
                                        <select className='w-20 p-3 border bg-slate-200 text-center rounded-xl'>
                                            <option value='' disabled selected>
                                                OO
                                            </option>
                                            {month.map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>

                                        <select className='w-40 p-3 border rounded-xl bg-slate-200 text-center'>
                                            <option value='' disabled selected>
                                                YYYY
                                            </option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <label className='block text-gray-700 text-xl mb-2'>
                                        Jinsi
                                    </label>
                                    <div className='flex items-center mb-4'>
                                        <div className='bg-gray-200 p-1 rounded-2xl flex w-full'>
                                            <button
                                                className={`px-2 py-2 rounded-2xl focus:outline-none w-[300px] text-xl ${
                                                    activeTab === "Erkak"
                                                        ? "bg-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("Erkak")
                                                }>
                                                Erkak
                                            </button>
                                            <button
                                                className={`px-2 py-2 rounded-2xl focus:outline-none w-[300px] text-xl ${
                                                    activeTab === "Ayol"
                                                        ? "bg-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab("Ayol")
                                                }>
                                                Ayol
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl'>Telefon</h1>
                                <div className='flex gap-10'>
                                    <div className='flex items-center space-x-2 mt-5'>
                                        <select
                                            className='p-4 bg-slate-200 border rounded-xl'
                                            value={countryCode}
                                            onChange={handleCountryCodeChange}>
                                            <option value='+1'>+1 (US)</option>
                                            <option value='+44'>
                                                +44 (UK)
                                            </option>
                                            <option value='+91'>
                                                +91 (India)
                                            </option>
                                            <option value='+81'>
                                                +81 (Japan)
                                            </option>
                                            <option value='+998'>
                                                +998 (Uzbekistan)
                                            </option>
                                            Qo`shimcha davlat kodlari
                                        </select>
                                        <input
                                            type='tel'
                                            className='w-[250px] p-4 bg-slate-200 border rounded-xl'
                                            placeholder='Telefon raqamini kiriting...'
                                            value={value}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            maxLength='12'
                                        />
                                    </div>

                                    <div>
                                        <button className='px-3 py-3 w-[400px] text-sky-500 text-lg border-2 rounded-xl bg-slate-200 mt-5'>
                                            + Telefon raqam qo`shish
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-10'>
                                <div>
                                    <h1 className='text-xl mt-5'>
                                        Oilaviy ahvol
                                    </h1>
                                    <div className='flex items-center mt-5'>
                                        <div className='bg-gray-200 p-1 rounded-2xl flex '>
                                            <button
                                                className={`px-2 py-2 rounded-2xl focus:outline-none w-[300px] text-xl ${
                                                    activeTab1 ===
                                                    "Turmushdaemas"
                                                        ? "bg-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab1(
                                                        "Turmushdaemas"
                                                    )
                                                }>
                                                Turmushda emas
                                            </button>
                                            <button
                                                className={`px-2 py-2 rounded-2xl focus:outline-none w-[300px] text-xl ${
                                                    activeTab1 === "Turmushda"
                                                        ? "bg-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setActiveTab1("Turmushda")
                                                }>
                                                Turmushda
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className='text-xl mt-5'>
                                        Suhbat tili
                                    </h1>
                                    <div>
                                        <div className='flex items-center mt-5'>
                                            <div className='bg-gray-200 p-1 rounded-2xl flex '>
                                                <button
                                                    className={`px-2 py-2 rounded-2xl focus:outline-none w-[100px] flex justify-center text-xl ${
                                                        activeTab2 === "uzbek"
                                                            ? "bg-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab2("uzbek")
                                                    }>
                                                    <img
                                                        src={Uzbekistan}
                                                        alt='img'
                                                    />
                                                </button>
                                                <button
                                                    className={`px-2 py-2 rounded-2xl focus:outline-none w-[100px] text-xl flex justify-center ${
                                                        activeTab2 === "rus"
                                                            ? "bg-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab2("rus")
                                                    }>
                                                    <img
                                                        src={Russia}
                                                        alt='img'
                                                    />
                                                </button>
                                                <button
                                                    className={`px-2 py-2 rounded-2xl focus:outline-none w-[100px] text-xl  justify-center flex ${
                                                        activeTab2 === "ingliz"
                                                            ? "bg-white"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setActiveTab2("ingliz")
                                                    }>
                                                    <img
                                                        src={UnitedStates}
                                                        alt='img'
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const YangiMijoz = () => <Sidebar />;

export default YangiMijoz;
