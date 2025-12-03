import './sniper.css';

function SniperForLoading() {
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <div className="lds-grid">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            {/* <h3>Loading Data...</h3> */}
        </div>
    );
}

export default SniperForLoading;
