import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Table } from "antd";
import { clientstable } from "../table/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "antd/lib/input/Search";
import { set } from "date-fns";

const { Option } = Select;
const Customers = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Checkbox tanlangan satrlar uchun
    const [editingEmployee, setEditingEmployee] = useState(null); // Tahrirlanayotgan xodim
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal ko'rinishini boshqarish
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Yaratish modalini
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [editedData, setEditedData] = useState({
        Nick_name: "",
        Full_name: "",
        Passport: "",
        Date_of_birth: "",
        Sex: "",
        Phone_num1: "",
        Phone_num2: "",
        Adress: "",
    });

    const [newProduct, setNewProduct] = useState({
        Nick_name: "",
        Full_name: "",
        Passport: "",
        Date_of_birth: "",
        Sex: "",
        Phone_num1: "",
        Phone_num2: "",
        Adress: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/clients/all")
            .then((res) => setData(res.data.getAllClients))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/clients/delete/${id}`)
                    .then((res) => {
                        console.log(res.data.massage); // O'chirilgan ma'lumot
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
                axios.get("http://localhost:3001/clients/all").then((res) => {
                    setData(res.data.getAllClients);
                });
                setSelectedRowKeys([]);
            })
            .catch(() => {
                message.error("O'chirishda xatolik yuz berdi");
            });
    };

    const handleEdit = (record) => {
        setEditingEmployee(record);
        setEditedData({
            name: record.name,
        });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        axios
            .put(
                `http://localhost:3001/clients/update/${editingEmployee.id}`,
                editedData
            )
            .then(() => {
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

    const handleAddProduct = () => {
        setIsAddModalVisible(true);
    };

    const handleAddNewProduct = () => {
        const {
            Nick_name,
            Full_name,
            Passport,
            Date_of_birth,
            Sex,
            Phone_num1,
            Phone_num2,
            Adress,
        } = newProduct;

        // Inputlarni tekshirish
        if (
            !Nick_name ||
            !Full_name ||
            !Passport ||
            !Date_of_birth ||
            !Sex ||
            !Phone_num1 ||
            !Phone_num2 ||
            !Adress
        ) {
            message.error("Iltimos, barcha maydonlarni to'ldiring.");
            return; // Agar to'ldirilmagan maydon bo'lsa, funksiyani to'xtatamiz
        }

        axios
            .post("http://localhost:3001/clients/create", newProduct)
            .then(() => {
                message.success("Yangi mahsulot muvaffaqiyatli qo'shildi");

                // Yangi mahsulot qo'shilgandan keyin barcha mahsulotlarni qayta yuklash
                axios
                    .get("http://localhost:3001/clients/all")
                    .then((res) => {
                        setData(res.data.getAllClients);
                    })
                    .catch((err) => {
                        message.error("Mahsulotlarni yuklashda xatolik");
                        console.log(err);
                    });

                setNewProduct({
                    Nick_name: "",
                    Full_name: "",
                    Passport: "",
                    Date_of_birth: "",
                    Sex: "",
                    Phone_num1: "",
                    Phone_num2: "",
                    Adress: "",
                });

                setIsAddModalVisible(false);
            })
            .catch((err) => {
                message.error("Mahsulotni qo'shishda xatolik yuz berdi");
                console.log(err);
            });
    };

    const handleSearch = async () => {
        if (!searchTerm) {
            // Agar qidirish termi bo'sh bo'lsa, barcha ma'lumotlarni ko'rsatish
            try {
                const response = await axios.get(
                    "http://localhost:3001/clients/all"
                );
                setResults(response.data.getAllClients);
            } catch (error) {
                console.error("Barcha ma'lumotlarni olishda xatolik:", error);
            }
        } else {
            // Aks holda qidirish
            try {
                const response = await axios.get(
                    "http://localhost:3001/clients/search",
                    {
                        params: { searchTerm },
                    }
                );
                setResults(response.data.clients);
            } catch (error) {
                console.error("Qidirish natijalarini olishda xatolik:", error);
            }
        }
    };

    console.log(results);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    console.log(data);

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
                        <button
                            className='px-3 py-3 border-2 rounded-md bg-slate-50 '
                            onClick={handleDelete}
                            disabled={!selectedRowKeys.length}>
                            <DeleteOutlined />
                        </button>
                    </div>
                    <button className='px-3 py-3 border-2 rounded-md bg-slate-50 '>
                        <UnorderedListOutlined />
                    </button>
                </div>
            </div>

            <div className='mt-7 flex flex-wrap items-center gap-5'>
                <div className='w-full sm:w-auto'>
                    <Search
                        placeholder='input search text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full sm:w-auto rounded-md text-xl'
                        size='large'
                        style={{ width: "300px" }}
                        onSearch={handleSearch}
                        onPressEnter={handleSearch}
                    />
                </div>

                <div className='bg-sky-500 text-xl py-2 px-2 rounded-md w-full sm:w-auto'>
                    <button
                        className='w-full h-full'
                        onClick={handleAddProduct}>
                        <PlusOutlined className='mr-2' />
                        Yaratish
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    columns={[
                        ...clientstable,
                        {
                            title: "Amallar",
                            render: (record) => (
                                <button onClick={() => handleEdit(record)}>
                                    <box-icon
                                        name='edit-alt'
                                        type='solid'
                                        color='#0284c7'></box-icon>
                                </button>
                            ),
                        },
                    ]}
                    dataSource={results.length > 0 ? results : data}
                    rowKey={(record) => record.id}
                    rowSelection={rowSelection}
                />
            </div>

            {/* Xodim ma'lumotlarini tahrirlash modali */}
            <Modal
                title="Xodim ma'lumotlarini tahrirlash"
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}>
                <Input
                    className='mb-5'
                    value={editedData.Nick_name}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Nick_name: e.target.value,
                        })
                    }
                    placeholder='Nick name'
                />
                <Input
                    className='mb-5'
                    value={editedData.Full_name}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Full_name: e.target.value,
                        })
                    }
                    placeholder='F.I.SH'
                />
                <Input
                    className='mb-5'
                    value={editedData.Passport}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Passport: e.target.value,
                        })
                    }
                    placeholder='Passport seriyasi'
                />
                <Input
                    className='mb-5'
                    type='date'
                    value={editedData.Date_of_birth}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Date_of_birth: e.target.value,
                        })
                    }
                    placeholder="Tug'ilgan yili"
                />
                <Input
                    className='mb-5'
                    value={editedData.Sex}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Sex: e.target.value,
                        })
                    }
                    placeholder='Jinsi'
                />
                <Input
                    className='mb-5'
                    value={editedData.Phone_num1} // Yangi state
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlaydi

                        // +998 bilan boshlanishi uchun

                        // Formatlash
                        let formattedValue = value.replace(
                            /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                        );

                        // State-ni yangilash
                        setEditedData((prevData) => ({
                            ...prevData,
                            Phone_num1: formattedValue, // newProduct ichidagi Phone_num1-ni yangilaydi
                        }));
                    }}
                    maxLength={9}
                    required
                    placeholder='Telefon nomer 1'
                />

                <Input
                    className='mb-5'
                    value={editedData.Phone_num2} // Yangi state
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlaydi

                        // +998 bilan boshlanishi uchun

                        // Formatlash
                        let formattedValue = value.replace(
                            /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                        );

                        // State-ni yangilash
                        setEditedData((prevData) => ({
                            ...prevData,
                            Phone_num2: formattedValue, // newProduct ichidagi Phone_num1-ni yangilaydi
                        }));
                    }}
                    maxLength={9}
                    required
                    placeholder='Telefon nomer 2'
                />
                <Input
                    className='mb-5'
                    value={editedData.Adress}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            Adress: e.target.value,
                        })
                    }
                    placeholder='Adress'
                />
            </Modal>

            {/* Yangi mahsulot qo'shish modali */}
            <Modal
                title="Yangi mahsulot qo'shish"
                open={isAddModalVisible}
                onOk={handleAddNewProduct}
                onCancel={() => setIsAddModalVisible(false)}>
                <Input
                    className='mb-5'
                    value={newProduct.Nick_name}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            Nick_name: e.target.value,
                        })
                    }
                    placeholder='Nick name'
                />
                <Input
                    className='mb-5'
                    value={newProduct.Full_name}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            Full_name: e.target.value,
                        })
                    }
                    placeholder='F.I.Sh'
                />
                <Input
                    className='mb-5'
                    value={newProduct.Passport}
                    onChange={(e) => {
                        let value = e.target.value.toUpperCase();
                        let letters = value.slice(0, 2).replace(/[^A-Z]/g, "");
                        let numbers = value.slice(2).replace(/[^0-9]/g, "");
                        let Passport = letters + numbers.slice(0, 7);
                        setNewProduct({
                            ...newProduct,
                            Passport: Passport,
                        });
                    }}
                    placeholder='Passport seriyasi'
                />
                <Input
                    className='mb-5'
                    type='date' // Yilni raqamli formatda kiritish
                    value={newProduct.Date_of_birth}
                    onChange={(e) => {
                        const value = e.target.value;

                        // Faqat 4 raqamli yil kiritish imkonini berish

                        setNewProduct({
                            ...newProduct,
                            Date_of_birth: value,
                        });
                    }}
                    placeholder="Tug'ilgan yili"
                />
                <Input
                    className='mb-5'
                    value={newProduct.Phone_num1} // Yangi state
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlaydi

                        // +998 bilan boshlanishi uchun

                        // Formatlash
                        let formattedValue = value.replace(
                            /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                        );

                        // State-ni yangilash
                        setNewProduct((prevData) => ({
                            ...prevData,
                            Phone_num1: formattedValue, // newProduct ichidagi Phone_num1-ni yangilaydi
                        }));
                    }}
                    maxLength={9}
                    required
                    placeholder='Telefon nomer 1'
                />

                <Input
                    className='mb-5'
                    value={newProduct.Phone_num2} // Yangi state
                    onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni saqlaydi

                        // +998 bilan boshlanishi uchun

                        // Formatlash
                        let formattedValue = value.replace(
                            /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
                            "$1 $2 $3 $4 $5"
                        );

                        // State-ni yangilash
                        setNewProduct((prevData) => ({
                            ...prevData,
                            Phone_num2: formattedValue, // newProduct ichidagi Phone_num1-ni yangilaydi
                        }));
                    }}
                    maxLength={9}
                    required
                    placeholder='Telefon nomer 2'
                />
                <Select
                    className='mb-5'
                    value={newProduct.Sex}
                    onChange={(value) =>
                        setNewProduct({
                            ...newProduct,
                            Sex: value,
                        })
                    }
                    placeholder='Jinsi'
                    style={{ width: "100%" }}>
                    <Option value='Erkak'>Erkak</Option>
                    <Option value='Ayol'>Ayol</Option>
                </Select>
                <Input
                    className='mb-5'
                    value={newProduct.Adress}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            Adress: e.target.value,
                        })
                    }
                    placeholder='Adress'
                />
            </Modal>
        </>
    );
};

export default Customers;
