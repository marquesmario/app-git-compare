import React, { Component } from 'react';
import { Container, Form} from './styles';
import CompareList from '../../components/CompareList/index'
import api from '../../services/api';

export default class Main extends Component {
  state = {
    repositoryInput:'',
    repositories: [],

  };
  handleAddRepository = async(e) =>{
    e.preventDefault();

    try{
      const response = await api.get(`/repos/${this.state.repositoryInput}`)

      this.setState({
        repositoryInput: '',
        repositories: [... this.state.repositories, response.data],
      });
    }catch (err){
      console.log(err);
    }
  }

  render(){
    return(
      <Container>
        <h1>GIT COMPARE</h1>
        <Form onSubmit={this.handleAddRepository}>
          <input type="text" placeholder="Digite um usuario/repositorio" value={this.state.repositoryInput} onChange={e => this.setState({repositoryInput: e.target.value})} />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
