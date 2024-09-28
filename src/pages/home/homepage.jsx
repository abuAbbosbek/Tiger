import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

// Scale va elementlarni ro'yxatdan o'tkazish
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const HomePage = () => {
    const [vaqt, setVaqt] = useState("");
    const data = {
        labels: [
            "Dushanba",
            "Seshanba",
            "Chorshanba",
            "Payshanba",
            "Juma",
            "Shanba",
            "Yakshanba",
        ],
        datasets: [
            {
                label: "Tushum",
                data: [12, 19, 3, 5, 2, 20, 40], // Ma'lumotlar
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4, // Chiziqlarni silliqlashtirish
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        const vaqtniYangilash = () => {
            const hozir = new Date();
            const kun = String(hozir.getDate()).padStart(2, "0");
            const oy = String(hozir.getMonth() + 1).padStart(2, "0"); // Oylari 0 dan boshlanadi
            const yil = hozir.getFullYear();
            const soat = String(hozir.getHours()).padStart(2, "0");
            const daqiqa = String(hozir.getMinutes()).padStart(2, "0");

            // Vaqtni kerakli formatda sozlash
            setVaqt(`${kun}.${oy}.${yil} ${soat}:${daqiqa}`);
        };

        vaqtniYangilash(); // Dastlabki chaqiruv
        const interval = setInterval(vaqtniYangilash, 1000); // Har soniyada yangilab turish

        return () => clearInterval(interval); // Komponent o‘chirilganda tozalash
    }, []);

    return (
        <>
            <div className=''>
                <div className='flex flex-wrap gap-5 p-5'>
                    <div className='bg-sky-500 rounded-xl flex-1 min-w-[250px]'>
                        <div className='px-4 py-3 text-xl font-semibold'>
                            Bugungi tushim
                        </div>
                        <div className='px-4 py-2 text-xl'>
                            <div className='flex items-center'>
                                <box-icon
                                    name='up-arrow-circle'
                                    type='solid'
                                    color='#49D416'
                                    style={{ marginRight: "8px" }}></box-icon>
                                15% kechagiga nisbatan
                            </div>
                        </div>
                    </div>
                    <div className='bg-sky-500 rounded-xl flex-1 min-w-[250px]'>
                        <div className='px-3 py-2 text-xl font-semibold'>
                            Kurs
                        </div>
                    </div>
                    <div className='bg-sky-500 rounded-xl flex-1 min-w-[250px]'>
                        <div className='px-4 py-3 text-xl font-semibold'>
                            Bugun: {vaqt}
                        </div>
                    </div>
                </div>

                <div className='w-full bg-white rounded-xl mt-10 border-black border-2'>
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
};

export default HomePage;
