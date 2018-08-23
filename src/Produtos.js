import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

class Produtos extends Component {

    constructor(props){
        super(props)
        this.handleNovaCategoria = this.handleNovaCategoria.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)

        this.state = {
            editingCategoria: ''
        }
    }

    componentDidMount(){
        this.props.loadCategorias()
    }

    editCategoria(categoria){
        this.setState({
            editingCategoria: categoria.id
        })
    }

    cancelEditing(){
        this.setState({
            editingCategoria: ''
        })
    }

    renderCategoria(cat){
        return ( 
            <li key={cat.id}>
                { this.state.editingCategoria === cat.id && <div className='input-group'>
                    <div className='input-group-btn'>
                        <input className='form-control' type='text' defaultValue={cat.categoria} 
                            onKeyUp={this.handleEditCategoria} ref={'cat' + cat.id}/>
                        <button className='btn' onClick={this.cancelEditing}>Cancelar</button>
                    </div>
                </div> }
                { this.state.editingCategoria !== cat.id && <div>
                    <button className='btn btn-sm' onClick={ () => this.props.removeCategoria(cat)}>
                        <span className='glyphicon glyphicon-remove'></span>
                    </button>
                    <button className='btn btn-sm' onClick={ () => this.props.editCategoria(cat)}>
                        <span className='glyphicon glyphicon-pencil'></span>
                    </button>
                    <Link to={`/produtos/categoria/${cat.id}`}> {cat.categoria} </Link>
                </div> }
            </li>
        )
    }

    handleNovaCategoria(key){
        if(key.keyCode === 13){
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }

    handleEditCategoria(key){
        if(key.keyCode === 13){
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }

    render(){

        const {match, categorias} = this.props

        return(
            <div className='row'>
                <div className='col-md-3'>
                    <h3> Link para categorias </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categorias.map( this.renderCategoria )}
                    </ul>
                    <div className='alert alert-info'>
                        <input className='form-control' type='text' ref='categoria' placeholder='Nova categoria'
                            onKeyUp={this.handleNovaCategoria}/>
                    </div> 
                </div>
                <div className='col-md-9'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}

export default Produtos