import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { message, Table, Modal, Input } from "antd";
import { employees } from "../table/table";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/yangimijoz");
    };

    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null); // Tahrirlanayotgan xodim
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal ko'rinishini boshqarish
    const [editedData, setEditedData] = useState({
        name: "",
        birthday: "",
        phone_number: "",
        passport_series: "",
        login: "",
        password: "",
    }); // Tahrirlanayotgan ma'lumotlar

    // Xodimlar ma'lumotlarini olish
    useEffect(() => {
        axios
            .get("http://localhost:3001/user/all")
            .then((res) => setData(res.data.user))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/user/delete/${id}`)
                    .then((res) => {
                        console.log(res.data.message); // O'chirilgan ma'lumot
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
                axios.get("http://localhost:3001/user/all").then((res) => {
                    setData(res.data.user); // Ma'lumotlarni yangilash
                });
                setSelectedRowKeys([]); // Checkboxni tozalash
            })
            .catch(() => {
                message.error("O'chirishda xatolik yuz berdi");
            });
    };

    const handleEdit = (record) => {
        setEditingEmployee(record);
        setEditedData({
            name: record.name,
            phone_number: record.phone_number,
            birthday: record.birthday,
            passport_series: record.passport_series,
            login: record.login,
            password: record.password,
        });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        axios
            .put(
                `http://localhost:3001/user/put/${editingEmployee.id}`,
                editedData
            )
            .then((res) => {
                message.success("Ma'lumotlar muvaffaqiyatli yangilandi");
                setData((prevData) =>
                    prevData.map((item) =>
                        item.id === editingEmployee.id
                            ? { ...item, ...editedData }
                            : item
                    )
                );
                setIsModalVisible(false);
            })
            .catch((err) => {
                message.error("Yangilashda xatolik yuz berdi");
                console.log(err);
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
                <div>
                    <h1 className='text-4xl'>Barcha Xodimlar</h1>
                </div>
                <div className='flex '>
                    <select id='1' className='border-none pr-4 text-xl'>
                        <option>Statistikani ko`rsatish</option>
                    </select>
                    <div className='mx-5'>
                        <button
                            className='px-3 py-3 border-2 rounded-md bg-slate-50'
                            onClick={handleDelete}
                            disabled={!selectedRowKeys.length}>
                            <DeleteOutlined />
                        </button>
                    </div>
                    <button className='px-3 py-3 border-2 rounded-md bg-slate-50'>
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
                    <select className='px-3 w-36 bg-slate-100 text-xl py-3 rounded-md ml-5'>
                        <option>Filtrlar</option>
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
                        <PlusOutlined className='mr-2' />
                        Yangi xodim
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    columns={[
                        ...employees,
                        {
                            title: "Amallar",
                            render: (text, record) => (
                                <button onClick={() => handleEdit(record)}>
                                    <box-icon
                                        name='edit-alt'
                                        type='solid'
                                        color='#0284c7'></box-icon>
                                </button>
                            ),
                        },
                    ]}
                    dataSource={data}
                    rowKey={(record) => record.id} // Har bir satrni unikal aniqlash
                    rowSelection={rowSelection}
                />
            </div>

            <Modal
                title="Xodim ma'lumotlarini tahrirlash"
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}>
                <Input
                    className='mb-5 mt-5'
                    value={editedData.name}
                    onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                    }
                    placeholder='Ismi'
                />
                <Input
                    className='mb-5'
                    value={editedData.birthday}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            birthday: e.target.value,
                        })
                    }
                    placeholder='Tug`ilgan sanasi'
                />
                <Input
                    className='mb-5'
                    value={editedData.phone_number}
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlaydi

                        // +998 bilan boshlanishi uchun
                        if (value.startsWith("998")) {
                            value = "+" + value;
                        } else {
                            value = "+998" + value;
                        }

                        // Formatlash
                        if (value.length > 4)
                            value = value.slice(0, 4) + " " + value.slice(4);
                        if (value.length > 7)
                            value = value.slice(0, 7) + " " + value.slice(7);
                        if (value.length > 11)
                            value = value.slice(0, 11) + " " + value.slice(11);
                        if (value.length > 14)
                            value = value.slice(0, 14) + " " + value.slice(14);

                        // State-ni yangilash
                        // setPhone_number(value); // Phone_number state-ni yangilaydi
                        setEditedData((prevData) => ({
                            ...prevData,
                            phone_number: value, // editedData ichidagi phone_number-ni yangilaydi
                        }));
                    }}
                    maxLength={17}
                    required
                    placeholder='Telefon'
                />
                <Input
                    className='mb-5'
                    value={editedData.passport_series}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            passport_series: e.target.value,
                        })
                    }
                    placeholder='Passport seriyasi'
                />
                {/* <Input
                    className='mb-5'
                    value={editedData.login}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            login: e.target.value,
                        })
                    }
                    placeholder='Login'
                /> */}
                {/* <Input
                    className='mb-5'
                    value={editedData.password}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            password: e.target.value,
                        })
                    }
                    placeholder='Password'
                /> */}
            </Modal>
        </>
    );
};

export default Employees;
