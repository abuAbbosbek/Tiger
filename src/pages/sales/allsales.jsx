import { Button, Modal, Pagination, Table } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import axios from "axios";

const AllSales = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [order_client_id, setOrder_client_id] = useState("");
    const [results, setResults] = useState([]);
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
                a;
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
                setClients(response.data.getAllClients);
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchOrders();
        fetchProducts();
        fetchClients();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            // Bekor qilishni API ga yuboramiz
            const response = await axios.delete(
                `http://localhost:3001/OrderClient/cancelProduct/${orderId}`
            );
            window.location.reload();

            if (response.data && response.data.status === 2) {
                // Agar status 2 bo'lsa, buyurtmalar ro'yxatida shu buyurtmaning statusini yangilaymiz
                const updatedOrders = orders.map((order) =>
                    order.id === orderId ? { ...order, Status: 2 } : order
                );
                setOrders(updatedOrders);
            }

            console.log("Buyurtma bekor qilindi");
        } catch (error) {
            console.error("Bekor qilishda xatolik yuz berdi", error);
        }
    };

    const showOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/OrderClient/getOrder/${orderId}`
            );
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

    const calculateTotalPrice = () => {
        if (!selectedOrder || selectedOrder.length === 0) return 0;

        // Raqamlarni yig'amiz va raqam ekanligini tekshiramiz
        const total = selectedOrder.reduce(
            (sum, order) => sum + (parseFloat(order.total_price) || 0),
            0
        );

        return total;
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const sortedOrders = orders.sort((a, b) => b.id - a.id);
    const currentOrders = sortedOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("uz-UZ").format(price);
    };

    // columns o'zgaruvchisini yuqoriga ko'chiramiz
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

                <div>
                    <div className='flex'>
                        <div className='w-[15px] h-[15px] mr-3 bg-green-500 border-2 mt-1'></div>
                        <p>Sotilgan tovarlar</p>
                    </div>
                    <div className='flex'>
                        <div className='w-[15px] h-[15px] mr-3 bg-red-500 border-2 mt-1 '></div>
                        <p>Bekor qilingan tovarlar</p>
                    </div>
                </div>
            </div>

            <br />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {currentOrders.map((order) => (
                    <div
                        key={order.id}
                        className='w-full h-[300px] border-2 shadow-lg shadow-black-500/40 rounded-xl flex flex-col mb-4'
                        onClick={() => showOrderDetails(order.id)}>
                        <h1
                            className={`text-xl text-center rounded-t-[10px] ${
                                order.Status === 2
                                    ? "text-red-600 bg-red-400 bg-opacity-20"
                                    : "text-green-600 bg-green-400 bg-opacity-20"
                            }`}>
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
                                Buyurtmachi:{" "}
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
                                className='bg-red-400 text-white'
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={order.Status === 2}>
                                {order.status === 2
                                    ? "Bekor qilingan"
                                    : "Bekor qilish"}
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
                width={800}>
                {selectedOrder ? (
                    <Table
                        columns={columns}
                        dataSource={selectedOrder}
                        rowKey='id'
                        pagination={{
                            pageSize: 5,
                            showTotal: (total) => (
                                <div className=''>
                                    <h1 className='text-xl'>
                                        Umumiy narxi:{" "}
                                        {formatPrice(calculateTotalPrice())}{" "}
                                        so'm
                                    </h1>
                                </div>
                            ),
                        }}
                    />
                ) : (
                    <p>Ma'lumotlar topilmadi.</p>
                )}
            </Modal>
        </>
    );
};

export default AllSales;
