import React, { useEffect, useState } from 'react'
import "../../../assests/tx.css"
import axios from "axios"
import { convertWeiToEth, truncateMiddle } from '../../utils/utils';
import { format } from 'date-fns';
function Transactions() {
    const [transactions, setTransactions] = useState(null);

    const fetchTx = async () => {
        const res = await axios.get(`${import.meta.env.VITE_ROUTE}tx/`, {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        })
        const tx = res?.data?.msg;
        // Assuming convertWeiToEth is an asynchronous function
        const formattedData = await Promise.all(
            tx.map(async (list) => ({
                id: list._id,
                username: list.username,
                amount: await convertWeiToEth(list.amount),
                chainId: list.chainId,
                address: truncateMiddle(list.address),
                createdAt: format(new Date(list.createdAt), 'dd-MMM-yyyy'),
            }))
        );
        setTransactions(formattedData);
        // console.log(formattedData);
    }
    useEffect(() => {
        fetchTx();
    }, [])
    return (
        <div className='tx'>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>amount</th>
                        <th>Chain</th>
                        <th>address</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions &&
                        transactions.map(list => (
                            <tr key={list.id}>
                                <td>{list.username}</td>
                                <td>{list.amount}</td>
                                <td className='chain'>{list.chainId}</td>
                                <td>{list.address}</td>
                                <td>{list.createdAt}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Transactions