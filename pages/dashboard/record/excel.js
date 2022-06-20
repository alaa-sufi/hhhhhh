import React , { useState} from "react";
// import { Button } from "react-bootstrap";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import fakeData from "/data.json"
const data = fakeData.filter((v, i) => i < 8);

const ExportCSV = ({ csvData, fileName, wscols }) => {
    // ******** XLSX with object key as header *************
    // const fileType =
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    // const fileExtension = ".xlsx";

    // const exportToCSV = (csvData, fileName) => {
    //   const ws = XLSX.utils.json_to_sheet(csvData);
    //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    //   const data = new Blob([excelBuffer], { type: fileType });
    //   FileSaver.saveAs(data, fileName + fileExtension);
    // };

    // ******** XLSX with new header *************
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const Heading = [
        {
            the_account: "the_account",
            the_operation: "the_operation",
            type: "type",
            register: "register",
            the_closure_price: "the_closure_price",
            the_opening_price: "the_opening_price",
            profit: "profit",
           
        }
    ];

    const exportToCSV = (csvData, fileName, wscols) => {
        const ws = XLSX.utils.json_to_sheet(Heading, {
            header: ["the_account", "the_operation", "type", "register", "the_closure_price", "the_opening_price", "profit"],
            skipHeader: true,
            origin: 0 //ok
        });
        ws["!cols"] = wscols;
        XLSX.utils.sheet_add_json(ws, csvData, {
            header: ["the_account", "the_operation", "type", "register", "the_closure_price", "the_opening_price", "profit"],
            skipHeader: true,
            origin: -1 //ok
        });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <button
        className="bg-priamry"
            onClick={e => exportToCSV(csvData, fileName, wscols)}
        >
            Export XLSX
        </button>
    );
};


export default function Excel() {
    const [customers, setCustomers] = useState(data)
   
    const wscols = [
        { wch: Math.max(...customers.map(customer => customer.the_account.length)) },
        { wch: Math.max(...customers.map(customer => customer.the_operation.length)) },
        { wch: Math.max(...customers.map(customer => customer.type.length)) },
        { wch: Math.max(...customers.map(customer => customer.register.length)) },
        { wch: Math.max(...customers.map(customer => customer.the_closure_price.length)) },
        { wch: Math.max(...customers.map(customer => customer.the_opening_price.length)) },
        {
          wch: Math.max(...customers.map(customer => customer.profit.length)) + 3
        }
      ];
    return (
        <div>
            
            <ExportCSV
            csvData={customers}
            fileName="Customers_Infomation_xlsx"
            wscols={wscols}
          />
        </div>
    )
}