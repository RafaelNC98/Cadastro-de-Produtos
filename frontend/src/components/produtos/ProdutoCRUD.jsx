import React, { Component } from 'react'
import Main from '../templates/Main'

const headerProps = {
    icon: 'shopping-cart',
    title: 'Produtos',
    subtitle: 'Cadastro de produtos.'
}

export default class ProdutoCRUD extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Produtos.
            </Main>
        )
    }
}
