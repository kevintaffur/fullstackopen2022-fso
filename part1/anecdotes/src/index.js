import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdotes, index, votes }) => (
  <div>
    {anecdotes[index]}
    <br />
    has {votes[index]} votes
  </div>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => new Array(anecdotes.length).fill(0));

  const mostVotes = votes.indexOf(Math.max(...votes));

  const nextAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  }

  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} index={selected} votes={votes} />
      <br />
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdotes={anecdotes} index={mostVotes} votes={votes} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
