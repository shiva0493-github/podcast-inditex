import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { useNavigate } from "react-router";
import PodcastInfo from "../components/PodcastInfo";
import { EpisodeBox, EpisodeRow } from '../styles/Containers'
import { Expander } from '../styles/TextImages'
import Header from "../components/Header";
import { getPodcastDetail } from "../services";
import { CleanText } from "../services";

const PodcastDetail = () => {

    const [loading, setLoading] = useState(true)
    const [end, setEnd] = useState(20)
    const [podcast, setPodcast] = useState('')
    const [summary, setSummary] = useState('')
    const [episodes, setEpisodes] = useState({})

    const {podcastId } = useParams();

    const navigate = useNavigate()

    const expandList =() => {
        setEnd(end + 10 )
    }

    // Formatting Date to the desired format
    const dateFormatter = (date) => {
        return new Date(date).toLocaleDateString('en-UK')
    }

    // Formatting Duration to the desired format
    const durationFormatter = (secs) => {
        const check = secs.match(":")
        if(check){
            return secs
        } else {
            let epTime = new Date(null)
            epTime = new Date(secs * 1000).toISOString().substring(11, 19)
            return epTime
        }
    }

    // Rendering Episodes for the Podcast Detail
    let listEpisodes = []
    const renderEpisodes =  (episodes) => {

        try{
            for( let i = 0; i < episodes.length; i++) {
                const rawTitle =  episodes[i].epTitle
                const title = CleanText(rawTitle)
                const pubDate = episodes[i].epDate
                const date = dateFormatter(pubDate)
                const dur = episodes[i].epDuration
                const duration = dur !== undefined ? durationFormatter(dur) : ""
                listEpisodes.push({"title":title, "date":date, "duration":duration})   
            }
        }catch(error){
            console.error({error})
        }

        return <EpisodeBox>
                <EpisodeRow>
                    <span style={{width:'60%', fontSize:'4vh'}}>Title</span>
                    <span style={{width:'20%', fontSize:'4vh'}}>Date</span>
                    <span style={{width:'20%', fontSize:'4vh'}}>Duration</span>
                </EpisodeRow>
                {listEpisodes.slice(0,end).map((item, index) => 
                (item.title.length < 55 && <EpisodeRow className='episodeHover' key={index} onClick={() => navigate(`/podcast/${podcastId}/episode/${index}`)}>
                        <span style={{color:'#70879e',fontSize:'2vh',padding:'1vh 0vh', width:'60%'}}>{item.title}</span>
                        <span style={{width:'20%', fontSize:'2vh'}}>{item.date}</span>
                        <span style={{width:'20%', fontSize:'2vh'}}>{item.duration}</span>
                </EpisodeRow>))}
            </EpisodeBox>
    }


    useEffect(() => {
        async function fetchData(){
            const response = await getPodcastDetail(podcastId)
            setPodcast(response[0][0].podcast)
            setSummary(response[0][1].summary)
            setEpisodes(response[1])
            setLoading(false)
        }
        fetchData()
        
    }, [podcastId])


    return (
        <>
            <Header loader={loading} />
            <div style={{display:'flex', gap:'2vw'}}>
                <PodcastInfo id={podcastId} artwork={podcast.artworkUrl600} artist={podcast.artistName} collection={podcast.collectionName} summary={summary}/>
                <div style={{width:'60vw', display:'flex', flexDirection:'column', gap:'2vh'}}>
                    <div style={{width:'100%', padding:'2vh 0vh',}} className="shadow"><span style={{marginLeft:'2vh'}}>Episode Count:{podcast.trackCount}</span></div>
                    <div className='shadow'>
                    { episodes ? renderEpisodes(episodes): "Please give us a moment while it loads"}
                    </div>
                    {end < episodes.length && <div style={{position:'relative', marginTop:'10vh', width:'10vw'}}>
                        <Expander className='highlighter' onClick={expandList} style={{position:'absolute', bottom:'2%'}}>...See More</Expander>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default PodcastDetail
