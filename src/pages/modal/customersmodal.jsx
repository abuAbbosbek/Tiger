const CustomersModal = ({ onCancel }) => {
    return (
        <div
            className='w-full h-screen fixed top-0 left-0 bg-[#0009]'
            onClick={() => onCancel()}>
            <div
                className='absolute bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-3 '
                onClick={(e) => e.stopPropagation()}>
                <div className=''>
                    <div>
                        <h1>ID</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>F.I.SH</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>Telefon</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>

                    <div>
                        <h1>Guruhlar</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>Teglar</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>Xarid summasi</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>Oxirgi xarid</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                    <div>
                        <h1>Tug`ilgan kuni</h1>
                        <input
                            type='text'
                            className='border-solid border-2 border-sky-500 pr-48 pl-4 pb-1 pt-1 rounded-xl'
                        />
                    </div>
                </div>

                <div className='justify-center flex mt-5 gap-10'>
                    <button
                        className='pt-2.5 pb-2.5 pl-3 pr-3 border-red-600 border-2 rounded-xl bg-red-600 text-white hover:bg-white active:bg-red-700 hover:text-black focus:outline-none focus:ring focus:ring-red-600'
                        onClick={() => onCancel()}>
                        Bekor qilish
                    </button>
                    <button className='pt-2.5 pb-2.5 pl-3 pr-3 border-sky-500 border-2 rounded-xl bg-sky-500 text-white hover:bg-white active:bg-sky-600 hover:text-black focus:outline-none focus:ring focus:ring-sky-600'>
                        Qo`shish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomersModal;
