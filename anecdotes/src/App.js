import React from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import reducer from './reducer'
import { upvote, addAnecdote } from './actions'

const store = createStore(reducer)

class App extends React.Component {
  constructor() {
    super()
    this.upvote = (anecdote) => store.dispatch({
      type: 'UPVOTE',
      anecdote,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.addAnecdote(this.input.value)
    this.input.value = ''
  }

  render() {
    const anecdotes = this.props.anecdotes.sort((a, b) => a.votes >= b.votes ? -1 : 1)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.upvote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.onSubmit}>
          <div><input ref={input => { this.input = input }}/></div>
          <input type="submit" value="create" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  anecdotes: state.anecdotes
})

const mapDispatchToProps = {
  upvote,
  addAnecdote,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
