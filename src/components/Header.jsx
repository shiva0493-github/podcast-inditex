import { useNavigate } from 'react-router'
import { HeaderTitle } from '../styles/TextImages'
import disc from "../assets/disc_loader.png"

const Header = ({loader}) => {

    const navigate = useNavigate()

    return (
        <div style={{ width:'90%', position:'relative'}}>
            <HeaderTitle onClick={ () => navigate('/')}>Podcaster</HeaderTitle>
            {loader && <img style={{position:'absolute', right:'0', top:'5%', animation:'spin 2s linear infinite'}} src={disc} alt="img" height='40vh' width='auto' />}
            <hr />
        </div>
    )
}

export default Header
