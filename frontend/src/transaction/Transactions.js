import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RotateLoader from 'react-spinners/RotateLoader';

import ShowDate from '../components/ShowDate'
import ShowWallets from "../components/ShowWallets";
import AuthContext from "../context/AuthContext";
import useFetch from "../components/useFetch";
import MsgAlert from "../components/MsgAlert";


const Transactions = () => {
    const DEFAULT_NUM_ITEMS = 10
    const DEFAULT_FIRST_PAGE = 1
    let { user }                        = useContext(AuthContext)
    let { t }                           = useTranslation()
    const pk                            = user?.user_id
    let api                             = useFetch()

    const link                          = useRef(null)
    const link2                         = useRef(null)

    const [allTrans, setAllTrans]       = useState([])
    const [username, setUsername]       = useState(null)
    const [symbol, setSymbol]           = useState(null)
    const [totalTrans, setTotalTrans]   = useState(null)

    const [iso2, setIso2]               = useState(null)
    const [currency, setCurrency]       = useState(null)
    const [numItems, setNumItems]       = useState(DEFAULT_NUM_ITEMS)
    const [pageNum, setPageNum]         = useState(DEFAULT_FIRST_PAGE)

    const [isLoading, setIsLoading]     = useState(true)
    const [error, setError]             = useState(null)

    const fetchStuff = useCallback(() => {
        let loadUser = async () => {
            let { response, data } = await api("/api/currUser/")
    
            if (response.status === 200) {
                setUsername(data.username)
                setIso2(data.iso2)
                setCurrency(data.currency)
    
                getTransactions(data.iso2, data.currency)
            } else {
                setError("default_error")
                setIsLoading(false)
            }
        }; loadUser()
    
        let getTransactions = async (iso, curr) => {
            let { response, data } = await api(`/api/transactions/${iso}/${curr}/${pageNum}/${numItems}/`)
            
            if (response.status === 200) {            
                setAllTrans(data.transactions)
                setSymbol(data.currencySymbol)
                setTotalTrans(data.counter)
    
                setIsLoading(false)
            } else {
                setError("default_error")
                setIsLoading(false)
            }
        }

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchStuff()
    }, [fetchStuff])

    let changeCurr = async (wallet) => {
        setIsLoading(true)
        
        let { response, data } = await api(`/api/transactions/${wallet[0]}/${wallet[1]}/1/${numItems}/`)
        if (response.status === 200) {
            setAllTrans(data.transactions)
            setSymbol(data.currencySymbol)
            setTotalTrans(data.counter)

            setIso2(wallet[0])
            setCurrency(wallet[1])

            // making sure this happens => (page x of y) has x < y relationship
            setPageNum(1)

            setIsLoading(false)
        } else {
            setError("default_error")
            setIsLoading(false)
        }
    }

    let changeNumItems = async (num) => {
        setIsLoading(true)
        setNumItems(num)
        
        let { response, data } = await api(`/api/transactions/${iso2}/${currency}/1/${num}/`)
        if (response.status === 200) {
            setAllTrans(data.transactions)
            setSymbol(data.currencySymbol)
            setTotalTrans(data.counter)

            setIsLoading(false)
        } else {
            setError("default_error")
            setIsLoading(false)
        }
    }

    let changePageNum = async (num) => {
        setIsLoading(true)

        // making sure page number of total amount of transactions (page x of y) has x < y relationship
        if (Math.ceil(totalTrans / numItems) < pageNum) {
            setPageNum(Math.ceil(totalTrans / numItems))
        } else {
            setPageNum(num)
        }
        
        let { response, data } = await api(`/api/transactions/${iso2}/${currency}/${num}/${numItems}/`)
        if (response.status === 200) {
            setAllTrans(data.transactions)
            setSymbol(data.currencySymbol)
            setTotalTrans(data.counter)

            setIsLoading(false)
        } else {
            setError("default_error")
            setIsLoading(false)
        }
    }

    let mouseOver = (num) => (num === 1) ? link.current.style.color = "black" : link2.current.style.color = "black"
    let mouseOut  = (num) => (num === 1) ? link.current.style.color = "#f8b119c7" : link2.current.style.color = "#f8b119c7"

    return (
        <div className="transactions">
            {error && <MsgAlert msg={error} variant="danger" />}
            { isLoading && 
                <div className="spinner">
                    <RotateLoader color="#f8b119" size={20} />
                </div>
            }

            <div className="card mx-auto zarathus-card">
                <div className="card-body">
                    <div className="m-2 mx-auto">
                        {totalTrans !== 0 ? 
                            <><div className="mb-3 text-center">{t("pagniation")}</div>
                                <div className="mb-3 text-center">{t("total_transaction")}{totalTrans}</div>

                                <div className="align-self-center ms-3 text-center">
                                <button className="neon-button" onMouseOver={() => mouseOver(1)} onMouseOut={() => mouseOut(1)}
                                id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    {t("plz_num")} <i className="fas fa-caret-down" ref={link}></i>
                                </button>
                            
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(1)} type="button">1</button></li>
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(2)} type="button">2</button></li>
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(5)} type="button">5</button></li>
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(10)} type="button">10</button></li>
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(20)} type="button">20</button></li>
                                    <li><button className="dropdown-item" onClick={() => changeNumItems(0)} type="button">ALL</button></li>
                                </ul>
                            </div></>
                            : 
                            <>
                                <h5 className="text-center mb-3">{t("no_transaction")}</h5>
                                <div className="text-center">
                                    <Link to="/deposit" className="neon-button">{t("deposit")}</Link>
                                </div>
                            </>
                        }

                        <hr></hr>
                        {/* selecting a wallet */}

                        <div className="text-center">
                            <ShowWallets pk={pk} home={false} changeCurr={changeCurr} />
                        </div>

                    </div>
                </div>
            </div>

            <br></br>

            {/* Transactions */}
            {allTrans.map((item, key) => (
                
                <div className="list-group mx-auto mb-4" key={key}>
                    <Link to={`/transactions/${item.id}`} id="history-list"
                    className="list-group-item list-group-item-action flex-column align-items-start text-white">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">
                                <ShowDate year={item.date[0]} month={item.date[1]} day={item.date[2]} hour={item.date[3]} minute={item.date[4]} seconds={item.date[5]} format="first" />
                            </h5>
                        </div>

                        <p className="mb-1" id="history-card-text">
                            {item.type === "Deposit" ?
                                <>
                                    <i className="float-none history-icons bi bi-download"></i>
                                    <span className="float-none ms-3">
                                        Deposit to {item.person !== "Anonymous" ? item.person[0] : item.wallet[0]}
                                    </span>
                                </>
                            :
                            undefined}

                            {item.type === "Cash Out" ?
                                <>
                                    <i className="fas fa-hand-holding-usd float-none history-icons py-2"></i>
                                    <span className="float-none ms-3">
                                        Cash Out for {item.person[0] !== "Anonymous" ? item.person[0] : item.wallet[0]}
                                    </span>
                                </>
                            :
                            undefined}

                            {item.type === "Transfer" ?
                                <>
                                    <i className="float-none history-icons bi-send-check"></i>
                                    <span className="float-none ms-3">
                                        Transfer from  {Array.isArray(item.person) && item.person[0] !== "Anonymous" ? item.person[0] : item.wallet[0]} to {item.person2 !== "Anonymous" ? item.person2 : item.wallet2}
                                    </span>
                                </>
                            :
                            undefined}

                            {item.type === "Exchange" ?
                                <>
                                    <i className="bi bi-currency-exchange float-none history-icons"></i>
                                    <span className="float-none ms-3">
                                        Exchange for {username}
                                    </span>
                                </>
                            :
                            undefined}

                            {item.type === "Withdraw" ?
                                <>
                                    <i className="float-none history-icons bi-upload"></i>
                                    <span className="float-none ms-3">
                                    Withdraw for {username}
                                    </span>
                                </>
                            :
                            undefined}


                            {item.type === "Transfer" ? (
                                ( item.person2 === username || item.wallet2 === username ) ? 
                                    <span className="float-end plus-money">
                                        +{symbol}{ (item.price).toFixed(2) }
                                    </span>
                                : 
                                    <span className="float-end minus-money">
                                        -{symbol}{ (item.price).toFixed(2) }
                                    </span>
                            ) :
                            ( item.type === "Exchange" ? (
                                ( item.person[1] === currency || item.wallet[1] === currency ) ? 
                                    <span className="float-end minus-money">
                                        -{symbol}{ (item.price).toFixed(2) }
                                    </span>
                                : 
                                    <span className="float-end plus-money">
                                        +{symbol}{ (item.exPrice).toFixed(2) }
                                    </span>
                            ) :
                            ( ( item.person2 === username || item.type === "Deposit" || item.type === "Cash Out" ) ? 
                                <span className="float-end plus-money">
                                    +{symbol}{ (item.price).toFixed(2) }
                                </span>
                                : 
                                <span className="float-end minus-money">
                                    -{symbol}{ (item.price).toFixed(2) }
                                </span>
                            )
                            )
                            }

                        </p>

                        <small style={{color: "rgba(255, 255, 255, 0.7)"}}> 
                            <ShowDate year={item.date[0]} month={item.date[1]} day={item.date[2]} hour={item.date[3]} minute={item.date[4]} seconds={item.date[5]} format="second" /> • { item.type }
                        </small>
                    </Link>
                </div>

            ))}

            {(!isLoading && totalTrans !== 0) &&
            <>
            {numItems !== 0 && 
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        {pageNum !== 1 && 
                        <>
                            <li className="page-item"><button className="page-link" onClick={() => changePageNum(1)}>&laquo;</button></li>
                            <li className="page-item"><button className="page-link" onClick={() => { changePageNum(pageNum - 1); } }>Previous</button></li>
                        </>
                        }

                        <li className="page-item disabled">
                            <button className="page-link">
                                Page {pageNum} of {Math.ceil(totalTrans / numItems)}
                            </button>
                        </li>

                        {pageNum < Math.ceil(totalTrans / numItems) && 
                        <>
                            <li className="page-item"><button className="page-link" onClick={() => changePageNum(pageNum + 1)}>Next</button></li>
                            <li className="page-item"><button className="page-link" onClick={() => changePageNum(Math.ceil(totalTrans / numItems))}>&raquo;</button></li>
                        </>
                        }
                    </ul>
                </nav>
            }

                <div className="text-center">
                    <Link className="neon-button my-2" to="/home">{t("home")}</Link> 
                </div>
            </>
            }

            <br />
        </div>
    );
}
 
export default Transactions;