import { PlusOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ImportData } from "../tabledata/tabledata";
import { importdata } from "../table/table";
import { useState } from "react";
import axios from "axios";

const Import = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post(
                    "YOUR_BACKEND_URL/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setMessage("Fayl muvaffaqiyatli yuklandi!");
            } catch (error) {
                setMessage("Faylni yuklashda xatolik yuz berdi.");
            }
        }
    };

    return (
        <>
            <div>
                <div>
                    <h1 className='text-4xl'>Import</h1>
                </div>
                <div className='mt-7 flex'>
                    <div>
                        <input
                            className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100
                    '
                            type='search'
                            placeholder='Id, nomi, soni'
                        />
                        <select
                            id='1'
                            className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                            <option> Filtrlar</option>
                            <option value=''>sdas</option>
                        </select>
                    </div>
                    <div className='px-3  bg-sky-500 text-xl py-3 rounded-md ml-5'>
                        <button onClick={toggleDrawer}>
                            <PlusOutlined className='mr-2' />
                            Yangi import
                        </button>
                    </div>
                </div>
            </div>
            <Table
                dataSource={ImportData}
                columns={importdata}
                className='mt-2'
            />
            <div>
                {/* Overlay qatlam */}
                {isOpen && (
                    <div
                        className='fixed inset-0 bg-black bg-opacity-50 z-40'
                        onClick={toggleDrawer}
                    />
                )}

                {/* Drawer */}
                <div
                    className={`fixed top-0 right-0 h-full w-[600px] bg-white text-black transform rounded-3xl p-4 z-50 ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out overflow-y-auto`}>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-4xl'>Yangi import</h1>
                        <button
                            onClick={toggleDrawer}
                            className='p-2 m-2 text-black text-2xl border bg-slate-100 rounded-full w-10 h-10 flex items-center justify-center'>
                            &times;
                        </button>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-4'>
                            <div className='mb-4 flex-1'>
                                <label
                                    className='block text-black mb-2 text-xl'
                                    htmlFor='input'>
                                    Nomi
                                </label>
                                <input
                                    type='text'
                                    id='input'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className='w-full p-2 border border-gray-300 rounded'
                                    placeholder='Nomini kiriting...'
                                />
                            </div>
                            <div className='mb-4 flex-1'>
                                <label
                                    className='block text-black mb-2 text-xl'
                                    htmlFor='select'>
                                    Do`kon
                                </label>
                                <select
                                    id='select'
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                    className='w-full p-2 border border-gray-300 rounded'>
                                    <option value=''>Do`konni tanlang</option>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </select>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className='p-4'>
                            <div className='mb-4'>
                                <label
                                    className='block text-black mb-2 text-xl'
                                    htmlFor='fileUpload'>
                                    Faylni tanlang:
                                </label>
                                <input
                                    type='file'
                                    id='fileUpload'
                                    onChange={handleFileChange}
                                    className='w-full h-[200px] p-2 border border-gray-300 rounded'
                                />
                            </div>
                            {file && (
                                <div className='mb-4 text-black'>
                                    Tanlangan fayl: {file.name}
                                </div>
                            )}
                            <button
                                type='submit'
                                className='bg-blue-500 text-white p-2 rounded'>
                                Yuklash
                            </button>
                            {message && (
                                <p className='mt-4 text-black'>{message}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Import;
