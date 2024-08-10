import {
    CalendarTwoTone,
    PieChartTwoTone,
    RightOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const CustomerGroup = () => {
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toLocaleDateString("uz-UZ", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex'>
            <div className='w-7/10 p-2 m-2 '>
                <div className='flex justify-between mb-10'>
                    <div className='flex items-center'>
                        <h1 className='text-4xl mr-2'>Barcha sotuvlar</h1>
                        <h1 className='rounded-full bg-slate-300 text-sky-500 px-2 py-1.5 text-xl text-center'>
                            26
                        </h1>
                    </div>
                    <div className=' bg-slate-300 p-4 rounded-md'>
                        <button className='flex items-center '>
                            <CalendarTwoTone />{" "}
                            <p className='ml-2 mr-2'>Bugun</p> {currentDateTime}
                        </button>
                    </div>
                </div>

                <div className='mt-7 mb-7'>
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

                <div className="">
                    <div className='w-full mb-5'>
                        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center w-full border-2'>
                            <div className='flex items-center space-x-4'>
                                <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded-md'>
                                    1 dona
                                </span>
                                <div>
                                    <p className='text-gray-700 font-semibold'>
                                        Sotuv #809604
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        17.07.2024 | 15:50:12
                                    </p>
                                    <button className='bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm mt-2'>
                                        Keshbek yo`q
                                    </button>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-red-500 font-bold'>
                                    35 000 UZS
                                </p>
                                <p className='text-gray-600 flex items-center'>
                                    <span className='w-2.5 h-2.5 bg-blue-600 rounded-full mr-2'></span>
                                    Store Avtodisk
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mb-5'>
                        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center w-full border-2'>
                            <div className='flex items-center space-x-4'>
                                <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded-md'>
                                    1 dona
                                </span>
                                <div>
                                    <p className='text-gray-700 font-semibold'>
                                        Sotuv #809604
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        17.07.2024 | 15:50:12
                                    </p>
                                    <button className='bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm mt-2'>
                                        Keshbek yo`q
                                    </button>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-red-500 font-bold'>
                                    35 000 UZS
                                </p>
                                <p className='text-gray-600 flex items-center'>
                                    <span className='w-2.5 h-2.5 bg-blue-600 rounded-full mr-2'></span>
                                    Store Avtodisk
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mb-5'>
                        <div className='bg-white p-4 rounded-lg shadow-md flex justify-between items-center w-full border-2'>
                            <div className='flex items-center space-x-4'>
                                <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded-md'>
                                    1 dona
                                </span>
                                <div>
                                    <p className='text-gray-700 font-semibold'>
                                        Sotuv #809604
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                        17.07.2024 | 15:50:12
                                    </p>
                                    <button className='bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-sm mt-2'>
                                        Keshbek yo`q
                                    </button>
                                </div>
                            </div>
                            <div className='text-right'>
                                <p className='text-red-500 font-bold'>
                                    35 000 UZS
                                </p>
                                <p className='text-gray-600 flex items-center'>
                                    <span className='w-2.5 h-2.5 bg-blue-600 rounded-full mr-2'></span>
                                    Store Avtodisk
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='w-[1px] h-[1000px] bg-black border-none inline-block mx-5' />

            <div className='w-3/10 p-4 m-2'>
                <div className='bg-blue-500 rounded-xl p-5 text-xl text-center mb-10 '>
                    <button>
                        Hisobotni chop etish <RightOutlined />{" "}
                    </button>
                </div>

                <div className='bg-white rounded-xl px-4 py-4 mt-4 shadow-md border-2 '>
                    <div className='flex justify-between mb-10'>
                        <div>
                            <h1 className='text-xl mb-2'>Tranzaksiyalar</h1>
                            <h1 className='text-xl text-sky-600'>
                                26 <span className='text-black'>dona</span>
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
                                Tovarlar <p className='text-sky-600'>41 dona</p>
                            </h1>
                            <h1 className='text-xl w-32'>
                                Xizmatlar <p className='text-sky-600'>0 dona</p>
                            </h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-xl mb-4 w-52'>
                                To`plamlar{" "}
                                <p className='text-sky-600'>0 dona</p>
                            </h1>
                            <h1 className='text-xl w-32'>
                                Sertifikatlar{" "}
                                <p className='text-sky-600'>0 dona</p>
                            </h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-xl mb-4 w-52'>
                                Qaytarib olishlar{" "}
                                <p className='text-sky-600'>1 dona</p>
                            </h1>
                            <h1 className='text-xl w-32'>
                                Qaytarib olishlar summasi{" "}
                                <p className='text-sky-600'>-220 000 UZS</p>
                            </h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-xl mb-4 w-52 '>
                                Almashtirishlar{" "}
                                <p className='text-sky-600'>0 dona</p>
                            </h1>
                            <h1 className='text-xl w-32'>
                                Almashtirishlar summasi{" "}
                                <p className='text-sky-600'>0 UZS</p>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-xl p-5 mt-10 shadow-md border-2'>
                    <div className='flex justify-between mb-10'>
                        <div>
                            <h1 className='text-xl mb-2'>Qarzdorlar soni</h1>
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
                            <h1 className='text-xl mb-4 w-52'>Qoplanganlar</h1>
                            <h1 className='text-xl text-blue-500'>6 Qarzlar</h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-xl mb-2'>Qoplanmaganlar</h1>
                            <h1 className='text-xl text-blue-500'>
                                31 Qarzlar
                            </h1>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-xl mb-2'>
                                Muddatidan o`tganlar
                            </h1>
                            <h1 className='text-xl text-blue-500'>6 Qarzlar</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerGroup;
