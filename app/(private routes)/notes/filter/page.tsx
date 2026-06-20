import { redirect } from 'next/navigation'

const RedirectPage = () => {
  redirect('/notes/filter/all')
}

export default RedirectPage