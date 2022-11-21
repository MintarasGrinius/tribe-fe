import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import HeadSection from '../head-section'

const useStyles = makeStyles({
  container: {
    position: 'relative',
  },
})
interface Props {
  title?: string
  description?: string
  keywords?: string
  noHeader?: boolean
  noFooter?: boolean
  noIndex?: boolean
  noFollow?: boolean
  noOverflow?: boolean
  children: JSX.Element | JSX.Element[]
  logoText?: string
  logoTextLink?: string
  customPromoBarContent?: {
    statement: string
    buttonText: string
    mobileStatement: string
  }
}

const GeneralLayout: React.FC<Props> = ({
  title,
  description,
  keywords,
  noHeader,
  noFooter,
  noIndex,
  noFollow,
  noOverflow,
  children,
  logoText,
  logoTextLink,
  customPromoBarContent,
}: Props) => {
  const classes = useStyles()
  const [promoBarElementOffSet, setPromoBarElementOffSet] = useState(0)

  useEffect(() => {
    const promoBarElement = document.getElementById('promo-bar')
    promoBarElement && setPromoBarElementOffSet(promoBarElement.offsetHeight)
  }, [])

  return (
    <>
      <HeadSection
        description={description}
        keywords={keywords}
        noFollow={noFollow}
        noFooter={noFooter}
        noHeader={noHeader}
        noIndex={noIndex}
        noOverflow={noOverflow}
        title={title}
      />
      <div
        className={classes.container}
        id="page-container"
        style={{ top: promoBarElementOffSet }}
      >
        {children}
      </div>
    </>
  )
}

export default GeneralLayout
