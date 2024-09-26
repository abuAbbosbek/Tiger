import { Input, Modal, Select, Table, message, Spin } from "antd";
import axios from "axios";
import "boxicons";
import { useEffect, useState } from "react";
import { newsales } from "../table/table";

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
    }); // Yangi mahsulot qo'shish uchun form ma'lumotlari

    useEffect(() => {
        const savedData = localStorage.getItem("salesData");
        if (savedData) {
            setData(JSON.parse(savedData)); // Oldin saqlangan ma'lumotlarni yuklash
        }
    }, []);

    // localStorage-ga ma'lumot saqlash funksiyasi
    const saveDataToLocalStorage = (newData) => {
        localStorage.setItem("salesData", JSON.stringify(newData));
    };
    // Yangi mahsulotni qo'shish funksiyasi
    const handleAddNewProduct = async () => {
        const { product_id, quantity } = newProduct;
        if (!product_id || !quantity) {
            message.error("Iltimos, barcha maydonlarni to'ldiring.");
            return;
        }
        console.log(newProduct.product_id);

        try {
            // Tanlangan mahsulotning narxini olish uchun API chaqirish
            const response = await axios.get(
                `http://localhost:3001/product/${product_id}`
            );
            const productPrice = response.data.product.price; // Mahsulot narxi
            const productName = response.data.product.name;
            // Umumiy narxni hisoblash
            const totalPrice = productPrice * quantity;

            // Yangi mahsulot ob'ektini yaratish
            const newItem = {
                id: Date.now(),
                product_id: productName,
                quantity,
                price: totalPrice,
            };

            // Ma'lumotni jadvalga qo'shish
            const updatedData = [...data, newItem];
            setData(updatedData);

            // Ma'lumotlarni localStorage-ga saqlash
            saveDataToLocalStorage(updatedData);
            message.success("Yangi mahsulot muvaffaqiyatli qo'shildi!");

            // Formani tozalash
            setNewProduct({ product_id: "", quantity: "" });
            setIsAddModalVisible(false); // Modalni yopish
        } catch (error) {
            message.error("Mahsulotni yuklashda xatolik yuz berdi.");
            console.error(error);
        }
    };

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

    return (
        <>
            {loading ? (
                <Spin size='large' />
            ) : (
                <div className='flex'>
                    <div className='w-7/10 p-2 m-2'>
                        <h1 className='text-5xl mb-2'>Savatcha</h1>
                        <div className='flex gap-5'>
                            <input
                                className='text-xl px-3 py-3 w-[860px] rounded-md bg-slate-100'
                                type='search'
                                placeholder='Artikl, Shtrix-kod, Nomi'
                            />
                        </div>
                        <div className='flex justify-between'></div>
                        <div className='flex mt-5 mb-5'>
                            <button className='text-xl bg-sky-500 p-2 rounded-xl'>
                                Barcha sotuvchilar
                            </button>
                            <button
                                onClick={() => setIsAddModalVisible(true)}
                                className='text-xl bg-gray-100 px-4 py-2.5 rounded-xl ml-5'>
                                <box-icon
                                    name='plus-circle'
                                    type='solid'
                                    color='#439bef'></box-icon>
                            </button>
                        </div>
                        <Table
                            columns={[
                                ...newsales,
                                {
                                    title: "Amallar",
                                    render: (record) => (
                                        <button
                                            onClick={() => console.log(record)}>
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
                        />
                    </div>

                    <hr className='w-[1px] h-[1000px] bg-gray-400 inline-block mx-5' />

                    <div className='w-3/10 p-4 m-2'>
                        <h1 className='text-2xl'>Mijoz</h1>
                        <Select
                            id='customer'
                            className='mb-5 w-full'
                            placeholder='Mijozni tanlang'
                            value={newProduct.customer_name}
                            onChange={(value) =>
                                setNewProduct({
                                    ...newProduct,
                                    customer_name: value,
                                })
                            }
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
                        title="Yangi mahsulot qo'shish"
                        open={isAddModalVisible}
                        onOk={handleAddNewProduct}
                        onCancel={() => setIsAddModalVisible(false)}>
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
                            onChange={(e) =>
                                setNewProduct({
                                    ...newProduct,
                                    quantity: e.target.value,
                                })
                            }
                            placeholder='Soni'
                        />
                    </Modal>
                </div>
            )}
        </>
    );
};

export default NewSales;
