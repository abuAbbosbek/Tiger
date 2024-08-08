import {
    FundTwoTone,
    IdcardTwoTone,
    PieChartTwoTone,
    ScheduleTwoTone,
    SettingTwoTone,
    ShoppingTwoTone,
    SkinTwoTone,
} from "@ant-design/icons";
import Customers from "../mijozlar/mijozlar";
import CustomerDebts from "../mijozlar/mijozlarqarzlari";
import WriteOff from "../goods/writeoff";
import Katalog from "../goods/katalog";
import Import from "../goods/import";

const MenuList = [
    {
        id: 1,
        title: "Tovarlar",
        icon: <SkinTwoTone />,
        children: [
            {
                id: 8,
                title: "Katalog",
                path: "/katalog",
                element: <Katalog />,
            },
            {
                id: 9,
                title: "Import",
                path: "/import",
                element: <Import />,
            },
            {
                id: 10,
                title: "Buyurtmalar",
                path: "/buyurtmalar",
            },
            {
                id: 11,
                title: "Inventarizatsiya",
                path: "/inventarizatsiya",
            },
            {
                id: 12,
                title: "Transfer",
                path: "/transfer",
            },
            {
                id: 13,
                title: "Qayta baholash",
                path: "/qayta-baholash",
            },
            {
                id: 14,
                title: "Hisobdan chiqarish  ",
                path: "/writeoff",
                element: <WriteOff />,
            },
            {
                id: 15,
                title: "Yetkazib berish",
                path: "/yetkazib-berish",
            },
        ],
    },
    {
        id: 2,
        title: "Sotuvlar",
        icon: <ShoppingTwoTone />,
        children: [
            {
                id: 16,
                title: "Yangi sotuvlar",
                path: "/yangisotuvlar",
            },
            {
                id: 17,
                title: "Barcha sotuvlar",
                path: "/barchasotuvlar",
            },
        ],
    },
    {
        id: 3,
        title: " Mijozlar",
        icon: <IdcardTwoTone />,
        children: [
            {
                id: 18,
                title: "Barcha mijozlar",
                path: "/customers",
                element: <Customers />,
            },
            {
                id: 19,
                title: "Mijozlar guruhi",
                path: "/",
            },
            {
                id: 20,
                title: "Sodiqlik dasturi",
                path: "/",
            },
            {
                id: 21,
                title: "Mijozlar qarzdorligi",
                path: "/customerdebts",
                element: <CustomerDebts />,
            },
        ],
    },
    {
        id: 4,
        title: "Marketing",
        icon: <PieChartTwoTone />,
        children: [
            {
                id: 22,
                title: "Aksiyalar",
                path: "/shares",
            },
            {
                id: 23,
                title: "Promo kodlari",
                path: "/promocode",
            },
            {
                id: 41,
                title: "SMS yuborish",
                path: "/sendsms",
            },
            {
                id: 40,
                title: "Sovg'a kartalari",
                path: "/gift-cards",
            },
        ],
    },
    {
        id: 5,
        title: "Hisobatlar",
        icon: <ScheduleTwoTone />,
        children: [
            {
                id: 24,
                title: "Tanlanganlar",
                path: "/selected",
            },
            {
                id: 25,
                title: "Do'kon",
                path: "/shop",
            },
            {
                id: 26,
                title: "Tovarlar",
                path: "/goods",
            },
            {
                id: 27,
                title: "Sotuvchilar",
                path: "/sellers",
            },
            {
                id: 28,
                title: "Mijozlar",
                path: "/customer",
            },
        ],
    },
    {
        id: 6,
        title: "Boshqaruv",
        icon: <FundTwoTone />,
        children: [
            {
                id: 29,
                title: "Hodimlar",
                path: "/employees",
            },
            {
                id: 30,
                title: "Rollar",
                path: "/roles",
            },
        ],
    },
    {
        id: 7,
        title: "Sozlamalar",
        icon: <SettingTwoTone />,
        children: [
            {
                id: 31,
                title: "Profil",
                path: "/profile",
            },
            {
                id: 32,
                title: "Kompaniya",
                path: "/company",
            },
            {
                id: 33,
                title: "Do'konlar",
                path: "/shops",
            },
            {
                id: 34,
                title: "Kassalar",
                path: "/checkout",
            },
            {
                id: 35,
                title: "Cheklar",
                path: "/checks",
            },
            {
                id: 36,
                title: "Valyuta va to'lovlar",
                path: "/currency",
            },
            {
                id: 37,
                title: "Tovarlar",
                path: "/goods",
            },
            {
                id: 38,
                title: "Xabarlar",
                path: "/messages",
            },
            {
                id: 39,
                title: "Ilovalar",
                path: "/apps",
            },
        ],
    },
];

export { MenuList };
