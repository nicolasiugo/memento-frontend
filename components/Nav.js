import Link from 'next/link';
import NavStyles from './styles/NavStyles'
const Nav = () => (
  <NavStyles>
    <Link href="/">
      <a>Study</a>
    </Link>
    <Link href="/add_card">
      <a>Add</a>
    </Link>
  </NavStyles>
)

export default Nav;