import React, { Component } from 'react';
import { Container, Form} from './styles';
import moment from 'moment';
import CompareList from '../../components/CompareList/index';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput:'',
    repositories: [],

  };
  handleAddRepository = async(e) =>{
    e.preventDefault();

    this.setState({loading: true});
    try{
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`)

      repository.lastCommit =moment(repository.pushed_at).fromNow();
      this.setState({
        repositoryInput: '',
        repositories: [... this.state.repositories, repository],
        repositoryError: false,
      });
    }catch (err){
      this.setState({
        repositoryError: true
      });

    }finally{
      this.setState({
        loading: false
      })
    }
  }

  render(){
    return(
      <Container>
        <h1>GIT COMPARE</h1>
        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input type="text" placeholder="Digite um usuario/repositorio" value={this.state.repositoryInput} onChange={e => this.setState({repositoryInput: e.target.value})} />
          <button type="submit">{this.state.loading? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
