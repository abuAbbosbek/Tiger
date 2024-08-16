import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons";



const Sidebar = () => {
    const [content, setContent] = useState("Asosiy sahifa kontenti");

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/customers");
    };




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
                            <div>
                                <h1>Tug`ilgan kuni</h1>
                                
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
