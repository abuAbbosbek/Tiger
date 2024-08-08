import { CodeSandboxOutlined, PlusOutlined } from "@ant-design/icons";

const WriteOff = () => {
    // const [open, setOpen] = useState(false);

    // const handlyOpenModal = () => {
    //     setOpen(true);
    // };
    // const handlyCancel = () => {
    //     setOpen(false);
    // };
    return (
        <>
            <div>
                <div>
                    <h1 className='text-4xl'>Hisobdan chiqarish</h1>
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
                    <div className='px-3  bg-sky-500 text-xl py-3 rounded-md ml-5'>
                        <button>
                            <PlusOutlined className='mr-2' />
                            Yaratish
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WriteOff;
