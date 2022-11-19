import Head from 'next/head'
import axios from 'axios'
import { useAuth } from '../hooks'
import { Field, Form, Formik } from 'formik'
import { makeStyles } from '@material-ui/core'
import Button from '@mui/material/Button'
import { useState } from 'react'

const useStyles = makeStyles({
  container: {
    padding: '0 2rem',
  },
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: '2rem',
    lineHeight: '1.15',
    fontSize: '4rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '800px',
  },
  field: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    '& label': {
      marginRight: '0.5rem',
    },
  },
})

export default function Home() {
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true)
    axios({
      method: 'post',
      url: 'http://127.0.0.1:3000/auth/sign_in',
      data: {
        user: values,
      },
    })
      .then(({ data }) => {
        console.log(data)

        setUser({
          email: 'email@email.com',
          token: data.data.auth_token,
        })
      })
      .catch((response) => {
        console.log(response)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={classes.main}>
        <h1 className={classes.title}>Welcome to trib!</h1>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleLogin}
        >
          <Form className={classes.form}>
            <div className={classes.field}>
              <label htmlFor='email'>Email: </label>
              <Field type='email' name='email' />
            </div>
            <div className={classes.field}>
              <label htmlFor='password'>Password: </label>
              <Field type='password' name='password' />
            </div>
            <Button loading type='submit'>
              Submit
            </Button>
          </Form>
        </Formik>
      </main>
    </div>
  )
}
