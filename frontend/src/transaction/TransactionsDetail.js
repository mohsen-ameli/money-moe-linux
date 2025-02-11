import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import RotateLoader from 'react-spinners/RotateLoader';
import useFetch from "../components/useFetch";
import MsgAlert from "../components/MsgAlert";
import useMsgSwal from "../components/useMsgSwal";
import { t } from "i18next";

const TransactionsDetail = () => {
    let tId                                     = useParams().tId
    const history                               = useHistory()
    let api                                     = useFetch()
    const msgSwal                               = useMsgSwal()

    const [date, setDate]                       = useState(null)
    const [type, setType]                       = useState(null)
    const [price, setPrice]                     = useState(null)
    const [exPrice, setExPrice]                 = useState(null)
    const [transactor, setTransactor]           = useState(null)
    const [incoming, setIncoming]               = useState(null)
    const [currencySymbol, setCurrencySymbol]   = useState(null)
    const [message, setMessage]                 = useState(null)
    const [person, setPerson]                   = useState(null)
    const [giverSymbol, setGiverSymbol]         = useState(null)
    const [recieverSymbol, setRecieverSymbol]   = useState(null)

    const [isLoading, setIsLoading]             = useState(true)
    const [error, setError]                     = useState(null)

    useEffect(() => {
        let loadTransaction = async () => {
            let { response, data } = await api(`/api/transactions/${tId}/`)
            if (response.status === 200) {
                let transaction = data.transaction[0]
    
                setType(transaction.type)
                setPrice(transaction.price?.toFixed(2))
                setExPrice(transaction.exPrice?.toFixed(2))
                setTransactor(data.transactor)
                setIncoming(data.incoming)
                setCurrencySymbol(data.currency_symbol)
                setMessage(transaction.message)
    
                setPerson(transaction.person)
                // setPerson2(transaction.person2)
    
                setGiverSymbol(data.giverSymbol)
                setRecieverSymbol(data.recieverSymbol)
    
                let temp = new Date(transaction.date)
    
                let date_ = temp.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }) 
                + " | " +  temp.toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: '2-digit' })
    
                setDate(date_)
    
                setIsLoading(false)
            } else {
                setError("default_error")
                setIsLoading(false)
            }
        }; loadTransaction()

        // eslint-disable-next-line
    }, [])

    let deleteTransaction = async () => {
        let { response, data } = await api(`/api/transactions/${tId}/delete/`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json',
            }
        })
        if (response.ok) {
            if (data.success) {
                history.goBack()
                msgSwal(t("trans_del_suc"), "success")
            } else {
                setError("default_error")
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="transactions-detail">
            {error && <MsgAlert msg={error} variant="danger" />}
            { isLoading && 
                <div className="spinner">
                    <RotateLoader color="#f8b119" size={20} />
                </div>
            }

            <div className="card text-white zarathus-card mx-auto">
                <div className="card-body">
                    <h3 className="fw-normal text-center">{type} Transaction</h3>
                    <hr className="zarathus-hr"></hr>

                    <div style={{fontSize: "large"}}>
                        {type === "Transfer" ? (
                            (incoming === 1) ? 
                                <div>{currencySymbol}{price} has been transfered to you by {transactor}</div>
                            : <div>You have transfered {currencySymbol}{price} to {transactor}</div>
                        ) : ""}
                    </div>

                    <div style={{fontSize: "large"}}>
                        {type === "Deposit" ? 
                            <div>
                                Deposit to {person !== "Anonymous" && person[0]}, for the amount {currencySymbol}{price}
                            </div>
                        : ""}
                    </div>

                    <div style={{fontSize: "large"}}>
                        {type === "Withdraw" ? 
                            <div>
                                Withdraw from {person !== "Anonymous" && person[0]}, for the amount {currencySymbol}{price}
                            </div>
                        : ""}
                    </div>

                    <div style={{fontSize: "large"}}>
                        {type === "Cash Out" ? 
                            <div>
                                You have cashed out {currencySymbol}{price}
                            </div>
                        : ""}
                    </div>

                    <div style={{fontSize: "large"}}>
                        {type === "Exchange" ? 
                            <div>
                                You have exchanged {giverSymbol}{price} for {recieverSymbol}{exPrice}
                            </div>
                        : ""}
                    </div>

                    {message &&
                        <div style={{fontSize: "large"}}>
                            message: {message}
                        </div>
                    }

                    <br />
                    <small>{date}</small>
                    <hr />
                    <button className="neon-button" onClick={() => history.goBack()}>Back</button>
                    <button className="neon-button-red mx-3" onClick={() => deleteTransaction()}>Delete This Transaction</button>
                </div>
            </div>
        </div>
    );
}
 
export default TransactionsDetail;