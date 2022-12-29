import React from 'react';

const Menu_el = ({menu_el}) => {
    return (
        <li>
            {menu_el.name}
        </li>
    )
}

const Menu = ({menu}) => {
    return (
        <ul className={'my_menu'}>
            {menu.map((menu_el) => <Menu_el menu_el={menu_el}/>)}
        </ul>
    )
}

export default Menu