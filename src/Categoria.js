import React, { Component } from 'react'
import axios from 'axios'

class Categoria extends Component {

    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            produtos: [],
            categoria: {}
        }
    }

    loadData(id){
        axios
            .get('http://localhost:3001/produtos?categoria=' + id)
            .then( res => {
                this.setState({
                    produtos: res.data
                })
            })

        axios
            .get('http://localhost:3001/categorias/' + id)
            .then( res => {
                this.setState({
                    categoria: res.data
                })
            })
    }

    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps){
        this.loadData(newProps.match.params.catId)
        console.log()
    }

    renderproduto(produto){
        return(
            <p className='alert alert-info' key={produto.id} > {produto.produto} </p>
        )
    }

    render(){
        return (
            <div>
                <h1> Categoria {this.state.categoria.categoria}</h1>
                {this.state.produtos.map(this.renderproduto)}
            </div>
        )
    }
}

export default Categoria