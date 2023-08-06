import React from 'react'

type PropsType = {
    viewCart: boolean,
    setViewCart:React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewCart, setViewCart }: PropsType) => {
    const button = viewCart
        ? <button className='cart__switcher' onClick={() => setViewCart(false)}> View Products</button>
        : <button className='cart__switcher' onClick={() => setViewCart(true)}> View Cart</button>
    const content = (
        <nav className='nav'>
            {button}
        </nav>
    )
  return content
}

export default Nav