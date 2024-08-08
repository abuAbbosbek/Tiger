import { CalendarTwoTone } from "@ant-design/icons";

const CustomerDebts = () => {
    return (
        <div className="flex justify-between">
            <h1 className="text-4xl">Mijozlar qarzlari</h1>
            <div>
                <button className="px-3 py-3 rounded-md bg-slate-100 "> <CalendarTwoTone/>  Barcha davr</button>
            </div>
        </div>
    );
};

export default CustomerDebts;
