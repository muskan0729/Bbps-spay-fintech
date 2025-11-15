import React, { useState, useEffect, useRef } from "react";
import {ServicesModalWrapper} from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
const PaymentConfirmation = () => {
  const { isModalOpen, getModalData, closeModal } = useModal();
  const { txnData } = getModalData("txnForm") || {};
  const isOpen = isModalOpen("txnForm");

  // Sample random data for demonstration
  const tableData = txnData
    ? Object.entries(txnData).map(([key, value]) => ({ key, value }))
    : [
        { key: "Transaction ID", value: "TXN123456" },
        { key: "Amount", value: "₹5000" },
        { key: "Date", value: "12-Nov-2025" },
        { key: "Status", value: "Successful" },
      ];

  // Split into max 2 columns per row
  const rows = [];
  for (let i = 0; i < tableData.length; i += 2) {
    rows.push(tableData.slice(i, i + 2));
  }

  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Transaction</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            td, th { border: 1px solid #000; padding: 8px; }
            td.font-semibold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("txnForm")}
      headerBg="bg-white"
      headerTextColor="text-green-600"
      renderHeader={<span className="font-semibold text-lg">Transaction Successful</span>}
      renderMiddle={
        <div ref={printRef}>
          <table className="w-full text-[15px] border border-gray-200 border-collapse">
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border border-gray-200">
                  {row.map((item, i) => (
                    <React.Fragment key={i}>
                      <td className="border p-1 font-semibold w-1/4">{item.key}</td>
                      <td className="border p-1 w-1/4">{item.value}</td>
                    </React.Fragment>
                  ))}
                  {row.length === 1 && (
                    <>
                      <td className="border p-1 w-1/4">&nbsp;</td>
                      <td className="border p-1 w-1/4">&nbsp;</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      renderFooter={(close) => (
        <>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Print
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Email
          </button>
        </>
      )}
    />
  );
};

 export default PaymentConfirmation;