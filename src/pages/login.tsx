import { useContext, useEffect, useState } from 'react'
import GeneralLayout from '@/components/layout/general-layout'
import { UserContext } from '@/components/user'
import { SessionContext } from '@/components/session/context'
import { getSession, saveSession } from '@/components/user/sessions'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(
  {
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
  },
  { name: 'MuiExample_Component' }
)

const Login: React.FC = () => {
  const user = useContext(UserContext)
  console.log(user)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const { sessionDispatch } = useContext(SessionContext)

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
        saveSession({ token: data.data.auth_token, email: values.email }).then(
          () => {
            sessionDispatch({
              type: 'SET_LOGGED_IN',
              loggedIn: true,
              email: values.email,
            })
          }
        )
        window.location.href = '/'
      })
      .catch((response) => {
        console.log(response)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <GeneralLayout>
      <div className={classes.container}>
        <main className={classes.main}>
          <h1 className={classes.title}>Welcome to trib!</h1>

          <Formik
            initialValues={{
              email: 'email@email.com',
              password: 'Password01',
            }}
            onSubmit={handleLogin}
          >
            <Form className={classes.form}>
              <div className={classes.field}>
                <label htmlFor="email">Email: </label>
                <Field type="email" name="email" />
              </div>
              <div className={classes.field}>
                <label htmlFor="password">Password: </label>
                <Field type="password" name="password" />
              </div>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </main>
      </div>
    </GeneralLayout>
  )
}

export default Login
