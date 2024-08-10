import { CalendarTwoTone, PieChartTwoTone, RightOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CustomerDebtsData } from "../tabledata/tabledata";

function CustomerDebts() {
    const [activeTab, setActiveTab] = useState("qarzlar");

    const [activeTab1, setActiveTab1] = useState("Hammisi");

    const tabs = [
        "Hammasi",
        "Muddati o`tganlar",
        "Qoplanmaganlar",
        "Qoplanganlar",
        "Qisman to`langan",
    ];

    return (
        <>
            <div className='flex'>
                <div className='w-7/10 p-2 m-2 '>
                    <div className='flex justify-between'>
                        <h1 className='text-4xl'>Mijozlar qarzdorligi</h1>
                        <button className='px-4 py-2 bg-slate-200 rounded-md'>
                            <CalendarTwoTone className='mr-2' /> Barcha davrlar
                        </button>
                    </div>
                    <div className='mt-10'>
                        <div className='flex items-center mb-4'>
                            <div className='bg-gray-200 p-1 rounded-2xl flex w-full'>
                                <button
                                    className={`px-4 py-4 rounded-2xl focus:outline-none w-5/10 text-xl ${
                                        activeTab === "qarzlar"
                                            ? "bg-white"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("qarzlar")}>
                                    Qarzlar
                                </button>
                                <button
                                    className={`px-4 py-4 rounded-2xl focus:outline-none w-5/10 text-xl ${
                                        activeTab === "qoplangan"
                                            ? "bg-white"
                                            : ""
                                    }`}
                                    onClick={() => setActiveTab("qoplangan")}>
                                    Qoplangan qarzlar
                                </button>
                            </div>
                        </div>

                        <div className='p-4'>
                            {/* Filter va Qidiruv paneli */}
                            <div className='mb-4  items-center'>
                                <div className='p-4'>
                                    <div className='flex space-x-4 mb-4'>
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab}
                                                className={`py-2 px-4 rounded-lg ${
                                                    activeTab1 === tab
                                                        ? "bg-gray-200 font-semibold"
                                                        : "text-gray-600"
                                                }`}
                                                onClick={() =>
                                                    setActiveTab1(tab)
                                                }>
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <div>
                                        {/* Faol tabning mazmuni */}
                                        {activeTab === "Hammisi" && (
                                            <p>Hammisi bo`limi</p>
                                        )}
                                        {activeTab === "Muddati o`tganlar" && (
                                            <p>Muddati o`tganlar bo`limi</p>
                                        )}
                                        {activeTab === "Qoplanmaganlar" && (
                                            <p>Qoplanmaganlar bo`limi</p>
                                        )}
                                        {activeTab === "Qoplanganlar" && (
                                            <p>Qoplanganlar bo`limi</p>
                                        )}
                                        {activeTab === "Qisman to`langan" && (
                                            <p>Qisman to`langan bo`limi</p>
                                        )}
                                    </div>
                                </div>

                                <div className='mt-7 '>
                                    <div className='flex'>
                                        <input
                                            className='text-xl px-3 py-3 w-full rounded-md bg-slate-100
                    '
                                            type='search'
                                            placeholder='Artikl, Shtrix-kod, Nomi'
                                        />
                                        <select
                                            id='1'
                                            className='px-3 w-40 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                                            <option> Filtrlar</option>
                                            <option value=''>sdas</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            {activeTab === "qarzlar" && (
                                <div className='space-y-4'>
                                    {CustomerDebtsData.map((item) => (
                                        <div
                                            key={item.id}
                                            className='flex justify-between bg-white shadow-sm rounded-lg p-4'>
                                            <div className='w-2 h-2 bg-red-500 rounded-full mr-4 mt-4'></div>
                                            <div>
                                                <p className='text-blue-500 font-semibold'>
                                                    {item.amount}
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {item.date}
                                                </p>
                                            </div>
                                            <div className='ml-[30%] text-center flex flex-col items-center'>
                                                <p className='font-semibold'>
                                                    {item.name}
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {item.store}
                                                </p>
                                            </div>
                                            <button className='ml-auto bg-blue-500 text-white rounded-lg px-4 py-2 '>
                                                O`chirish
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {activeTab === "qoplangan" && (
                                <div>Qoplangan qarzlar bo`limi</div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className='w-[1px] h-[1000px] bg-black border-none inline-block mx-5' />

                <div className='w-3/10 p-4 m-2'>
                    <div className='bg-blue-500 rounded-xl p-5 text-xl text-center mb-10 '>
                        <button>
                            Ommaviy qutirish <RightOutlined />{" "}
                        </button>
                    </div>

                    <div className='bg-white rounded-xl px-4 py-4 mt-4 shadow-md border-2 '>
                        <div className='flex justify-between mb-10'>
                            <div>
                                <h1 className='text-xl mb-2'>
                                    Qarzlar summasi
                                </h1>
                                <h1 className='text-xl text-sky-600'>
                                    8 737 000 UZS
                                </h1>
                            </div>
                            <div>
                                <button className='bg-blue-500 text-white rounded-xl px-4 py-2 mt-3.5'>
                                    <PieChartTwoTone />
                                </button>
                            </div>
                        </div>

                        <hr />

                        <div className='mt-10'>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-4 w-52'>
                                    Qoplangan qarzlar summasi
                                </h1>
                                <h1 className='text-xl text-blue-500'>
                                    730 000 UZS
                                </h1>
                            </div>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-2'>Qolgan qarzlar</h1>
                                <h1 className='text-xl text-blue-500'>
                                    8 007 000 UZS
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl p-5 mt-10 shadow-md border-2'>
                        <div className='flex justify-between mb-10'>
                            <div>
                                <h1 className='text-xl mb-2'>
                                    Qarzdorlar soni
                                </h1>
                                <h1 className='text-xl text-sky-600'>
                                    28 Mijozlar
                                </h1>
                            </div>
                            <div>
                                <button className='bg-blue-500 text-white rounded-xl px-4 py-2 mt-3.5'>
                                    <UserOutlined />
                                </button>
                            </div>
                        </div>

                        <hr />

                        <div className='mt-10'>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-4 w-52'>
                                    Qoplanganlar
                                </h1>
                                <h1 className='text-xl text-blue-500'>
                                    6 Qarzlar
                                </h1>
                            </div>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-2'>Qoplanmaganlar</h1>
                                <h1 className='text-xl text-blue-500'>
                                    31 Qarzlar
                                </h1>
                            </div>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-2'>Muddatidan o`tganlar</h1>
                                <h1 className='text-xl text-blue-500'>
                                    6 Qarzlar
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerDebts;
