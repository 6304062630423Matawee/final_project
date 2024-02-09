import React from "react";
import Quotation from "./Quotation";
import Axios from 'axios'
import "./quotation.css";
import { useState,useEffect } from 'react';
import Model from 'react-modal'


function Detaildown(){

    const [quotationList, setQuotationList] = useState([]);
    const [selectedQuotation, setSelectedQuotation] = useState(null);

    useEffect(() => {
        getQuotation();
    }, []);

    const getQuotation = () => {
        Axios.get('http://localhost:3001/quotation')
            .then((response) => {
                setQuotationList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching quotations:', error);
            });
    };

    const handleViewDetail = (quotation) => {
        setSelectedQuotation(quotation);
    };

    return (
        <div>
            <h3>Quotation Detail</h3>
            {selectedQuotation ? (
                <div className='table'>
                    <p> No: {selectedQuotation.no_quotation}</p>
                    <p> Title: {selectedQuotation.title_quotation}</p>
                    <p> Date: {selectedQuotation.date_}</p>
                    <button onClick={() => setSelectedQuotation(null)}>Close</button>
                </div>
            ) : (
                <div>
                    {quotationList.length > 0 ? (
                        quotationList.map((quotation, index) => (
                            <div key={index} className='table'>
                                <p> No: {quotation.no_quotation}</p>
                                <p> Title: {quotation.title_quotation}</p>
                                <p> Date: {quotation.date_}</p>
                                <button onClick={() => handleViewDetail(quotation)}>View</button>
                            </div>
                        ))
                    ) : (
                        <p>No quotations available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Detaildown;