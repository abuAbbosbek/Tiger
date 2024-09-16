import "boxicons";

const HomePage = () => {
    return (
        <>
            <div className='flex gap-5'>
                <div className='w-[300px] bg-sky-500 rounded-xl'>
                    <div className='text-center text-xl'>Bugungi tushim</div>
                    <div className='text-center text-xl'>
                        <div>
                            <box-icon
                                name='up-arrow-circle'
                                type='solid'
                                color='#49D416'
                                style={{ marginRight: "8px" }}></box-icon>
                            15% kechagiga nisbatan
                        </div>
                    </div>
                </div>
                <div className='  bg-sky-500 rounded-xl'>
                    <button className='text-xl text-center px-5 py-2'>
                        Kurs
                    </button>
                </div>
            </div>
        </>
    );
};

export default HomePage;
