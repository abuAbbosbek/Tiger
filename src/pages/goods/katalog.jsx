import {
    CodeSandboxOutlined,
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Input, message, Modal, Table } from "antd";
import { katalog } from "../table/table";
import axios from "axios";
import { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
const Katalog = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); 
    const [editingEmployee, setEditingEmployee] = useState(null); 
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [editedData, setEditedData] = useState({
        name: "",
    });

    const [newProduct, setNewProduct] = useState({
        name: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/category/all")
            .then((res) => setData(res.data.AllCategory))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = () => {
        Promise.all(
            selectedRowKeys.map((id) =>
                axios
                    .delete(`http://localhost:3001/category/delete/${id}`)
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
                axios.get("http://localhost:3001/category/all").then((res) => {
                    setData(res.data.AllCategory);
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
                `http://localhost:3001/category/update/${editingEmployee.id}`,
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
        axios
            .post("http://localhost:3001/category/create", newProduct)
            .then(() => {
                message.success("Yangi mahsulot muvaffaqiyatli qo'shildi");

                // Yangi mahsulot qo'shilgandan keyin barcha mahsulotlarni qayta yuklash
                axios
                    .get("http://localhost:3001/category/all")
                    .then((res) => {
                        setData(res.data.AllCategory);
                    })
                    .catch((err) => {
                        message.error("Mahsulotlarni yuklashda xatolik");
                        console.log(err);
                    });

                setNewProduct({
                    name: "",
                });

                setIsAddModalVisible(false);
            })
            .catch((err) => {
                message.error("Mahsulotni qo'shishda xatolik yuz berdi");
                console.log(err);
            });
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 500); // 500ms kechikish

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = async () => {
        if (!searchTerm) {
            // Agar qidiruv terimi bo'sh bo'lsa, barcha mijozlarni ko'rsatish
            try {
                const response = await axios.get(
                    "http://localhost:3001/category/all"
                );
                setResults(response.data.AllCategory);
            } catch (error) {
                console.error("Barcha mijozlarni olishda xatolik:", error);
            }
        } else {
            // Qidiruv natijalarini olish
            try {
                const response = await axios.get(
                    "http://localhost:3001/category/search",
                    {
                        params: { searchTerm },
                    }
                );
                setResults(response.data.category);
            } catch (error) {
                console.error("Qidiruv natijalarini olishda xatolik:", error);
            }
        }
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

            <div className='mt-7 flex flex-wrap items-center gap-5'>
                <div className='w-full sm:w-auto'>
                    <Search
                        placeholder='Tovar nomi '
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
                <div className='bg-sky-500  text-xl py-2 px-2 rounded-md w-full sm:w-auto'>
                    <button className='w-full h-full'>Eksport</button>
                </div>
                <div className='bg-sky-500  text-xl py-2 px-2 rounded-md w-full sm:w-auto'>
                    <button className='w-full h-full'>Import</button>
                </div>
            </div>

            <div>
                <br />
                <Table
                    columns={[
                        ...katalog,
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
            </Modal>
        </>
    );
};

export default Katalog;
