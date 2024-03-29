import '@/assets/styles/shop.scss'

import LinkWithTransition from "@/components/ui/LinkWithTransition"
import ShopAddToBasket from "@/components/shop/ShopAddToBasket"
import Image from 'next/image'

export default function ProductPage({ product }){
    return (
        <>

            <div className="product__wrap">
                <div className="product__block imageDesktop">
                    <div className="product__imageBlock">
                        <Image src={product.image} alt={product.name} width={300} height={300}/>
                    </div>
                    <ShopAddToBasket productData={product}/>
                </div>
                <div className="product__block">
                <div className="product__breads breads">

                    <LinkWithTransition href="/" className="breads__item">Витрина</LinkWithTransition>
                        <div className="breads__item">{product.name}</div>
                    </div>

                    <h1 className="product__title">{product.name}</h1>

                    <div className="product__infoPanel">
                        <div className="product__cat">{product.category}</div>
                        <div className="product__price">Цена: {product.price}&#8381;</div>
                        <div className={`productStock ${product.inStock ? 'productStock_true' : 'productStock_false'}`}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                        </div>
                    </div>

                    <div className="product__block imageMobile">
                        <div className="product__imageBlock">
                            <Image src={product.image} alt={product.name} width={300} height={300}/>
                        </div>
                        <ShopAddToBasket productData={product}/>
                    </div>
                    
                    <div className="product__descr" dangerouslySetInnerHTML={{ __html: `<div className='product__descrWrap'>${product.about}</div>`}}></div>
                </div>
            </div>
        </>
    )
}