import { makeStyles } from '@mui/styles'
import React, { useContext } from 'react'
import { SessionContext } from '../Session/context'

const useStyles = makeStyles({
  container: {
    padding: '0 2rem',
  },
})
const Dashboard = () => {
  const classes = useStyles()

  const { sessionState, sessionDispatch } = useContext(SessionContext)
  console.log(sessionState)
  return (
    <div className={classes.container}>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
