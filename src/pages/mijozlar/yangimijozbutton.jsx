
function YangiMijoz() {
    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <div className='w-1/4 bg-white p-4 shadow-lg'>
                <ul className='space-y-4'>
                    <li className='text-blue-600'>Asosiy</li>
                    <li>Manzil</li>
                    <li>Ijtimoiy tarmoqlar</li>
                    <li>Qarindoshlar</li>
                    <li>Guruhlar / Teglar</li>
                    <li>Xabarlar</li>
                    <li>Kartalar</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className='w-3/4 p-8'>
                <h1 className='text-2xl font-bold mb-4'>Yangi mijoz</h1>

                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h2 className='text-xl font-bold mb-4'>Asosiy</h2>

                    <form className='space-y-4'>
                        <div className='flex space-x-4'>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Ism
                                </label>
                                <input
                                    type='text'
                                    placeholder='Ismni kiriting'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                            </div>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Familiya
                                </label>
                                <input
                                    type='text'
                                    placeholder='Familiyani kiriting'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                            </div>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Otasining ismi
                                </label>
                                <input
                                    type='text'
                                    placeholder='Otasining ismini kiriting'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Tug`ilgan kuni
                                </label>
                                <input
                                    type='text'
                                    placeholder='KK'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                            </div>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Jins
                                </label>
                                <div className='flex items-center space-x-4'>
                                    <label className='inline-flex items-center'>
                                        <input
                                            type='radio'
                                            name='gender'
                                            className='form-radio text-blue-600'
                                        />
                                        <span className='ml-2'>Erkak</span>
                                    </label>
                                    <label className='inline-flex items-center'>
                                        <input
                                            type='radio'
                                            name='gender'
                                            className='form-radio text-blue-600'
                                        />
                                        <span className='ml-2'>Ayol</span>
                                    </label>
                                </div>
                            </div>
                            <div className='w-1/3'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Telefon
                                </label>
                                <input
                                    type='text'
                                    placeholder='Telefon raqamni kiriting'
                                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <div className='w-1/2'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Oilaviy ahvol
                                </label>
                                <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'>
                                    <option>Turmushda emas</option>
                                    <option>Turmushda</option>
                                </select>
                            </div>
                            <div className='w-1/2'>
                                <label className='block text-sm font-medium text-gray-700'>
                                    Suhbat tili
                                </label>
                                <div className='flex items-center space-x-4'>
                                    <img
                                        src='uzb-flag.png'
                                        alt='Uzb Flag'
                                        className='w-8 h-5'
                                    />
                                    <img
                                        src='rus-flag.png'
                                        alt='Rus Flag'
                                        className='w-8 h-5'
                                    />
                                    <img
                                        src='eng-flag.png'
                                        alt='Eng Flag'
                                        className='w-8 h-5'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-blue-600 text-white rounded-md'>
                                Yaratish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default YangiMijoz;
