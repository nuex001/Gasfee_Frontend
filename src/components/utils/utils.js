import { toast } from "react-toastify";
import axios from 'axios';


export const successMsg = (e) =>
    toast(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "dark",
    });
export const errorMsgs = (e) =>
    toast(e, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "dark",
    });

export const selectStyle = {
    control: (base, state) => ({
        ...base,
        border: '1px solid #AFABAA',
        boxShadow: "none",
        backgroundColor: 'var(--bg2)',
        height: "50px",
        fontSize: "1.4em",
        '&:hover': {
            border: '1px solid #AFABAA',
            backgroundColor: 'var(--bg2)',
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--bg2)', // Background color for the menu (options list)
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff', // Text color for the selected input
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#fff', // Text color
        backgroundColor: 'transparent',
        border: "none",
        fontSize: "1.4em",
        cursor: "pointer",
    }), //for the main option

}


export function truncateMiddle(str, startChars = 7, endChars = 7, ellipsis = '...') {
    if (str.length > (startChars + endChars)) {
        return str.substring(0, startChars) + ellipsis + str.substring(str.length - endChars);
    } else {
        return str;
    }
}

export async function convertWeiToEth(value) {
    const val = parseInt(value);
    if (val === 0) {
        return 0;
    }
    const eth = val / 10 ** 18; // Convert Wei to Ether
    const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
    let ethPrice = response.data.USD;
    let amountInEth = eth * ethPrice;
    const strNumber = amountInEth.toLocaleString();
    // console.log(eth,value,amountInEth ,ethPrice);
    return strNumber;
}