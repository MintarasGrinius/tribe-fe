import { PlannedEvent } from '@/components/card'
import Layout from '@/components/layout'
import { UserContext } from '@/components/user'
import { authHeaders, backURL } from '@/components/user/env'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { makeStyles } from '@material-ui/core'
import Sidebar from '@/components/sidebar'

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
    padding: '1rem',
  },
})

const Planned = () => {
  const classes = useStyles()

  return (
    <Layout description={'Descriptions page'} title={'Descriptions'}>
      <div className={classes.container}>
        <Sidebar />
      </div>
    </Layout>
  )
}

export default Planned
