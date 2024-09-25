// import { Input, Modal, Select, Switch, Table, message } from "antd";
// import axios from "axios";
// import "boxicons";
// import { useEffect, useState } from "react";
// import { newsales } from "../table/table";
// import { Option } from "antd/lib/mentions";
// const NewSales = () => {
//     const [data, setData] = useState([]);
//     const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//     const [product, setProduct] = useState([]);
//     const [customer, setCustomer] = useState([]);
//     const [newProduct, setNewProduct] = useState({
//         product_id: "",
//         quantity: "",
//         // customer_name: "",
//     });

//     const handleAddProduct = () => {
//         setIsAddModalVisible(true);
//     };

//     const handleAddNewProduct = () => {
//         const { product_id, quantity } = newProduct;
//         // Inputlarni tekshirish
//         if (!product_id || !quantity) {
//             // ! check if product_id and quantity are provided
//             message.error("Iltimos, barcha maydonlarni to'ldiring.");
//             return;
//         }

//         axios
//             .post("http://localhost:3001/sale/newsale", newProduct)
//             .then((response) => {
//                 if (response.data.success) {
//                     message.success("Yangi mahsulot muvaffaqiyatli qo'shildi");

//                     // Yangi mahsulotni data holatiga qo'shish va jadvalni yangilash
//                     setData((prevData) => [
//                         ...prevData,
//                         {
//                             id: response.data.id,
//                             ...newProduct,
//                             price: response.data.totalPrice,
//                         }, // Yangi mahsulotni qo'shish
//                     ]);

//                     // Inputlarni tozalash
//                     setNewProduct({
//                         product_id: "",
//                         quantity: "",
//                     });

//                     console.log(response.data);
//                     setIsAddModalVisible(false);
//                 } else {
//                     message.error(response.data.message);
//                 }
//             })
//             .catch((err) => {
//                 message.error("Mahsulotni qo'shishda xatolik yuz berdi");
//                 console.log(err);
//             });
//     };

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:3001/product/all"
//                 );
//                 setProduct(response.data.product); // API'dan kelgan kategoriyalarni saqlaymiz
//             } catch (error) {
//                 console.error("Kategoriyalarni yuklashda xatolik:", error);
//             }
//         };

//         fetchProduct();
//     }, []);

//     useEffect(() => {
//         const fetchCustomers = async () => {
//             try {
//                 const response = await axios.get(
//                     "http://localhost:3001/clients/all"
//                 );
//                 setCustomer(response.data.getAllClients); // API'dan kelgan kategoriyalarni saqlaymiz
//             } catch (error) {
//                 console.error("Kategoriyalarni yuklashda xatolik:", error);
//             }
//         };

//         fetchCustomers();
//     }, []);
//     return (
//         <>
//             <div className='flex '>
//                 <div className='w-7/10 p-2 m-2 '>
//                     <div className='flex gap-5'>
//                         <div className=' mb-7'>
//                             <div className='flex'>
//                                 <input
//                                     className='text-xl px-3 py-3 w-[860px] rounded-md bg-slate-100'
//                                     type='search'
//                                     placeholder='Artikl, Shtrix-kod, Nomi'
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex justify-between'>
//                         <div className='flex items-center'>
//                             <h1 className='text-5xl mb-2'>Savatcha</h1>
//                             <h1 className='text-lg bg-slate-100 rounded-xl py-1 px-4 ml-5 '>
//                                 0
//                             </h1>
//                             <div>
//                                 <h1 className='ml-5 text-lg bg-slate-100 rounded-xl py-1.5 px-4'>
//                                     Ulgurji narxlar <Switch />{" "}
//                                 </h1>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='flex mt-5 mb-5 '>
//                         <div>
//                             <button className='text-xl bg-sky-500 p-2 rounded-xl '>
//                                 Barcha sotuvchilar
//                             </button>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={handleAddProduct}
//                                 className='text-xl bg-gray-100 px-4 py-2.5 rounded-xl ml-5 text-center items-center flex'>
//                                 <box-icon
//                                     name='plus-circle'
//                                     type='solid'
//                                     color='#439bef'></box-icon>
//                             </button>
//                         </div>
//                     </div>

//                     <div className='w-full h-96  rounded-xl border-2 shadow-md'>
//                         <div>
//                             <Table
//                                 columns={[
//                                     ...newsales,
//                                     {
//                                         title: "Amallar",
//                                         render: (record) => (
//                                             <button
//                                                 onClick={() =>
//                                                     handleEdit(record)
//                                                 }>
//                                                 <box-icon
//                                                     name='edit-alt'
//                                                     type='solid'
//                                                     color='#0284c7'></box-icon>
//                                             </button>
//                                         ),
//                                     },
//                                 ]}
//                                 dataSource={data}
//                                 rowKey={(record) => record.id}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <hr className='w-[1px] h-[1000px] bg-gray-400 inline-block mx-5' />

//                 <div className='w-3/10 p-4 m-2'>
//                     <div>
//                         <div className='flex justify-between mb-5'>
//                             <div className='items-center'>
//                                 <h1 className='text-2xl'>Mijoz </h1>
//                             </div>
//                             <div className='text-xl mt-1 text-sky-500'>
//                                 <a href='#'>Yaratish</a>
//                             </div>
//                         </div>

//                         <Select
//                             id='customer'
//                             className='mb-5 w-full'
//                             placeholder='Mijozni tanlang'
//                             value={newProduct.customer_name}
//                             onChange={(value) =>
//                                 setNewProduct({
//                                     ...newProduct,
//                                     customer_name: value,
//                                 })
//                             }
//                             showSearch
//                             optionFilterProp='children'
//                             filterOption={(input, option) =>
//                                 option.children
//                                     .toLowerCase()
//                                     .includes(input.toLowerCase())
//                             }
//                             dropdownStyle={{
//                                 maxHeight: "200px",
//                                 overflowY: "auto",
//                             }}>
//                             {/* <Option value=''>Mijozni tanlang</Option> */}
//                             {customer.map((customer) => (
//                                 <Option key={customer.id} value={customer.id}>
//                                     {customer.Full_name}
//                                 </Option>
//                             ))}
//                         </Select>

//                         <div className='bg-white rounded-xl px-4 py-4 mt-4 shadow-md border-2 '>
//                             <div className='flex justify-between'>
//                                 <h1 className='text-xl mb-2 text-gray-600'>
//                                     Oraliq jami
//                                 </h1>
//                                 <h1 className='text-xl text-gray-600'>0 UZS</h1>
//                             </div>

//                             <div className='flex justify-between'>
//                                 <h1 className='text-xl mb-2 text-gray-600'>
//                                     Chegirma
//                                 </h1>
//                                 <h1 className='text-xl text-gray-600'>0 UZS</h1>
//                             </div>

//                             <div className='flex justify-between mt-4 bg-slate-300 rounded-xl px-4 py-3 w-full'>
//                                 <h1 className='text-xl mb-2 text-white'>
//                                     To`lash{" "}
//                                 </h1>
//                                 <h1 className='text-xl text-white'>0 UZS</h1>
//                             </div>

//                             <div className='mt-5 text-center'>
//                                 <h1 className='text-xl mb-2 text-gray-600'>
//                                     Kechiktirish
//                                     <span className='text-xl text-slate-500 px-2  border-2 border-gray rounded-md text-center ml-2'>
//                                         O
//                                     </span>
//                                 </h1>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Yangi mahsulot qo'shish modali */}
//             <Modal
//                 title="Yangi mahsulot qo'shish"
//                 open={isAddModalVisible}
//                 onOk={handleAddNewProduct}
//                 onCancel={() => setIsAddModalVisible(false)}>
//                 <Select
//                     id='product'
//                     className='mb-5 w-full'
//                     value={newProduct.product_id}
//                     onChange={(value) =>
//                         setNewProduct({
//                             ...newProduct,
//                             product_id: value,
//                         })
//                     }>
//                     <Option value=''>Kategoriya tanlang</Option>
//                     {product.map((product) => (
//                         <Option key={product.id} value={product.id}>
//                             {product.name}
//                         </Option>
//                     ))}
//                 </Select>
//                 <Input
//                     className='mb-5'
//                     value={newProduct.quantity}
//                     onChange={(e) =>
//                         setNewProduct({
//                             ...newProduct,
//                             quantity: e.target.value,
//                         })
//                     }
//                     placeholder='Soni'
//                 />
//             </Modal>
//         </>
//     );
// };

// export default NewSales;
import { Input, Modal, Select, Switch, Table, message, Spin } from "antd";
import axios from "axios";
import "boxicons";
import { useEffect, useState } from "react";
import { newsales } from "../table/table";

const { Option } = Select;

const NewSales = () => {
    const [data, setData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [product, setProduct] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product_id: "",
        quantity: "",
        customer_name: "",
    });
    const [loading, setLoading] = useState(true); // Yuklanish holati

    const handleAddProduct = () => {
        setIsAddModalVisible(true);
    };

    const handleAddNewProduct = async () => {
        const { product_id, quantity } = newProduct;

        // Kiritishlarni tekshirish
        if (!product_id || !quantity || quantity <= 0) {
            message.error(
                "Iltimos, barcha maydonlarni to'ldiring va soni musbat bo'lsin."
            );
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3001/sale/newsale",
                newProduct
            );
            if (response.data.success) {
                message.success("Yangi mahsulot muvaffaqiyatli qo'shildi");
                setData((prevData) => [
                    ...prevData,
                    {
                        id: response.data.id,
                        ...newProduct,
                        price: response.data.totalPrice, 
                    },
                ]);

                setNewProduct({
                    product_id: "",
                    quantity: "",
                    customer_name: "",
                });
                setIsAddModalVisible(false);
            } else {
                message.error(response.data.message);
            }
        } catch (err) {
            message.error("Mahsulotni qo'shishda xatolik yuz berdi");
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/product/all"
                );
                setProduct(response.data.product);
            } catch (error) {
                console.error("Kategoriyalarni yuklashda xatolik:", error);
            } finally {
                setLoading(false); // Yana yuklash tugadi
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
                console.error("Kategoriyalarni yuklashda xatolik:", error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <>
            {loading ? (
                <Spin size='large' />
            ) : (
                <div className='flex '>
                    <div className='w-7/10 p-2 m-2 '>
                        <div className='flex gap-5'>
                            <input
                                className='text-xl px-3 py-3 w-[860px] rounded-md bg-slate-100'
                                type='search'
                                placeholder='Artikl, Shtrix-kod, Nomi'
                            />
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='text-5xl mb-2'>Savatcha</h1>
                            <h1 className='text-lg bg-slate-100 rounded-xl py-1 px-4 ml-5'>
                                0
                            </h1>
                            <h1 className='ml-5 text-lg bg-slate-100 rounded-xl py-1.5 px-4'>
                                Ulgurji narxlar <Switch />
                            </h1>
                        </div>
                        <div className='flex mt-5 mb-5 '>
                            <button className='text-xl bg-sky-500 p-2 rounded-xl '>
                                Barcha sotuvchilar
                            </button>
                            <button
                                onClick={handleAddProduct}
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
                                            onClick={() => handleEdit(record)}>
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
