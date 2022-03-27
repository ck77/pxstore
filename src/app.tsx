import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IStore } from './interface/IStore';
import Card from './component/card';

const App = () => {
    return (
        <div className='container-fluid'>
            <PxStore />
        </div>
    )
}

const PxStore = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Array<IStore>>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get('https://ck77.github.io/pxstore/report.json');
                setData(response);

            } catch (error) {
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div>
            {loading && <div>Loading...</div>}

            {!loading && renderStoreList(data)}

        </div>
    )
}

const renderStoreList = (stores: Array<IStore>) => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    const storeList = stores.map((store) => {

        return (
            <Card key={store.id} store={store} />
        )
    });

    const titleStyle = {
        fontSize: 'x-large'
    }

    return (
        <div className='row'>
            <div className='alert alert-primary' style={titleStyle} role="alert">{`${yyyy}-${mm}-${dd} 庫存統計`}</div>
            {storeList}
        </div>
    )
}

export default App;