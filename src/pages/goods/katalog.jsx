import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, Modal, Table, message } from "antd";
import { columns } from "../table/table";
import { useEffect, useState } from "react";
import axios from "axios";

const Katalog = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Checkbox tanlangan satrlar uchun
    const [editingEmployee, setEditingEmployee] = useState(null); // Tahrirlanayotgan xodim
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal ko'rinishini boshqarish
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Yaratish modalini boshqarish
    const [editedData, setEditedData] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/product/all")
            .then((res) => setData(res.data.product))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/product/delete/${id}`)
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
                axios.get("http://localhost:3001/product/all").then((res) => {
                    setData(res.data.product);
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
            price: record.price,
            quantity: record.quantity,
            description: record.description,
        });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        axios
            .put(
                `http://localhost:3001/product/update/${editingEmployee.id}`,
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

    const handleAddProduct = () => {
        setIsAddModalVisible(true);
    };

    const handleAddNewProduct = () => {
        axios
            .post("http://localhost:3001/product/create", newProduct)
            .then(() => {
                message.success("Yangi mahsulot muvaffaqiyatli qo'shildi");

                // Yangi mahsulot qo'shilgandan keyin barcha mahsulotlarni qayta yuklash
                axios
                    .get("http://localhost:3001/product/all")
                    .then((res) => {
                        setData(res.data.product);
                    })
                    .catch((err) => {
                        message.error("Mahsulotlarni yuklashda xatolik");
                        console.log(err);
                    });

                setNewProduct({
                    name: "",
                    price: "",
                    quantity: "",
                    description: "",
                });

                setIsAddModalVisible(false);
            })
            .catch((err) => {
                message.error("Mahsulotni qo'shishda xatolik yuz berdi");
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
                <div className=''>
                    <h1 className='text-4xl'>Katalog</h1>
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

            <div className='mt-7 flex'>
                <div>
                    <input
                        className='text-xl px-3 py-3 w-[700px] rounded-md bg-slate-100'
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
                <div className='px-3  bg-sky-500 text-xl py-3 rounded-md ml-5' onClick={handleAddProduct}>
                    <button>
                        <PlusOutlined className='mr-2' />
                        Yaratish
                    </button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    columns={[
                        ...columns,
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
                    dataSource={data}
                    rowKey={(record) => record.id}
                    rowSelection={rowSelection}
                />
            </div>

            {/* Tahrirlash modali */}
            <Modal
                title="Xodim ma'lumotlarini tahrirlash"
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}>
                <Input
                    className='mb-5'
                    value={editedData.name}
                    onChange={(e) =>
                        setEditedData({ ...editedData, name: e.target.value })
                    }
                    placeholder='Tovar nomi'
                />
                <Input
                    className='mb-5'
                    value={editedData.quantity}
                    onChange={(e) => {
                        setEditedData({
                            ...editedData,
                            quantity: e.target.value,
                        });
                    }}
                    placeholder='Soni'
                />
                <Input
                    className='mb-5'
                    value={editedData.description}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            description: e.target.value,
                        })
                    }
                    placeholder='Tavsifi'
                />
                <Input
                    className='mb-5'
                    value={editedData.price}
                    onChange={(e) =>
                        setEditedData({
                            ...editedData,
                            price: e.target.value,
                        })
                    }
                    placeholder='Narxi'
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
                    value={newProduct.name}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder='Tovar nomi'
                />
                <Input
                    className='mb-5'
                    value={newProduct.quantity}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            quantity: e.target.value,
                        })
                    }
                    placeholder='Soni'
                />
                <Input
                    className='mb-5'
                    value={newProduct.description}
                    onChange={(e) =>
                        setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                        })
                    }
                    placeholder='Tavsifi'
                />
                <Input
                    className='mb-5'
                    value={newProduct.price}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder='Narxi'
                />
            </Modal>
        </>
    );
};

export default Katalog;
