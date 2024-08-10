import { RightCircleTwoTone } from "@ant-design/icons";

const ShopChildreanPage = () => {
    return (
        <>
            <div className='mb-5'>
                <h1 className='text-4xl'>Do`kon hisoboti</h1>
            </div>

            <div className="flex gap-10">
                <div className='w-[500px] h-[250px] border-2 shadow-lg shadow-black-500/40  rounded-xl'>
                    <div className='mx-5 py-5'>
                        <h3 className='mb-1.5 opacity-60'>Hisobot</h3>
                        <h1 className='text-2xl mb-2 text-black'>
                            Konsolidatsiyalangan
                        </h1>
                        <p className='text-base opacity-90 mb-2'>
                            Do`konning asosiy ko`rsatkichlari bo`yicha umumiy
                            statistik ma`lumotlar, shu jumladan savdolar,
                            mahsulotlar, mijozlar va sotuvchilar statistikasi.
                        </p>
                        <a href='#' className='text-sky-400 '>
                            Hisobotga o`ting{" "}
                            <RightCircleTwoTone className='ml-0.5' />
                        </a>
                    </div>
                </div>

                <div className='w-[500px] h-[250px] border-2 shadow-lg shadow-black-500/40  rounded-xl'>
                    <div className='mx-5 py-5'>
                        <h3 className='mb-1.5 opacity-60'>Hisobot</h3>
                        <h1 className='text-2xl mb-2 text-black'>
                            Bitimlar
                        </h1>
                        <p className='text-base opacity-90 mb-2 '>
                            Tranzaksiya hisobati barcha tranzaksiya statistikasini k`rsatadi.
                        </p>
                        <a href='#' className='text-sky-400 mt-2'>
                            Hisobotga o`ting{" "}
                            <RightCircleTwoTone className='ml-0.5' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopChildreanPage;
