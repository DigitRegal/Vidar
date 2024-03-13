// import shopSettings from '@/lib/shop/shopSettings'
import ShopListItem from '@/components/shop/ShopListItem'

import {options} from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"

export default async function ShopList({products}){
    const session = await getServerSession(options)

    return (
        <ul className="shopList">
            {session && (<div className='shopItem listItemAdd'>
                <div className="listItemAdd__icon"></div>
                <div className="listItemAdd__title">Добавить товар</div>
            </div>)}
            {products && products.map((product)=> <ShopListItem key={product._id} productData={product}/>)}
        </ul>
    )
}