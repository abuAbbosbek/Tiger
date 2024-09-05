import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { message, Table } from "antd";
import { employees } from "../table/table";
import { useNavigate } from "react-router-dom";
// import { CustomersData } from "../tabledata/tabledata";
import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/yangimijoz");
    };

    const [data, setData] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/user/all")
            .then((res) => setData(res.data.user))
            .catch((err) => console.log(err));
    });



    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/user/delete/${id}`)
                    .then((res) => {
                        console.log(res.data.massage); // O'chirilgan ma'lumot
                    })
                    .catch((err) => {
                        console.error(`Xatolik yuz berdi: ${id}`, err);
                    })
            )
        )
            .then(() => {
                message.success(
                    "Tanlangan elementlar muvaffaqiyatli o'chirildi"
                );
                // O'chirilganidan keyin API orqali yangi ma'lumotlarni olish
                axios.get("http://localhost:3001/user/all").then((res) => {
                    setData(res.data.product); // Backenddan olingan yangi ma'lumotlarni yuklash
                });
                setSelectedRowKeys([]); // Checkboxni tozalash
            })
            .catch(() => {
                message.error("O'chirishda xatolik yuz berdi");
            });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    console.log(data);

    return (
        <>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='text-4xl'>Barcha Xodimlar</h1>
                </div>
                <div className='flex '>
                    <select id='1' className='border-none pr-4 text-xl'>
                        <option className=''>Statistikani ko`rsatish</option>
                        <option className=''>Statistikani ko`rsatish</option>
                        <option className=''>Statistikani ko`rsatish</option>
                    </select>
                    <div className='mx-5'>
                        <button
                            className='px-3 py-3 border-2 rounded-md bg-slate-50 '
                            onClick={handleDelete}
                            disabled={!selectedRowKeys.length}>
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
                        Yangi xodim
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    columns={employees}
                    dataSource={data}
                    rowKey={(record) => record.id} // Har bir satrni unikal aniqlash
                    rowSelection={rowSelection}
                    showSorterTooltip={{
                        target: "sorter-icon",
                    }}
                />
            </div>
        </>
    );
};

export default Employees;
