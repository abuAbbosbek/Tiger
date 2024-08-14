import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Table } from "antd";
import { customers } from "../table/table";
import { CustomersData } from "../tabledata/tabledata";
import { useNavigate } from "react-router-dom";

// const Customers = () => {
//     const navigate = useNavigate();

//     const handleButtonClick = () => {
//         navigate("/yangi-mijoz");
//     };

//     return (
//         <>
//             <div className='flex justify-between'>
//                 <div className=''>
//                     <h1 className='text-4xl'>Barcha mijozlar</h1>
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

//             <div className='mt-7 flex'>
//                 <div>
//                     <input
//                         className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100
//                     '
//                         type='search'
//                         placeholder='ID, ismi, telefon'
//                     />
//                     <select
//                         id='1'
//                         className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
//                         <option>Filtrlar</option>
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
//                     >
//                     <button>
//                         <PlusOutlined className='mr-2' />
//                         Yangi mijoz
//                     </button>
//                 </div>
//             </div>

//             <div>
//                 <br />
//                 <Table columns={customers} dataSource={CustomersData} />
//             </div>
//         </>
//     );
// };

// export default Customers;

const Customers = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/yangi-mijoz");
    };

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
                        {/* Add onClick here */}
                        <PlusOutlined className='mr-2' />
                        Yangi mijoz
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table columns={customers} dataSource={CustomersData} />
            </div>
        </>
    );
};

export default Customers;
