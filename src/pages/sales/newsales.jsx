import { Switch } from "antd";
import "boxicons";
import { useState } from "react";
const NewSales = () => {

    const [active, setActive] = useState("%");

    return (
        <>
            <div className='flex '>
                <div className='w-7/10 p-2 m-2 '>
                    <div className='flex gap-5'>
                        <div className=' mb-7'>
                            <div className='flex'>
                                <input
                                    className='text-xl px-3 py-3 w-[860px] rounded-md bg-slate-100'
                                    type='search'
                                    placeholder='Artikl, Shtrix-kod, Nomi'
                                />
                                {/* <span className='flex gap-1 text-xl mt-2 absolute opacity-90'>
                                    Bosing <p>/</p>
                                </span> */}
                            </div>
                        </div>
                        <div className='gap'>
                            <button className='px-3 py-3 border-2 rounded-md bg-slate-50 ml-2'>
                                <box-icon
                                    name='credit-card'
                                    color='#439bef'></box-icon>
                            </button>
                            <button className='px-3 py-3 border-2 rounded-md bg-slate-50 ml-2'>
                                <box-icon
                                    name='transfer-alt'
                                    color='#439bef'></box-icon>
                            </button>
                            <button className='px-3 py-3 border-2 rounded-md bg-slate-50 ml-2'>
                                <box-icon
                                    name='hourglass'
                                    color='#439bef'></box-icon>
                            </button>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <h1 className='text-5xl mb-2'>Savatcha</h1>
                            <h1 className='text-lg bg-slate-100 rounded-xl py-1 px-4 ml-5 '>
                                0
                            </h1>
                            <div>
                                <h1 className='ml-5 text-lg bg-slate-100 rounded-xl py-1.5 px-4'>
                                    Ulgurji narxlar <Switch />{" "}
                                </h1>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-4xl text-gray-400'>#993574</h1>
                        </div>
                    </div>

                    <div className='flex mt-5 mb-5 '>
                        <div>
                            <button className='text-xl bg-sky-500 p-2 rounded-xl '>
                                Barcha sotuvchilar
                            </button>
                        </div>
                        <div>
                            <button className='text-xl bg-gray-100 px-4 py-2.5 rounded-xl ml-5 text-center items-center flex'>
                                <box-icon
                                    name='plus-circle'
                                    type='solid'
                                    color='#439bef'></box-icon>
                            </button>
                        </div>
                    </div>

                    <div className='w-full h-96  rounded-xl border-2 shadow-md'>
                        <h1 className='text-center mt-[170px] justify-center text-xl'>
                            Savatcha hozircha bo`sh
                        </h1>
                    </div>
                </div>

                <hr className='w-[1px] h-[1000px] bg-gray-400 inline-block mx-5' />

                <div className='w-3/10 p-4 m-2'>
                    <div>
                        <div className='flex justify-between mb-5'>
                            <div className='items-center'>
                                <h1 className='text-2xl'>
                                    Mijoz{" "}
                                    <span className='text-xl text-slate-500 px-2 border-2 border-gray rounded-md text-center ml-2'>
                                        J
                                    </span>
                                </h1>
                            </div>
                            <div className='text-xl mt-1 text-sky-500'>
                                <a href='#'>Yaratish</a>
                            </div>
                        </div>
                        <div className='mb-7'>
                            <div className='relative'>
                                <input
                                    type='search'
                                    placeholder='Mijozni ismi yoki telefon rqamini kiriting...'
                                    className='pl-10 border border-gray-300 text-xl px-3 py-3 w-full rounded-md bg-slate-100'
                                />
                                <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                    <box-icon
                                        name='user'
                                        color='#439bef'></box-icon>
                                </span>
                            </div>
                        </div>

                        <div className='flex justify-between mb-5'>
                            <div className='items-center'>
                                <h1 className='text-2xl'>
                                    Chegirma{" "}
                                    <span className='text-xl text-slate-500 px-2 border-2 border-gray rounded-md text-center ml-2'>
                                        K
                                    </span>
                                </h1>
                            </div>
                            <div className='text-xl mt-1 text-sky-500'>
                                <a href='#'>Kodni kiritish</a>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <button className='px-3 py-3 border-2 rounded-xl bg-slate-50 text-xl'>
                                    Chegirmani kiriting
                                </button>
                            </div>
                            <div className='inline-flex rounded-full bg-gray-100 p-1'>
                                <button
                                    onClick={() => setActive("%")}
                                    className={`py-2 px-6 rounded-full font-medium ${
                                        active === "%"
                                            ? "bg-white text-gray-800"
                                            : "text-gray-500"
                                    }`}>
                                    %
                                </button>
                                <button
                                    onClick={() => setActive("UZS")}
                                    className={`py-2 px-4 rounded-full font-medium ${
                                        active === "UZS"
                                            ? "bg-white text-gray-800"
                                            : "text-gray-500"
                                    }`}>
                                    UZS
                                </button>
                            </div>
                        </div>
                        <div className='flex mt-2 justify-between'>
                            <div className=''>
                                <button className='px-3 py-1 border-1 rounded-xl bg-slate-50 text-xl'>
                                    50K
                                </button>
                            </div>
                            <div className=''>
                                <button className='px-3 py-1 border-1 rounded-xl bg-slate-50 text-xl'>
                                    100K
                                </button>
                            </div>
                            <div className=''>
                                <button className='px-3 py-1 border-1 rounded-xl bg-slate-50 text-xl'>
                                    500K
                                </button>
                            </div>
                            <div className=''>
                                <button className='px-3 py-1 border-1 rounded-xl bg-slate-50 text-xl'>
                                    1M
                                </button>
                            </div>
                        </div>
                        <div className='mt-10 justify-center flex'>
                            <button className='px-4 py-3 border-1 rounded-xl bg-slate-50 text-xl items-center flex text-sky-500'>
                                {" "}
                                <box-icon
                                    name='plus'
                                    color='#439bef'></box-icon>{" "}
                                Eslatmani qo`shish
                            </button>
                        </div>

                        <div className='bg-white rounded-xl px-4 py-4 mt-4 shadow-md border-2 '>
                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-2 text-gray-600'>
                                    Oraliq jami
                                </h1>
                                <h1 className='text-xl text-gray-600'>0 UZS</h1>
                            </div>

                            <div className='flex justify-between'>
                                <h1 className='text-xl mb-2 text-gray-600'>
                                    Chegirma
                                </h1>
                                <h1 className='text-xl text-gray-600'>0 UZS</h1>
                            </div>

                            <div className='flex justify-between mt-4 bg-slate-300 rounded-xl px-4 py-3 w-full'>
                                <h1 className='text-xl mb-2 text-white'>
                                    To`lash{" "}
                                    <span className='text-xl text-white px-2  border-2 border-gray rounded-md text-center ml-2'>
                                        L
                                    </span>
                                </h1>
                                <h1 className='text-xl text-white'>0 UZS</h1>
                            </div>

                            <div className='mt-5 text-center'>
                                <h1 className='text-xl mb-2 text-gray-600'>
                                    Kechiktirish
                                    <span className='text-xl text-slate-500 px-2  border-2 border-gray rounded-md text-center ml-2'>
                                        O
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewSales;
