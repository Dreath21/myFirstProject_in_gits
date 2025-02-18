import { useState } from 'react'

const Button = ({ onClick, onClick1, current, current1, text, text1 }) => {
  return (
    <>
      <h1>Anecdotes of the day</h1>
      <div>{current}</div>
      <div>has {current1} votes</div>
      <button onClick={onClick1}>{text1}</button>
      <button onClick={onClick}>{text}</button>
      <br />
    </>
  )
}

const MostVotes = ({ maxvote, value }) => {
  return (
    <>
      <h1>Anecdotes with the most votes</h1>
      <div>{value}</div>
      <div>has {maxvote} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const getRandomAnecdotes = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const [vote, setvote] = useState(new Uint16Array(anecdotes.length))

  const addVote = () => {
    const copy = new Uint16Array(vote)
    copy[selected] += 1
    setvote(copy)
  }

  const currentVotes = vote[selected]
  const currentAnecdotes = anecdotes[selected]

  const maxVotes = Math.max(...vote)
  const maxVotesValue = anecdotes[vote.indexOf(maxVotes)]
  return (
    <div>

      <Button onClick={getRandomAnecdotes} current={currentAnecdotes} text="anecdotes" onClick1={addVote} current1={currentVotes} text1="votes" />


      <MostVotes maxvote={maxVotes} value={maxVotesValue} />
    </div>
  )
}

export default App