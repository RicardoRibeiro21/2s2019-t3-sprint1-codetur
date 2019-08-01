import React, {Component} from 'react';
import './Login.css';
import Axios from '../../../../node_modules/axios';

export default class Login extends Component{
  
  constructor(){
      super();
      this.state = {
          email : '',
          senha : '',
          erroMensagem : '',
          isLoading: false
      }
      
  }

updateState = (event) =>{
  this.setState({[event.target.name] : event.target.value})
}

efetuarLogin = (event) =>{
  
  event.PreventDefault();

  Axios.post("http://localhost:5000/api/",{
    email: this.state.email,
    senha: this.state.senha
  })
  .then(data =>{
    if(data.status === 200){
      localStorage.setItem("usuario-codetur", data.data.token);
      this.props.history.push('/main');
    }
  })
  .catch(erro => {
    this.setState({isLoading : false});
    this.setState({erroMensagem : 'Email ou senha errados'});
  })
}

  render(){
    return (
      <div className="App">
          <form onSubmit={this.efetuarLogin} className='container'>
            <div className='container-head'>
                <h1>CodeTur</h1>
            </div>
            <div className='container-body'>
                <input 
                  placeholder='Inserir login...' 
                  type='text' 
                  className='input'
                  name="email"
                  value={this.state.email}
                  onChange={this.updateState}
                />
                
                <input 
                  placeholder='Senha...' 
                  type='password' 
                  className='input'
                  name="senha"
                  onChange={this.updateState}
                  value={this.state.senha}
                />

                <button 
                  className='btn-primary' 
                  type='submit'
                  {...this.state.isLoading ? 'disabled' : ''}
                >
                {this.state.isLoading ? "Carregando..." : "Entrar"}
                </button>
               
            </div>
        </form>
      </div>
    );
  }
}