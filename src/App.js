import React, { Component } from 'react'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {

  constructor(props){
    super(props)

    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)

    this.state = {
      categorias:[]
    }
  }

  loadCategorias(){
    this.props.api.loadCategorias()
        .then( res => {
            this.setState({
                categorias: res.data
            })
        })
  }

  createCategoria(categoria){
    this.props.api.createCategoria(categoria)
      .then( res => {
        this.loadCategorias()
    })
  }

  editCategoria(categoria){
    this.props.api.editCategoria(categoria)
      .then( res => {
        this.loadCategorias()
    })
  }

  removeCategoria(cat){
    this.props.api.deleteCategoria(cat.id)
        .then( res => {
            this.loadCategorias()
        })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>Gerenciador de Produtos</a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>  
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route path='/Produtos' render={(props) => {
              return (<Produtos
                {...props}
                loadCategorias = {this.loadCategorias} 
                removeCategoria = {this.removeCategoria}
                createCategoria = {this.createCategoria}
                editCategoria = {this.editCategoria}
                categorias = {this.state.categorias}
              />)
            }} />
            <Route exact path='/sobre' component={Sobre} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
