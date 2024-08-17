import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons";



const Sidebar = () => {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/customers");
    };

  
    const [activeTab, setActiveTab] = useState("Erkak");

    useEffect(() => {
        const tabs = ["Erkak", "Ayol"];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabs.length;
            setActiveTab(tabs[currentIndex]);
        }, 1000); // Har 1 soniyada o'zgaradi

        return () => clearInterval(interval); // Component o'chirilganda intervalni to'xtatish
    }, []);





    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const month = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => 1900 + i
    );

    const menuItems = [
        {
            name: "Asosiy",
            content: (
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
                        <div>
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
                                            <option key={month} value={month}>
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
                                            className={`px-4 py-4 rounded-2xl focus:outline-none w-5/10 text-xl ${
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
                                            className={`px-4 py-4 rounded-2xl focus:outline-none w-5/10 text-xl ${
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
                    </div>
                </div>
            ),
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

    const [content, setContent] = useState(menuItems[0].content);

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
                    <h1 className='text-lg font-semibold'>Yangi Mijoz</h1>
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
                    <div>{content}</div>
                </div>
            </div>
        </>
    );
};

const YangiMijoz = () => <Sidebar />;

export default YangiMijoz;