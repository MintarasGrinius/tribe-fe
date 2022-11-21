import { useContext, useEffect, useState } from 'react'
import GeneralLayout from './general-layout'

interface Props {
  title?: string
  description?: string
  children: JSX.Element | JSX.Element[]
}

const Layout: React.FC<Props> = ({ children, title, description }: Props) => {
  return (
    <GeneralLayout description={description} title={title}>
      {children}
    </GeneralLayout>
  )
}

export default Layout
