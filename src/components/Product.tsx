import { ProductType } from "../context/ProductsProvider"
import { ReducerActionType, ReducerAction } from "../context/CartProvider"
import { ReactElement, memo, useState } from 'react'
import useCart from "../hooks/useCart"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,
}

  


const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}:PropsType): ReactElement => {
    const { cart } = useCart()
    const [showOverlay, setShowOverlay] = useState(false);

    // const imgFolder = require.context(`./images/${product.sku}/`, false)
    // const img_node = imgFolder(`./${product.sku}.png`);

    let itemQty = 0;
    inCart ? cart.forEach(item => {item.sku == product.sku? itemQty=item.qty:null}):itemQty=0;
    const img = new URL(`../images/${product.sku}/${product.sku}.jpg`, import.meta.url).href
    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 }})

    const onRemFromCart = () => dispatch({ type: REDUCER_ACTIONS.SUBTRACT, payload: { ...product, qty: 1 }})

    const RemComplitely = () => dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: { ...product, qty: 1 }})

    const itemInCart = inCart ? '🛒✔️' : null
    
    const AddButton = (
        inCart ?
        <figure className="figure__addbutton">
            <button className="child" onClick={itemQty>1? onRemFromCart: RemComplitely}>-</button>
            <div className="child">{itemQty}</div>
            <button className="child" onClick={onAddToCart}>+</button>
        </figure>
        :
        <><button className="button__add" onClick={onAddToCart}>Add to Cart</button></>

    )

    const content = 
        <article className="product">
            <h3>{product.name}</h3>
            <div className="hover">
                <figure>
                    <div className="div">
                        <div className="card">
                            <img src={img} alt={product.name} className="product__img"/>
                        </div>
                    </div>
                </figure>  
            </div>
            
            <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}
            {itemInCart}</p>
            {AddButton}
            
        </article>
        
    return content
}
function areProductsEqual({product: prevProduct, inCart:prevInCart }:PropsType, {product: nextProduct, inCart:nextInCart }:PropsType){
    return (
        Object.keys(prevProduct).every(key => {
            return prevProduct[key as keyof ProductType] == nextProduct[key as keyof ProductType]
        }) && prevInCart == nextInCart
    )
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual)

export default MemoizedProduct