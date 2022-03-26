import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IStore, IProduct } from './interface/IStore';

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

    // today = mm + '/' + dd + '/' + yyyy;

    const storeList = stores.map((store) => {

        return (
            <Card key={store.id} store={store} />
        )
    });

    return (
        <div className='row'>
            <div className='alert alert-primary' role="alert">{`${yyyy}-${mm}-${dd} 庫存統計`}</div>
            {storeList}
        </div>
    )
}

interface ICard {
    store: IStore
}

const Card = ({ store }: ICard) => {

    const cardStyle = {
        margin: '10px'
    }

    const storeStyle = {
        backgroundColor: 'YellowGreen'
    }

    const renderProduct = (products: Array<IProduct>) => {

        return (
            <div>
                {
                    products.map((product) => {

                        const stockStyle = product.stock == 0 ? { backgroundColor: 'LightSalmon', fontSize: 'small' } : { backgroundColor: 'none', fontSize: 'small' }

                        return <p key={product.id} style={stockStyle} className='card-text'>{`${product.name}${product.stock}`}</p>
                    })
                }
            </div>
        )
    }

    return (
        <div key={store.id} className='col-2'>
            <div className="card" style={cardStyle} >
                <div className="card-body">
                    <h5 className="card-title" style={storeStyle}>{store.name}</h5>
                    {renderProduct(store.products)}
                </div>
            </div>
        </div>
    )
}

export default App;