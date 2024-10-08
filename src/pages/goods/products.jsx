import {
    DeleteOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, message } from "antd";
import { columns } from "../table/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";

const Products = () => {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Checkbox tanlangan satrlar uchun
    const [editingEmployee, setEditingEmployee] = useState(null); // Tahrirlanayotgan xodim
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal ko'rinishini boshqarish
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Yaratish modalini boshq
    const [category, setCategory] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
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
        category_id: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/product/all")
            .then((res) => setData(res.data.product))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 500); // 500ms kechikish

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleExport = () => {
        console.log("Export boshlanmoqda...");
        // Excel faylini yuklab olish
        window.open("http://localhost:3001/product/exportToExcel", "_blank");
    };

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
                window.location.reload();
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

    const handleSearch = async () => {
        if (!searchTerm) {
            // Aga r qidiruv terimi bo'sh bo'lsa, barcha mijozlarni ko'rsatish
            try {
                const response = await axios.get(
                    "http://localhost:3001/product/all"
                );
                setResults(response.data.product);
            } catch (error) {
                console.error("Barcha mijozlarni olishda xatolik:", error);
            }
        } else {
            // Qidiruv natijalarini olish
            try {
                const response = await axios.get(
                    "http://localhost:3001/product/search",
                    {
                        params: { searchTerm },
                    }
                );
                setResults(response.data.products);
            } catch (error) {
                console.error("Qidiruv natijalarini olishda xatolik:", error);
            }
        }
    };

    const handleEdit = (record) => {
        setEditingEmployee(record);
        setEditedData({
            name: record.name,
            price: record.price,
            quantity: record.quantity,
            description: record.description,
            category_id: record.category_id,
        });
        setIsModalVisible(true);
    };

    const handleSave = () => {
        axios
            .put(
                `http://localhost:3001/product/update/${editingEmployee.id}`,
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
                window.location.reload();
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
                window.location.reload();
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
                    category_id: "",
                });

                setIsAddModalVisible(false);
            })
            .catch((err) => {
                message.error("Mahsulotni qo'shishda xatolik yuz berdi");
                console.log(err);
            });
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/category/all"
                );
                setCategory(response.data.AllCategory); // API'dan kelgan kategoriyalarni saqlaymiz
            } catch (error) {
                console.error("Kategoriyalarni yuklashda xatolik:", error);
            }
        };

        fetchCategories();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const onSearch = (value) => {
        // Search funksiyasini o'rnatish
        console.log("Search value: ", value);
    };

    const handleQuantityEditDataChange = (e) => {
        const value = e.target.value;

        // Faqat raqam va ijobiy qiymat qabul qilinishini tekshirish
        if (/^\d*$/.test(value)) {
            setEditedData({
                ...editedData,
                quantity: value,
            });
        } else {
            message.error("Faqat musbat raqam kiriting.");
        }
    };

    const handlePriceEditDataChange = (e) => {
        const value = e.target.value;

        // Faqat raqam va ijobiy qiymat qabul qilinishini tekshirish
        if (/^\d*$/.test(value)) {
            setEditedData({
                ...editedData,
                price: value,
            });
        } else {
            message.error("Faqat musbat raqam kiriting.");
        }
    };

    const handleQuantityNewProductChange = (e) => {
        const value = e.target.value;

        // Faqat raqam va ijobiy qiymat qabul qilinishini tekshirish
        if (/^\d*$/.test(value)) {
            setNewProduct({
                ...newProduct,
                quantity: value,
            });
        } else {
            message.error("Faqat musbat raqam kiriting.");
        }
    };

    const handlePriceNewProductChange = (e) => {
        const value = e.target.value;

        // Faqat raqam va ijobiy qiymat qabul qilinishini tekshirish
        if (/^\d*$/.test(value)) {
            setNewProduct({
                ...newProduct,
                price: value,
            });
        } else {
            message.error("Faqat musbat raqam kiriting.");
        }
    };

    return (
        <>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='text-4xl'>Products</h1>
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
                        placeholder='Nickname, F.I.SH, Passport, Tel'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full sm:w-auto rounded-md text-xl'
                        size='large'
                        style={{ width: "300px" }}
                        onSearch={handleSearch}
                        onPressEnter={handleSearch}
                    />
                </div>
                <div className='sm:w-auto'>
                    <Button
                        size='large'
                        className='bg-sky-500 text-white'
                        onClick={handleAddProduct}>
                        <PlusOutlined className='mr-2' />
                        Yaratish
                    </Button>
                </div>
                <div className='sm:w-auto'>
                    <Button
                        className='bg-sky-500 text-white'
                        onClick={handleExport}
                        size='large'>
                        Export
                    </Button>
                </div>

                <div className='sm:w-auto'>
                    <Button className='bg-sky-500 text-white' size='large'>
                        Import
                    </Button>
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
                    dataSource={results.length > 0 ? results : data}
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
                    onChange={handleQuantityEditDataChange}
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
                    onChange={handlePriceEditDataChange}
                    placeholder='Narxi'
                />
            </Modal>

            {/* Yangi mahsulot qo'shish modali */}
            <Modal
                title="Yangi mahsulot qo'shish"
                open={isAddModalVisible}
                onOk={handleAddNewProduct}
                onCancel={() => setIsAddModalVisible(false)}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(); // Standart form yuborilishini bloklaymiz
                        handleAddNewProduct(); // Enter bosilganda handleAddNewProduct funksiyasini chaqiramiz
                    }}>
                    <Input
                        className='mb-5'
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({
                                ...newProduct,
                                name: e.target.value,
                            })
                        }
                        placeholder='Tovar nomi'
                    />
                    <Input
                        className='mb-5'
                        value={newProduct.quantity}
                        onChange={handleQuantityNewProductChange}
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
                        onChange={handlePriceNewProductChange}
                        placeholder='Narxi'
                    />
                    <Select
                        id='category'
                        className='mb-5 w-full'
                        value={newProduct.category_id}
                        onChange={(value) =>
                            setNewProduct({
                                ...newProduct,
                                category_id: value,
                            })
                        }>
                        <Option value=''>Kategoriya tanlang</Option>
                        {category.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </form>
            </Modal>
        </>
    );
};

export default Products;
