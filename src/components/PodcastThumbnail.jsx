import {  useParams, useNavigate } from 'react-router'
import { Thumbnail, TextBox } from '../styles/Containers'
import { ThumbnailImg, ThumbnailText } from '../styles/TextImages'
import { useEffect, useState } from 'react'

const PodcastThumbnail = ({ id, imgSrc, title, author, summary}) => {

    const navigate = useNavigate()

    const { podcastId } = useParams();

    const clickHandler = () => {
        navigate(`/podcast/${id}`)
    }


    return (
        <Thumbnail onClick={clickHandler}>
            <ThumbnailImg id={id} src={imgSrc} style={{position:'relative', zIndex:'2'}}/>
            <TextBox style={{marginTop:'-25%'}}>
                    <ThumbnailText style={{fontWeight:'bold',bottom:'30%' }}>{title || 'No Title'}</ThumbnailText>
                    <ThumbnailText style={{bottom:'8%'}}>Author: {author || 'No Author'}</ThumbnailText>
                 { podcastId && <ThumbnailText style={{bottom:'8%'}}>{summary}</ThumbnailText>}
            </TextBox>
        </Thumbnail>
    )
}

export default PodcastThumbnail
