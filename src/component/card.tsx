import React, { useEffect, useState } from 'react';
import { IProduct, IStore } from "../interface/IStore"

interface ICardProps {
    store: IStore
}

const Card = ({ store }: ICardProps) => {

    const cardStyle = {
        margin: '5px'
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

export default Card;