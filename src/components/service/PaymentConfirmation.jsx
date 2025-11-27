import React, { useState, useEffect, useRef } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";

const PaymentConfirmation = () => {
  const { isModalOpen, getModalData, closeModal } = useModal();
  const { lastModal, serviceId } = getModalData("lastModal") || {};
  const isOpen = isModalOpen("lastModal");

  const printRef = useRef();

  /* ---------------- FORMAT RESPONSE ---------------- */
  const formatResponse = (data) => {
    if (!data?.response) return [];

    const resp = data.response;

    const flat = {
      ResponseCode: resp.responseCode,
      ResponseReason: resp.responseReason,
      TransactionRefId: resp.txnRefId,
      TransactionType: resp.txnRespType,

      // Convert paise amount → rupees
      Amount: resp.respAmount ? Number(resp.respAmount) / 100 : "",

      BillDate: resp.respBillDate,
      CustomerName: resp.respCustomerName,
      DueDate: resp.respDueDate,

      ApprovalRefNumber: resp.approvalRefNumber,
      RequestId: resp.requestId,
    };

    // Add input params safely
    const inputParams =
      resp.inputParams?.input?.map((i) => ({
        [i.paramName]: i.paramValue
      })) || [];

    // Merge all input params
    inputParams.forEach((obj) => {
      const key = Object.keys(obj)[0];
      flat[key] = obj[key];
    });

    return Object.entries(flat).map(([key, value]) => ({
      key,
      value,
    }));
  };

  const tableData = formatResponse(lastModal);

  // Split into 2-column rows
  const rows = [];
  for (let i = 0; i < tableData.length; i += 2) {
    rows.push(tableData.slice(i, i + 2));
  }

  /* ---------------- PRINT HANDLER ---------------- */
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
      onClose={() => closeModal("lastModal")}
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
                      <td className="border p-1 font-semibold w-1/4">
                        {item.key}
                      </td>
                      <td className="border p-1 w-1/4">
                        {item.value}
                      </td>
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
