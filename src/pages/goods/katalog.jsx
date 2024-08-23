import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { columns } from "../table/table";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import KatalogModal from "../modal/katalogmodal";
import axios from "axios";

const Katalog = () => {

    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3001/product/all")
            .then((res) => setData(res.data.product))
            .catch((err) => console.log(err));
    });
    console.log(data);

    const [open, setOpen] = useState(false);

    const handlyOpenModal = () => {
        setOpen(true);
    };
    const handlyCancel = () => {
        setOpen(false);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: "odd",
                text: "Select Odd Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        }
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: "even",
                text: "Select Even Row",
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter(
                        (_, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        }
                    );
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='text-4xl'>Katalog</h1>
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

            <div className='flex gap-10 text-xl mt-5'>
                <div className='rounded-md px-3 bg-slate-100'>
                    <button>Barchasi()</button>
                </div>
                <div className='rounded-md px-3 bg-slate-100'>
                    <button>Faol()</button>
                </div>
                <div className='rounded-md px-3 bg-slate-100'>
                    <button>Faol emas()</button>
                </div>
                <div className='rounded-md px-3 bg-slate-100'>
                    <button>Kam qoldiq()</button>
                </div>
                <div className='rounded-md px-3 bg-slate-100'>
                    <button>Qolmagan tovarlar()</button>
                </div>
            </div>

            <div className='mt-7 flex'>
                <div>
                    <input
                        className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100
                    '
                        type='search'
                        placeholder='Artikl, Shtrix-kod, Nomi'
                    />
                    <select
                        id='1'
                        className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                        <option> Filtrlar</option>
                        <option value=''>sdas</option>
                    </select>
                </div>
                <div className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                    <button>
                        <CodeSandboxOutlined className='mr-2' />
                        Harakatlar
                    </button>
                </div>
                <div
                    className='px-3  bg-sky-500 text-xl py-3 rounded-md ml-5'
                    onClick={handlyOpenModal}>
                    <button>
                        <PlusOutlined className='mr-2' />
                        Yaratish
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    showSorterTooltip={{
                        target: "sorter-icon",
                    }}
                />
            </div>

            {open &&
                createPortal(
                    <KatalogModal onCancel={handlyCancel} />,
                    document.body
                )}
        </>
    );
};

export default Katalog;
