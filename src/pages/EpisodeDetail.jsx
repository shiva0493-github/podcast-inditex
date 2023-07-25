import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router";
import { DetailBox} from '../styles/Containers'
import PodcastInfo from "../components/PodcastInfo";
import { CleanText } from "../services";

const EpisodeDetail = () => {

    let podcastDetail = {}
    let episodeList = {}

    const [loading, setLoading] = useState(true)
    const {podcastId, episodeId } = useParams()

    const [podcast, setPodcast] = useState('')
    const [summary, setSummary] = useState('')
    const [epTitle, setEpTitle] = useState('')
    const [epDescription, setEpDescription] = useState('')
    const [epLink, setEpLink] = useState('')
    const [epLinkType, setEpLinkType] = useState('')

    const getEpisodeDetail = async (list) => {
        let episode = list[episodeId]
        setEpTitle(episode.epTitle)
        setEpDescription(CleanText(episode.epDescription))
        setEpLink(episode.epLink)
        setEpLinkType(episode.epLinkType)
    } 

    useEffect(() => {

        // Taking the information of Each Episode from local storage
        podcastDetail = JSON.parse(localStorage.getItem(podcastId));
        episodeList = JSON.parse(localStorage.getItem('list'+ podcastId));
        setPodcast(podcastDetail[0].podcast)
        setSummary(podcastDetail[1].summary)
        getEpisodeDetail(episodeList)
        setLoading(false)
    }, [epLink])

    return (
        <>
            <Header loader={loading}  />
            <div style={{display:'flex', gap:'5vw'}}>
                <PodcastInfo id={podcastId} artwork={podcast.artworkUrl600} artist={podcast.artistName} collection={podcast.collectionName} summary={summary}/>
                <DetailBox className='shadow' style={{width:'60%', gap:'4vh', alignItems:'flex-start'}}>
                    <span style={{fontSize:'3vh', fontWeight:'bold'}}>{epTitle}</span>
                    <span style={{fontSize:'2vh', fontStyle:'italic'}} dangerouslySetInnerHTML={{__html: epDescription}} />
                   { epLink &&  <audio controls>
                        <source src={epLink} type={epLinkType} />
                    </audio>}
                </DetailBox>
            </div>
        </>
    )
}

export default EpisodeDetail
