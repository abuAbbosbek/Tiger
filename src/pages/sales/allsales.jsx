import { Button, Modal, Pagination, Table } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import axios from "axios";

const AllSales = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]); // Mijozlar ro'yxatini saqlash uchun
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/OrderClient/getAllOrder"
                );
                setOrders(response.data.getAllOrders);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/product/all"
                );
                setProducts(response.data.product);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/clients/all"
                );
                setClients(response.data.getAllClients); // Mijozlar ma'lumotlarini saqlash
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchOrders();
        fetchProducts();
        fetchClients(); // Mijozlarni yuklash
    }, []);

    const showOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/OrderClient/getOrder/${orderId}`
            );
            console.log(response.data);
            if (response.data) {
                setSelectedOrder(response.data);
                setIsModalVisible(true);
            } else {
                console.error("No data found for this order.");
            }
        } catch (error) {
            console.error("Failed to fetch order details", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mahsulot nomi",
            dataIndex: "product_id",
            key: "product_id",
            render: (productId) => {
                const product = products.find((p) => p.id === productId);
                return product ? product.name : "Noma'lum";
            },
        },
        {
            title: "Client nomi",
            dataIndex: "client_id",
            key: "client_id",
        },
        {
            title: "Soni",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Narxi",
            dataIndex: "price",
            key: "price",
            render: (price) => formatPrice(price),
        },
        {
            title: "Jami narx",
            dataIndex: "total_price",
            key: "total_price",
            render: (totalPrice) => formatPrice(totalPrice),
        },
        {
            title: "Yaratilgan vaqti",
            dataIndex: "create_at",
            key: "create_at",
            render: (date) => new Date(date).toLocaleDateString("uz-UZ"),
        },
    ];

    return (
        <>
            <div className='flex'>
                <h1 className='text-4xl mb-2'>Barcha sotuvlar</h1>
            </div>

            <div className='mt-2 flex flex-wrap items-center gap-5'>
                <div className='w-full sm:w-auto'>
                    <Search
                        placeholder='Nickname, F.I.SH, Passport, Tel'
                        size='large'
                        style={{ width: "300px" }}
                    />
                </div>

                <div className='sm:w-auto'>
                    <Button className='bg-sky-500 text-white' size='large'>
                        Export
                    </Button>
                </div>
            </div>

            <br />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {currentOrders.map((order) => (
                    <div
                        key={order.id}
                        className='w-full h-[300px] border-2 shadow-lg shadow-black-500/40 rounded-xl flex flex-col mb-4'>
                        <h1 className='text-green-600 text-xl bg-green-400 bg-opacity-20 text-center rounded-t-[10px]'>
                            Sotuv
                        </h1>
                        <div className='p-4 flex-grow'>
                            <h2 className='text-lg'>Id: {order.id}</h2>
                            <p className='text-lg'>
                                Chek sanasi:{" "}
                                {new Date(order.create_at).toLocaleDateString(
                                    "uz-UZ"
                                )}
                            </p>
                            <p className='text-lg'>
                                Buyurtma miqdori: {order.total_quantity}
                            </p>
                            <h1 className='text-lg'>
                                Buyurtmachi :{" "}
                                {clients.find(
                                    (client) => client.id === order.client_id
                                )?.Full_name || "Noma'lum"}
                            </h1>
                        </div>
                        <div className='flex justify-between items-center p-4'>
                            <h1 className='text-lg text-sky-500'>
                                {formatPrice(order.total_price)} so'm
                            </h1>
                            <Button
                                size='large'
                                className='bg-sky-500 text-white'
                                onClick={() => showOrderDetails(order.id)}>
                                Batafsil
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-6 mb-4'>
                <Pagination
                    current={currentPage}
                    pageSize={ordersPerPage}
                    total={orders.length}
                    onChange={onPageChange}
                />
            </div>

            <Modal
                title='Buyurtma tafsilotlari'
                open={isModalVisible}
                onCancel={handleCloseModal}
                width={800}
                footer={null}>
                {selectedOrder ? (
                    <Table
                        columns={columns}
                        dataSource={selectedOrder}
                        rowKey='id'
                    />
                ) : (
                    <p>Ma'lumotlar topilmadi.</p>
                )}
            </Modal>
        </>
    );
};

export default AllSales;
