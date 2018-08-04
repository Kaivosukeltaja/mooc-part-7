const upvote = anecdote => ({
  type: 'UPVOTE',
  anecdote,
})

const addAnecdote = text => ({
  type: 'ADD',
  text,
})

export { upvote, addAnecdote }
