import { useEffect, useState } from 'react'
import { DetailBox } from '../styles/Containers'
import { useNavigate } from 'react-router'
import { CleanText } from "../services";


const PodcastInfo = ({id, artwork, collection, artist, summary}) => {

    const navigate = useNavigate()
    const [description, setDescription] = useState('')

    const clickHandler = () => {
        navigate(`/podcast/${id}`)
    }

    useEffect( () => {
       setDescription(CleanText(summary))
    },[summary])

    return (
        <DetailBox className="shadow">
                <img className='pointer' src={artwork} width='80%'  height='auto' alt='Podcast' onClick={clickHandler} />
                <hr style={{ borderTop:'0.2px solid rgba(0,0,0,0.2)', width:'100%'}} />    
                <span className='pointer' onClick={clickHandler}> {collection}</span>
                <span className='pointer' onClick={clickHandler}> By {artist}</span>
                <hr style={{ borderTop:'0.2px solid #ca9b9b33', width:'100%'}} />
                <div>
                    Description:<br />
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
        </DetailBox>
    )
}

export default PodcastInfo
