import { ConnectButton } from '@rainbow-me/rainbowkit';

const StyledButton = ({children, action}) => {
    return (
        <button className="lg:text-base text-sm lg:w-48 w-36 lg:h-10 h-9 rounded-full border bg-[#F250F53F] border-[#F250F5] border-solid text-white" onClick={action} >
            {children}
        </button>
    )
}

const WalletConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
                
                if (!connected) {
                    return (
                        <StyledButton action={openConnectModal} >
                            Connect Wallet
                        </StyledButton>
                    )
                }

                if (chain.unsupported) {
                    return (
                        <StyledButton action={openChainModal}>
                            Wrong
                        </StyledButton>
                    )
                }

                return (
                    <div style={{ display: 'flex', gap: 12 }}>
                        <StyledButton action={openAccountModal}>
                            {account.displayName} {account.displayBalance ? ` (${account.displayBalance})` : ''}
                        </StyledButton>
                    </div>
                )
            }}
        </ConnectButton.Custom>
    );
};

export default WalletConnectButton;
