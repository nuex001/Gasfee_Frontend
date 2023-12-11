import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    sepolia,
    polygonMumbai
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const { chains, publicClient } = configureChains(
    [sepolia, polygonMumbai],
    [
        alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMYID }),
        publicProvider(),
    ]
);
const { connectors } = getDefaultWallets({
    appName: "GASFEE",
    projectId: import.meta.env.VITE_PROJECTID,
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})
ReactDOM.createRoot(document.getElementById('root')).render(
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        </RainbowKitProvider>
    </WagmiConfig>
)
