import './Nav.css'
import React from 'react'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i> Início
            </a>
            <a href="#/produtos">
                <i className="fa fa-shopping-cart"></i> Produtos
            </a>
        </nav>
    </aside>