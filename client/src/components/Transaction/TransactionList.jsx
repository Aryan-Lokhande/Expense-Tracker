import React, { useState } from "react";
import {LuDownload} from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const TransactionList = ({transactions, onDelete, onDownload, list}) => {
    
    console.log("Transactions: ",transactions)
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">ALL {list}</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>
      <div className="mt-6 h-[350px] overflow-y-auto scrollbar-none pr-2">
        {transactions?.map((transac) => (
          <TransactionInfoCard
            key={transac._id}
            title={transac.category || transac.source}
            icon={transac.icon}
            date={moment(transac.date).format("Do MMM YYYY")}
            amount={transac.amount}
            type={list}
            onDelete={() => onDelete(transac._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;