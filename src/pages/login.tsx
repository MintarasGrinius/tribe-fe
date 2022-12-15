import { useContext, useEffect, useState } from 'react'
import {
  Button,
  makeStyles,
  TextField,
  ButtonProps,
  styled,
} from '@material-ui/core'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { get } from 'js-cookie'
import GeneralLayout from '@/components/layout/general-layout'
import { UserContext } from '@/components/user'
import { SessionContext } from '@/components/session/context'
import { saveSession } from '@/components/user/sessions'
import { login } from 'utils/auth.server'
import { prisma } from 'utils/prisma.server'

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#fff',
  backgroundColor: '#1a73e8',
  '&:hover': {
    backgroundColor: '#1c7eff',
  },
}))

const useStyles = makeStyles(
  {
    container: {
      padding: '0 2rem',
      background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))',
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
      '& b': {
        background:
          'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
        '-webkit-text-fill-color': 'transparent',
        '-webkit-background-clip': 'text',
        'background-clip': 'text',
      },
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
        margin: 'auto 0',
      },
    },
    textField: {
      borderColor: 'white',
      borderImage:
        'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',

      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(26, 115, 232)',
      },
      '&:hover': {
        borderColor: '#3f51b5 !important',
      },
      '& input': {
        color: '#7F88A0',
        height: '10px',
      },
    },
  },
  { name: 'MuiExample_Component' }
)

const Login: React.FC = ({ token }) => {
  const user = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()
  const { sessionDispatch } = useContext(SessionContext)
  console.log(token)

  useEffect(() => {
    axios.get('http://localhost:5678/api/user').then((res) => {
      console.log(res)
    })
  })

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true)
    // axios({
    //   method: 'post',
    //   url: 'http://127.0.0.1:3000/auth/sign_in',
    //   data: {
    //     user: values,
    //   },
    // })
    //   .then(({ data }) => {
    //     saveSession({ token: data.data.auth_token, email: values.email }).then(
    //       () => {
    //         sessionDispatch({
    //           type: 'SET_LOGGED_IN',
    //           loggedIn: true,
    //           email: values.email,
    //         })
    //       }
    //     )
    //     window.location.href = '/'
    //   })
    //   .catch((response) => {
    //     console.log(response)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //   })
  }
  return (
    <GeneralLayout>
      <div className={classes.container}>
        <main className={classes.main}>
          <h1 className={classes.title}>
            Welcome to <b>trib</b>!
          </h1>

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
                <TextField
                  classes={{ root: classes.textField }}
                  name="email"
                  size="small"
                  type="email"
                  variant="outlined"
                />
              </div>
              <div className={classes.field}>
                <label htmlFor="password">Password: </label>
                <TextField
                  classes={{ root: classes.textField }}
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                />
              </div>
              <ColorButton
                color="linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))"
                type="submit"
                variant="contained"
              >
                Submit
              </ColorButton>
            </Form>
          </Formik>
        </main>
      </div>
    </GeneralLayout>
  )
}

export default Login
