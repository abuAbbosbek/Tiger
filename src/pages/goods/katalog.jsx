// import {
//     CodeSandboxOutlined,
//     DeleteOutlined,
//     PlusOutlined,
//     UnorderedListOutlined,
// } from "@ant-design/icons";
// import { Table } from "antd";
// import { columns } from "../table/table";
// import { createPortal } from "react-dom";
// import { useEffect, useState } from "react";
// import KatalogModal from "../modal/katalogmodal";
// import axios from "axios";

// const Katalog = () => {
//     const [data, setData] = useState();

//     useEffect(() => {
//         axios
//             .get("http://localhost:3001/product/all")
//             .then((res) => setData(res.data.product))
//             .catch((err) => console.log(err));
//     });
//     console.log(data);

//     const [open, setOpen] = useState(false);

//     const handlyOpenModal = () => {
//         setOpen(true);
//     };
//     const handlyCancel = () => {
//         setOpen(false);
//     };

//     return (
//         <>
//             <div className='flex justify-between'>
//                 <div className=''>
//                     <h1 className='text-4xl'>Katalog</h1>
//                 </div>
//                 <div className='flex '>
//                     <select id='1' className='border-none pr-4 text-xl'>
//                         <option className=''>Statistikani ko`rsatish</option>
//                         <option className=''>Statistikani ko`rsatish</option>
//                         <option className=''>Statistikani ko`rsatish</option>
//                     </select>
//                     <div className='mx-5'>
//                         <button className='px-3 py-3 border-2 rounded-md bg-slate-50 '>
//                             <DeleteOutlined />
//                         </button>
//                     </div>
//                     <button className='px-3 py-3 border-2 rounded-md bg-slate-50 '>
//                         <UnorderedListOutlined />
//                     </button>
//                 </div>
//             </div>

//             <div className='flex gap-10 text-xl mt-5'>
//                 <div className='rounded-md px-3 bg-slate-100'>
//                     <button>Barchasi()</button>
//                 </div>
//                 <div className='rounded-md px-3 bg-slate-100'>
//                     <button>Faol()</button>
//                 </div>
//                 <div className='rounded-md px-3 bg-slate-100'>
//                     <button>Faol emas()</button>
//                 </div>
//                 <div className='rounded-md px-3 bg-slate-100'>
//                     <button>Kam qoldiq()</button>
//                 </div>
//                 <div className='rounded-md px-3 bg-slate-100'>
//                     <button>Qolmagan tovarlar()</button>
//                 </div>
//             </div>

//             <div className='mt-7 flex'>
//                 <div>
//                     <input
//                         className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100
//                     '
//                         type='search'
//                         placeholder='Artikl, Shtrix-kod, Nomi'
//                     />
//                     <select
//                         id='1'
//                         className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
//                         <option> Filtrlar</option>
//                         <option value=''>sdas</option>
//                     </select>
//                 </div>
//                 <div className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
//                     <button>
//                         <CodeSandboxOutlined className='mr-2' />
//                         Harakatlar
//                     </button>
//                 </div>
//                 <div
//                     className='px-3  bg-sky-500 text-xl py-3 rounded-md ml-5'
//                     onClick={handlyOpenModal}>
//                     <button>
//                         <PlusOutlined className='mr-2' />
//                         Yaratish
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <br />
//                 <Table
//                     columns={columns}
//                     dataSource={data}
//                     showSorterTooltip={{
//                         target: "sorter-icon",
//                     }}
//                 />
//             </div>

//             {open &&
//                 createPortal(
//                     <KatalogModal onCancel={handlyCancel} />,
//                     document.body
//                 )}
//         </>
//     );
// };

// export default Katalog;


import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Table, message } from "antd";
import { columns } from "../table/table";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import KatalogModal from "../modal/katalogmodal";
import axios from "axios";

const Katalog = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Checkbox tanlangan satrlar uchun

    useEffect(() => {
        axios
            .get("http://localhost:3001/product/all")
            .then((res) => setData(res.data.product))
            .catch((err) => console.log(err));
    }, []); // Ma'lumotlarni faqat bir marta olish uchun

    console.log(data);

    const [open, setOpen] = useState(false);

    const handlyOpenModal = () => {
        setOpen(true);
    };
    const handlyCancel = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/product/delete/${id}`)
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
                axios.get("http://localhost:3001/product/all").then((res) => {
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
                        <button
                            className='px-3 py-3 border-2 rounded-md bg-slate-50 '
                            onClick={handleDelete}
                            disabled={!selectedRowKeys.length} // Agar hech narsa tanlanmagan bo'lsa, tugma disabled bo'ladi
                        >
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
                        className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100'
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
                    rowKey={(record) => record.id} // Har bir satrni unikal aniqlash
                    rowSelection={rowSelection} // Checkboxlar uchun
                    columns={columns}
                    dataSource={data}
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
