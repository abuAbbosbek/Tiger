import "boxicons";
import moment from "moment";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Turkum",
        dataIndex: "turkum",
    },
    {
        title: "Tovar nomi",
        dataIndex: "name",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Shtrix-kod",
        dataIndex: "shtrixkod",
    },

    {
        title: "Tavsifi",
        dataIndex: "description",
    },
    {
        title: "Soni",
        dataIndex: "quantity",
    },
];

export const employees = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "F.I.SH",
        dataIndex: "name",
    },
    {
        title: "Tug`ilgan kuni",
        dataIndex: "birthday",
        render: (text) => formatDateTime(text),
    },
    {
        title: "Passport seriyasi",
        dataIndex: "passport_series",
    },
    {
        title: "Telefon",
        dataIndex: "phone_number",
    },
    {
        title: "login",
        dataIndex: "login",
    },
    // {
    //     title: "Teglar",
    //     dataIndex: "password",
    // },
    {
        title: "Yaratilgan vaqt",
        dataIndex: "created",
        render: (text) => formatDate(text),
    },
    // {
    //     title: "Oxirgi xarid",
    //     dataIndex: "role",
    // },
];

export const importdata = [
    {
        title: "ID",
        dataIndex: "id",
        key: "name",
    },
    {
        title: "Tovar nomi",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (text, record) => (
            <span className='text-sky-500'>
                Product Import <br /> {record.id}
            </span>
        ),
    },

    {
        title: "Do`kon",
        dataIndex: "dokon",
        key: "dokon",
    },
    {
        title: "Soni",
        dataIndex: "soni",
        key: "soni",
        render: (text) => (
            <>
                {text.split("\n").map((line, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                        }}>
                        {index === 0 ? (
                            <box-icon
                                name='down-arrow-circle'
                                type='solid'
                                style={{ marginRight: "8px" }}
                                color='#0099e6'></box-icon>
                        ) : (
                            <box-icon
                                name='check-square'
                                type='solid'
                                style={{ marginRight: "8px" }}
                                color='#a5d417'></box-icon>
                        )}
                        {line}
                    </div>
                ))}
            </>
        ),
    },
    {
        title: "Summasi",
        dataIndex: "address",
        key: "address",
        render: (text) => (
            <>
                {text.split("\n").map((line, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                        }}>
                        {index === 0 ? (
                            <box-icon
                                name='down-arrow-circle'
                                type='solid'
                                color='#ffce0b'
                                style={{ marginRight: "8px" }}></box-icon>
                        ) : (
                            <box-icon
                                name='up-arrow-circle'
                                type='solid'
                                color='#8374f1'
                                style={{ marginRight: "8px" }}></box-icon>
                        )}
                        {line}
                    </div>
                ))}
            </>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span
                style={{
                    padding: "5px",
                    borderRadius: "5%",
                    backgroundColor: "green",
                    color: "white",
                }}>
                {text}
            </span>
        ),
    },
];

export const writeoffdata = [
    {
        title: "ID",
        dataIndex: "id",
        key: "name",
    },
    {
        title: "Tovar nomi",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (text) => (
            <span className='text-sky-500'>
                Product WriteOFF <br />{" "}
                {moment(text).format("YYYY-MM-DD HH:mm:ss")}
            </span>
        ),
    },
    {
        title: "Do`kon",
        dataIndex: "dokon",
        key: "dokon",
    },
    {
        title: "Soni",
        dataIndex: "soni",
        key: "soni",
        sorter: (a, b) => a.soni - b.soni,
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Manzil",
        dataIndex: "address",
        key: "address",
        render: (text) => (
            <>
                {text.split("\n").map((line, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                        }}>
                        {index === 0 ? (
                            <box-icon
                                name='down-arrow-circle'
                                type='solid'
                                color='#ffce0b'
                                style={{ marginRight: "8px" }}></box-icon>
                        ) : (
                            <box-icon
                                name='up-arrow-circle'
                                type='solid'
                                color='#8374f1'
                                style={{ marginRight: "8px" }}></box-icon>
                        )}
                        {line}
                    </div>
                ))}
            </>
        ),
    },
    {
        title: "Hisobdan chiqarish",
        dataIndex: "writeoff",
    },
];

export const repricingdata = [
    {
        title: "ID",
        dataIndex: "id",
        key: "name",
    },
    {
        title: "Tovar nomi",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (text) => (
            <span className='text-sky-500'>
                Product Repricing <br />{" "}
                {moment(text).format("YYYY-MM-DD HH:mm:ss")}
            </span>
        ),
    },

    {
        title: "Do`kon",
        dataIndex: "dokon",
        key: "dokon",
    },
    {
        title: "Uslub",
        dataIndex: "uslub",
        key: "uslub",
    },
    {
        title: "Soni",
        dataIndex: "soni",
        key: "soni",
        sorter: (a, b) => a.soni - b.soni,
        sortDirections: ["ascend", "descend"],
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text) => (
            <span
                style={{
                    padding: "5px",
                    borderRadius: "5%",
                    backgroundColor: "green",
                    color: "white",
                }}>
                {text}
            </span>
        ),
    },
];

export const clientstable = [
    {
        title: "ID",
        dataIndex: "id",
        key: "name",
    },
    {
        title: "Nick name",
        dataIndex: "Nick_name",
    },
    {
        title: "F.I.SH",
        dataIndex: "Full_name",
        key: "name",
    },
    {
        title: "Passport",
        dataIndex: "Passport",
    },
    {
        title: "Tug'ilgan yili",
        dataIndex: "Date_of_birth",
    },
    {
        title: "Jinsi",
        dataIndex: "Sex",
    },
    {
        title: "Telefon nomer 1",
        dataIndex: "Phone_num1",
    },
    {
        title: "Telefon nomer 2",
        dataIndex: "Phone_num2",
    },
    {
        title: "Yashash joyi",
        dataIndex: "Adress",
    },
    {
        title: "Yaratilgan vaqt",
        dataIndex: "created",
        key: "created",
        // render: (text) => formatDateTime(text),
    },
];

export const katalog = [
    {
        title: "ID",
        dataIndex: "id",
        key: "name",
    },
    {
        title: "Tovar nomi",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Yaratilgan vaqtdi",
        dataIndex: "created",
        key: "created",
        render: (text) => formatDateTime(text),
    },
];

export const newsales = [
    {
        title: "Turkum",
        dataIndex: "product_id",
    },
    {
        title: "Soni",
        dataIndex: "quantity",
    },
    {
        title: "Jami Narx", // Qo'shilgan ustun
        dataIndex: "price",
        key: "price",
        render: (price) => `${price} UZS`, // Narxni formatlash
    },
];
