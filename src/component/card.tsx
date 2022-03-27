import React from 'react';
import { IProduct, IStore } from "../interface/IStore"

interface ICardProps {
    store: IStore
}

const Card: React.FC<ICardProps> = ({ store }) => {

    const renderProduct = (products: Array<IProduct>) => {

        return (
            <div>
                {
                    products.map((product) => {
                        product.stock = product.stock || 0;
                        return <p key={product.id} style={getStockStyle(product.stock)} className='card-text'>{`${product.name}${product.stock}`}</p>
                    })
                }
            </div>
        )
    }

    return (
        <div key={store.id} className='col-2'>
            <div className="card" style={style.card} >
                <div className="card-body">
                    <h5 className="card-title" style={style.storeTitle}>{store.name}</h5>
                    {renderProduct(store.products)}
                </div>
            </div>
        </div>
    )
}

const getStockStyle = (stock: number) => {
    if (stock <= 0) {
        return { ...style.stock, backgroundColor: 'LightSalmon' }
    }

    return style.stock;
}

const style = {
    card: {
        margin: '5px'
    },
    storeTitle: {
        backgroundColor: 'YellowGreen'
    },
    stock: {
        fontSize: 'small',
    }
}

export default Card;