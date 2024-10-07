import { Input, Modal, Select, Table, message, Spin, Button } from "antd";
import Search from "antd/lib/input/Search";
import axios from "axios";
import "boxicons";
import { useEffect, useState } from "react";

const { Option } = Select;

const NewSales = () => {
    const [data, setData] = useState([]); // Jadvallingiz uchun ma'lumotlar
    const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Modalni ko'rsatish uchun
    const [product, setProduct] = useState([]); // Mahsulotlar ro'yxati
    const [customer, setCustomer] = useState([]); // Mijozlar ro'yxati
    const [loading, setLoading] = useState(false); // Yuklash holati
    const [newProduct, setNewProduct] = useState({
        product_id: "",
        quantity: "",
        client_id: "",
    }); // Yangi mahsulot qo'shish uchun form ma'lumotlari
    const [editingProduct, setEditingProduct] = useState(null); // Tahrir qilinayotgan mahsulot

    // Faqat musbat sonlarni qabul qiluvchi funksiya
    const handleQuantityChange = (e) => {
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

    const handleEditProduct = (record) => {
        setEditingProduct(record);
    
        const productToEdit = product.find((p) => p.id === record.product_id);
    
        if (!productToEdit) {
            console.error('Mahsulot topilmadi');
            return;
        }
    
        setNewProduct({
            product_id: productToEdit.id,
            quantity: record.quantity, // Mahsulot miqdorini tahrir qilishdan oldin 1 ga kamaytiramiz
        });
    
        setIsAddModalVisible(true);
    };
    
    

    const saveDataToLocalStorage = (data) => {
        localStorage.setItem("salesData", JSON.stringify(data));
    };

    const handleAddNewProduct = async () => {
        const { product_id, quantity } = newProduct;
    
        // Quantity ni number formatida saqlash
        const quantityNumber = parseInt(quantity, 10);
    
        if (!product_id || !quantityNumber || quantityNumber <= 0) {
            message.error("Iltimos, to'g'ri qiymatlar kiriting.");
            return;
        }
    
        try {
            const response = await axios.get(
                `http://localhost:3001/product/${product_id}`
            );
    
            // Agar backenddan 400 status kodi kelsa
            if (response.status === 400) {
                message.error("Mahsulotlar yetarli emas");
                return;
            }
    
            const productPrice = response.data.product.price;
            const totalPrice = productPrice * quantityNumber;
    
            const formattedPrice = new Intl.NumberFormat("uz-UZ").format(
                totalPrice
            );
    
            let updatedData = [...data];
            const existingProductIndex = updatedData.findIndex(
                (item) => item.product_id === product_id
            );
    
            if (existingProductIndex !== -1) {
                const existingProduct = updatedData[existingProductIndex];
                const newQuantity = quantityNumber;
                const newTotalPrice = productPrice * newQuantity;
                const formattedNewPrice = new Intl.NumberFormat("uz-UZ").format(
                    newTotalPrice
                );
    
                updatedData[existingProductIndex] = {
                    ...existingProduct,
                    quantity: newQuantity,
                    price: formattedNewPrice,
                };
            } else {
                const newItem = {
                    id: Date.now(),
                    product_id: product_id,
                    quantity: quantityNumber,
                    price: formattedPrice,
                };
                updatedData = [...updatedData, newItem];
            }
    
            setData(updatedData);
            saveDataToLocalStorage(updatedData);
            message.success(
                editingProduct
                    ? "Mahsulot muvaffaqiyatli tahrirlandi!"
                    : "Yangi mahsulot muvaffaqiyatli qo'shildi!"
            );
    
            setNewProduct({ product_id: "", quantity: "" });
            setIsAddModalVisible(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Agar 400 status kodi bo'lsa
                message.error("Mahsulotlar yetarli emas");
            } else {
                message.error("Mahsulotni yuklashda xatolik yuz berdi.");
            }
            console.error(error);
        }
    };
    

    const handleDeleteProduct = (recordId) => {
        const updatedData = data.filter((item) => item.id !== recordId);
        setData(updatedData);
        saveDataToLocalStorage(updatedData); // Ma'lumotlarni localStorage'ga saqlash
        message.success("Mahsulot muvaffaqiyatli o'chirildi!");
    };

    useEffect(() => {
        const savedData = localStorage.getItem("salesData");
        if (savedData) {
            setData(JSON.parse(savedData)); // Saqlangan ma'lumotlarni localStorage'dan qayta yuklash
        }
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:3001/product/all"
                );
                setProduct(response.data.product);
            } catch (error) {
                console.error("Mahsulotlarni yuklashda xatolik:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/clients/all"
                );
                setCustomer(response.data.getAllClients);
            } catch (error) {
                console.error("Mijozlarni yuklashda xatolik:", error);
            }
        };

        fetchCustomers();
    }, []);

    const calculateTotalQuantity = () => {
        return data.reduce((total, item) => total + parseInt(item.quantity), 0);
    };

    const calculateTotalPrice = () => {
        return data.reduce((total, item) => {
            // 'UZS'ni olib tashlash, vergulni olib tashlash, va raqamga aylantirish
            const itemPrice = parseInt(
                item.price
                    .replace(/\s+/g, "")
                    .replace(/,/g, "")
                    .replace("UZS", ""),
                10
            );
            return total + itemPrice;
        }, 0);
    };

    const handleCreateOrder = async () => {
        if (!newProduct.client_id) {
            message.error("Iltimos, mijozni tanlang.");
            return;
        }

        // Buyurtma ma'lumotlari
        const orderData = {
            client_id: newProduct.client_id, // Mijozning ID'si
            products: data.map((item) => ({
                product_id: item.product_id, // Bu yerda product_id ni to'g'ri yuboramiz
                quantity: item.quantity,
            })),
        };
        console.log(orderData);

        try {
            const response = await axios.post(
                "http://localhost:3001/OrderClient/order",
                orderData
            );
            message.success("Buyurtma muvaffaqiyatli yaratildi!");
            setData([]); // Jadvallarni tozalash
            localStorage.removeItem("salesData"); // LocalStorage'dan ma'lumotlarni o'chirish
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Agar 400 status kodi bo'lsa
                message.error("Mahsulotlar yetarli emas");
            } else {
                message.error("Buyurtma yaratishda xatolik");
            }
            console.error(error);
        }
    };

    const newsales = [
        {
            title: "Turkum",
            dataIndex: "product_id",
            render: (text) => {
                const productItem = product.find((p) => p.id === text);
                return productItem ? productItem.name : text; // ID ga qarab nomni ko'rsatish
            },
        },
        {
            title: "Soni",
            dataIndex: "quantity",
        },
        {
            title: "Jami Narx",
            dataIndex: "price",
            key: "price",
            render: (price) => `${price.toLocaleString()} UZS`, // Narxni formatlash
        },
        {
            title: "Amallar",
            key: "actions",
            render: (record) => (
                <div className='flex gap-2'>
                    <button onClick={() => handleEditProduct(record)}>
                        <box-icon
                            name='edit-alt'
                            type='solid'
                            color='#0284c7'></box-icon>
                    </button>
                    <button onClick={() => handleDeleteProduct(record.id)}>
                        <box-icon
                            name='trash-alt'
                            type='solid'
                            color='#f87171'></box-icon>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            {loading ? (
                <Spin size='large' />
            ) : (
                <div className='flex'>
                    <div className='w-7/10 p-2 m-2'>
                        <h1 className='text-5xl mb-2'>Savatcha</h1>
                        <div className='flex mt-5 mb-5 gap-5'>
                            <div>
                                <Search
                                    size='large'
                                    type='search'
                                    placeholder=''
                                    className='w-[400px]'
                                />
                            </div>
                            <Button
                                className='text-white bg-sky-500'
                                size='large'>
                                Barcha sotuvchilar
                            </Button>
                            <Button
                                onClick={() => setIsAddModalVisible(true)}
                                size='large'>
                                <box-icon
                                    name='plus-circle'
                                    type='solid'
                                    color='#439bef'></box-icon>
                            </Button>
                        </div>
                        <div className='rounded-xl border-2'>
                            <Table
                                columns={newsales}
                                dataSource={data}
                                rowKey={(record) => record.id}
                                pagination={{
                                    pageSize: 5,
                                    showTotal: () => (
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}>
                                            <b className='mr-2'>Jami soni:</b>
                                            <span>
                                                {calculateTotalQuantity()} ta
                                            </span>
                                            <b className='ml-5 mr-2'>
                                                Jami narxi:
                                            </b>
                                            <span>
                                                {new Intl.NumberFormat(
                                                    "uz-UZ"
                                                ).format(
                                                    calculateTotalPrice()
                                                )}{" "}
                                                UZS
                                            </span>
                                            <Button
                                                className='bg-sky-500 text-white ml-2'
                                                onClick={handleCreateOrder}>
                                                Yaratish
                                            </Button>
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    </div>

                    <hr className='w-[1px] h-[1000px] bg-gray-400 inline-block mx-5' />

                    <div className='w-3/10 p-4 m-2'>
                        <h1 className='text-2xl mb-2'>Mijoz</h1>
                        <Select
                            id='customer'
                            className='mb-5 w-full'
                            placeholder='Mijozni tanlang'
                            value={newProduct.client_id} // Tanlangan mijozning ID'sini ko'rsatish
                            onChange={(value) => {
                                console.log("Tanlangan mijoz ID:", value); // Konsolga chiqarib tekshirish
                                setNewProduct({
                                    ...newProduct,
                                    client_id: value, // Tanlangan mijozning ID'sini saqlash
                                });
                            }}
                            showSearch
                            optionFilterProp='children'
                            filterOption={(input, option) =>
                                option.children
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }>
                            {customer.map((customer) => (
                                <Option key={customer.id} value={customer.id}>
                                    {customer.Full_name}
                                </Option>
                            ))}
                        </Select>

                        <div className='bg-white rounded-xl px-4 py-4 mt-4 shadow-md border-2 '>
                            <h1 className='text-xl mb-2 text-gray-600'>
                                Oraliq jami
                            </h1>
                            <h1 className='text-xl text-gray-600'>0 UZS</h1>
                            <h1 className='text-xl mb-2 text-gray-600'>
                                Chegirma
                            </h1>
                            <h1 className='text-xl text-gray-600'>0 UZS</h1>
                            <div className='flex justify-between mt-4 bg-slate-300 rounded-xl px-4 py-3 w-full'>
                                <h1 className='text-xl mb-2 text-white'>
                                    To`lash
                                </h1>
                                <h1 className='text-xl text-white'>0 UZS</h1>
                            </div>
                        </div>
                    </div>

                    <Modal
                        title={
                            editingProduct
                                ? "Mahsulotni tahrirlash"
                                : "Yangi mahsulot qo'shish"
                        }
                        open={isAddModalVisible}
                        onOk={handleAddNewProduct}
                        onCancel={() => {
                            setIsAddModalVisible(false);
                            setEditingProduct(null); // Modal yopilganda tozalash
                        }}>
                        <Select
                            id='product'
                            className='mb-5 w-full'
                            value={newProduct.product_id}
                            onChange={(value) =>
                                setNewProduct({
                                    ...newProduct,
                                    product_id: value,
                                })
                            }>
                            <Option value=''>Kategoriya tanlang</Option>
                            {product.map((product) => (
                                <Option key={product.id} value={product.id}>
                                    {product.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            className='mb-5'
                            value={newProduct.quantity}
                            onChange={handleQuantityChange}
                            placeholder='Soni'
                        />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default NewSales;
