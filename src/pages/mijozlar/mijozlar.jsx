import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { customers } from "../table/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
const Customers = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/yangimijoz");
    };


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // API'ga so'rov yuborish
        fetch("https://b91a-188-113-244-159.ngrok-free.app/user/all")
            .then((response) => response.json())
            .then((data) => {
                // Ma'lumotlarni qabul qilish
                setData(data); // `data`ni olingan ma'lumotlarga o'rnatamiz
                setLoading(false); // Yuklanish tugadi
            })
            .catch((error) => {
                console.error("API so'rovi xatosi:", error);
                setLoading(false); // Yuklanish tugadi
            });
    }, []);

    return (
        <>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='text-4xl'>Barcha mijozlar</h1>
                </div>
                <div className='flex '>
                    <select id='1' className='border-none pr-4 text-xl'>
                        <option className=''>Statistikani ko`rsatish</option>
                        <option className=''>Statistikani ko`rsatish</option>
                        <option className=''>Statistikani ko`rsatish</option>
                    </select>
                    <div className='mx-5'>
                        <button className='px-3 py-3 border-2 rounded-md bg-slate-50 '>
                            <DeleteOutlined />
                        </button>
                    </div>
                    <button className='px-3 py-3 border-2 rounded-md bg-slate-50 '>
                        <UnorderedListOutlined />
                    </button>
                </div>
            </div>

            <div className='mt-7 flex'>
                <div>
                    <input
                        className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100'
                        type='search'
                        placeholder='ID, ismi, telefon'
                    />
                    <select
                        id='1'
                        className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                        <option>Filtrlar</option>
                        <option value=''>sdas</option>
                    </select>
                </div>
                <div className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                    <button>
                        <CodeSandboxOutlined className='mr-2' />
                        Harakatlar
                    </button>
                </div>
                <div className='px-3 bg-sky-500 text-xl py-3 rounded-md ml-5'>
                    <button onClick={handleButtonClick}>
                        {" "}
                        <PlusOutlined className='mr-2' />
                        Yangi mijoz
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table columns={customers} dataSource={data} loading={loading} rowKey='id' />
            </div>

            <div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    );
};

export default Customers;
