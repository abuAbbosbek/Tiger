import { SettingOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import 'boxicons'
import moment from "moment";

export const columns = [
    {
        title: "Rasm",
        dataIndex: "rasm",
    },
    {
        title: "Tovar nomi",
        dataIndex: "tovarnomi",
    },
    {
        title: "Artikl",
        dataIndex: "artikl",
    },
    {
        title: "Shtrix-kod",
        dataIndex: "shtrixkod",
    },
    {
        title: "Turkum",
        dataIndex: "turkum",
    },
    {
        title: "Yetkazib berish",
        dataIndex: "yetkazibberish",
    },
    {
        title: <SettingOutlined />,
        dataIndex: "things",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.things - b.things,
    },
];

export const customers = [
    {
        title: <Checkbox />,
        dataIndex: "checkbox",
    },
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "F.I.SH",
        dataIndex: "fish",
    },
    {
        title: "Telefon",
        dataIndex: "telefon",
    },
    {
        title: "Guruhlar",
        dataIndex: "guruhlar",
    },
    {
        title: "Teglar",
        dataIndex: "teglar",
    },
    {
        title: "Xarid summasi",
        dataIndex: "xaridsummasi",
    },
    {
        title: "Oxirgi xarid",
        dataIndex: "oxirgixarid",
    },
    {
        title: "Tug'ilgan kuni",
        dataIndex: "tugilgankuni"
    },
    {
        title: "Yaratilgan vaqt",
        dataIndex: "yaratilganvaqt",
    },
    {
        title: <SettingOutlined />,
    }
];


export const importdata = [
    {
        title: "ID",
        dataIndex: "id",
    },    {
        title: "Tovar nomi",
        dataIndex: "tovarnomi",
    },
    {
        title: "Do`kon",
        dataIndex: "dokon",
    },
    {
        title: "Soni",
        dataIndex: "soni",
    },
    {
        title: "Summasi",
        dataIndex: "summasi",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: <SettingOutlined />,
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