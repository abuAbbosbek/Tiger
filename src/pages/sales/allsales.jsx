import { Button } from "antd";
import Search from "antd/lib/input/Search";

const AllSales = () => {
  return (
    <>
      <div className="flex">
        <h1 className="text-4xl mb-2">Barcha sotuvlar</h1>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-5">
        <div className="w-full sm:w-auto">
          <Search
            placeholder="Nickname, F.I.SH, Passport, Tel"
            size="large"
            style={{ width: "300px" }}
          />
        </div>

        <div className="sm:w-auto">
          <Button className="bg-sky-500 text-white" size="large">
            Export
          </Button>
        </div>
      </div>
    </>
  );
};

export default AllSales;
