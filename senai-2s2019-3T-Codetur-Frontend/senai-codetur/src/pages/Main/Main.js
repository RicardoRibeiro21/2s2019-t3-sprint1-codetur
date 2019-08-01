import React,{Component} from 'react'
import './Main.css';

const initialState = {
    id: '',
    nome_pacote: '',
    status_pacote: '',
    preco_pacote: '',
    data_inicio: '',
    data_fim: '',
    descricao_pacote: '',
    imagem: ''
}

export default class Main extends Component{ 
    constructor(){
        super();
        this.state = {
            pacotes: [],            
            pacoteAtual: {
               ...initialState
            }
        }
    }



    updateField = (event) => {
        let pacoteAtual = this.state.pacoteAtual
        //Caso esteja mexendo com o campo status pacote, que está dentro de uma tag select
        if(event.target.name === 'status_pacote')
        {
            event.targe.value == 'ativado' ?
            pacoteAtual[event.target.name] = true
            :
            pacoteAtual[event.target.name] = false            
        }
        else{
            pacoteAtual = {[event.target.name] : event.target.value};

    }
    this.setState({pacoteAtual})
    }

    cadastro = (event) => 
    {
        event.preventDefault();

        const novo_pacote = this.state.pacoteAtual;
        //Se o pacote tiver um Id, irá ser num update
        if(novo_pacote.id){
            applicationCache.call(`pacotes/${novo_pacote.id}`)
            .update(novo_pacote)
            .then(resp => {

            })
            
        }
        else{

            api
            .call('pacotes')
            .create(novo_pacote)
            .then(resp => {
                //Quando cadastrar, a lista de pacote será atualizada
                const pacotes =this.listaAtualizada(resp.data)

                this.setState({
                    pacoteAtual: initialState,
                    pacotes
                })
            })
        }
    }


    listaAtualizada = (novo_pacote, add = true) => {
        //Por padrão o retorno do filter é um array
        const pkt = this.state.pacotes.filter( element => element.id !== novo_pacote.id);
        if(add){
        //Empurra para lista em primeira lugar o pacote cadastrado
            pkt.unshift(novo_pacote);
        }
                
        this.clear();
        return pkt;
    }
    //Limpando os dados, botão cancelar
    clear = () => {
        //Setando para o estado inicial sem valores
        this.setState({pacoteAtual: {...initialState}});
    }

    render(){
        return(
            <div className='App2'>
                <div className='container'>
                    <div className='container-head'>
                        <h2>Cadastrar evento</h2>
                    </div>

                    <form onSubmit={this.cadastro} className='container-body'>
                        <input 
                            className='input' 
                            placeholder={'Nome do evento...'} 
                            type='text' 
                            name='nome_pacote' 
                            value= {this.state.nome_pacote}
                          onChange = {this.updateField}  
                        />
                        
                        <div style={{display: 'flex'}}>
                            
                            <input 
                                className='input' 
                                placeholder={'Preço do evento...'} 
                                type='text' 
                                name='preco_pacote' 
                                onChange={this.updateField}
                                value={this.state.preco_pacote}

                            />

                            <div style={{margin: '1.5%'}}>
                                <label style={{fontSize: '10pt', display: 'flex', justifyContent: 'center'}}>Data inicio pacote</label>
                               
                                <input 
                                    className='input'  
                                    type='date' 
                                    name='data_inicio' 
                                    onChange={this.updateField}
                                    value={this.state.data_inicio}     
                                />

                            </div>
                            <div style={{margin: '1.5%'}}>
                                <label style={{fontSize: '10pt', display: 'flex', justifyContent: 'center'}}>Data fim pacote</label>
                                
                                <input 
                                    className='input'  
                                    type='date' 
                                    name='data_fim' 
                                    value={this.state.data_fim}
                                    onChange={this.updateField}

                                />
                            </div>
                        </div>

                        
                        <input 
                            className='input'  
                            type='text' 
                            name='imagem' 
                            placeholder='URL imagem'
                            onChange={this.updateField}
                            value={this.state.imagem}
                        />

                        <select 
                            className='select'
                            name='status_pacote'
                              onChange={this.updateField}
                              value={this.state.status_pacote}
                        >
                            <option value='' defaultValue disabled>Selecione o status de pacote...</option>
                            <option value='ativado'>Ativado</option>                            
                            <option value='desativado'>Desativado</option>
                        </select>

                        <textarea 
                            className='textarea' 
                            name='descricao_pacote' 
                            placeholder='Descrição...' 
                            cols='5' 
                            rows='5'
                             onChange={this.updateField}
                             value={this.state.descricao_pacote}
                        ></textarea>
                        
                        <button className='btn-primary' type='submit'>Cadastrar</button>
                        <button onClick = {this.clear} className='btn-secondary' type='button' >Cancelar</button>
                    </form>
                </div>

                <div className='container'>
                    <div className='container-head'>
                        <h2>Todos os pacotes</h2>
                    </div>
                    <div className='container-body'>
                        
                    </div>
                </div>
            </div>
        );
    }
}