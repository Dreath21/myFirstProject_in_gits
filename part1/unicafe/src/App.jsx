import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const Statistics = ({ total, clicks, good, neutral, bad }) => {
  console.log(total)
  if (clicks.length === 0) {
    return (
      <p><b>No feedback given</b></p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" args={good} />
        <StatisticLine text="Neutral" args={neutral} />
        <StatisticLine text="Bad" args={bad} />
        <StatisticLine text="All" args={good + neutral + bad} />
        <StatisticLine text="Average" args={(good - bad) / total} />
        <StatisticLine text="Positive" args={parseFloat(good / total) * 100 + " %"} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, args }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{args}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [total, setTotal] = useState(0);
  const [clicks, setClicks] = useState([]);

  const handleGoodClicks = () => {
    console.log("Good Clicks")
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + bad + neutral)
    setClicks(clicks.concat('G'))
  }
  const handleNeutralClicks = () => {
    console.log("Neutral Clicks")
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + bad + good)
    setClicks(clicks.concat('N'))
  }
  const handleBadClicks = () => {
    console.log("Bad Clicks")
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(neutral + updatedBad + good)
    setClicks(clicks.concat('B'))
  }
  console.log(clicks.length)
  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClicks} text="good" />
      <Button onClick={handleNeutralClicks} text="neutral" />
      <Button onClick={handleBadClicks} text="bad" />
      <h1>Statistics</h1>
      <Statistics total={total} clicks={clicks} good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App
