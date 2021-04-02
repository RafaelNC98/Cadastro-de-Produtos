import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/Main'

const headerProps = {
    icon: 'shopping-cart',
    title: 'Produtos',
    subtitle: 'Cadastro de produtos.'
}

const baseUrl = 'http://localhost:3001/produtos'
const initialState = {
    produtos: { nome:'', preco:''},
    list: []
}

export default class ProdutoCRUD extends Component {
    
    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({produtos: initialState.produtos})
    }

    save() {
        const produtos = this.state.produtos
        const method = produtos.id ? 'put' : 'post'
        const url = produtos.id ? `${baseUrl}/${produtos.id}` : baseUrl
        axios[method](url, produtos)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ produtos: initialState.produtos, list})
            })
    }
    
    getUpdatedList(produtos, add = true) {
        const list = this.state.list.filter(p => p.id !== produtos.id)
        if(add) list.unshift(produtos)
        return list
    }

    updateField(event) {
        const produtos = { ...this.state.produtos }
        produtos[event.target.name] = event.target.value
        this.setState({ produtos })
    }

    renderForm() {
        return ( 
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                             name="nome"  
                            value={this.state.produtos.nome}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome do produto..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control" 
                            name="preco" 
                            value={this.state.produtos.preco}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o preço do produto..."/>
                        </div>
                    </div>
                </div>
                <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary"
                                onClick={e => this.save(e)}>
                                Salvar
                            </button>

                            <button className="btn btn-secondary ml-2"
                                 onClick={e => this.clear(e)}>
                                Cancelar
                            </button>
                        </div>
                </div>
            </div>
        )
    }

    load(produtos) {
        this.setState({ produtos })
    }

    remove(produtos) {
        axios.delete(`${baseUrl}/${produtos.id}`).then(resp => {
            const list = this.getUpdatedList(produtos, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(produtos =>{
            return (
                <tr key={produtos.id}>
                    <td>{produtos.nome}</td>
                    <td>{produtos.preco}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={()=> this.load(produtos)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                             onClick={()=> this.remove(produtos)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
