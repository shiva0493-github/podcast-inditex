import { useState, useEffect} from 'react'
import Header from '../components/Header'
import PodcastThumbnail from '../components/PodcastThumbnail'
import SearchBar from '../components/SearchBar'
import { Expander } from '../styles/TextImages'

const Homepage = ({podcasts}) => {

    const [loading, setLoading] = useState(true)
    const [end, setEnd] = useState(20)
    const [searchQuery, setSearchQuery] = useState('')

    let feed = podcasts 

    const filterFeed = (feed, query) => {
        let querySensitive = query.toLowerCase()
        if (querySensitive === '') {
            return feed;
        }

        return feed.filter((podcast) => {
            const podcastName = podcast['im:name'].label.toLowerCase();
            const name = podcastName.includes(querySensitive)

            const podcastArtist = podcast['im:artist'].label.toLowerCase();
            const artist = podcastArtist.includes(querySensitive)

            return name || artist;
        });
    };
    const filteredFeed = filterFeed(feed, searchQuery);
   
    
    const expandList =() => {
        setEnd(end + 10 )
    }


    const renderPodcasts = (podcasts) => {
            return (
                podcasts.slice(0,end).map((podcast) =>
                     (  podcast['im:name'].label.length < 30 && <PodcastThumbnail key={podcast.id.attributes['im:id']} 
                        id={podcast.id.attributes['im:id']} 
                        imgSrc={podcast['im:image'][2].label} 
                        title={podcast['im:name'].label} 
                        author={podcast['im:artist'].label}  
                        summary={podcast.summary.label} />)
                        
                   
                )
            )
    }

    useEffect ( () => {
       !podcasts === false && setLoading(false)
    },[podcasts])

    return (
        <div>
            <Header loader={loading} />
            <div style={{marginBottom:'2vh', display:'flex', justifyContent:'flex-end', width:'90%'}}>
                <SearchBar onChange={(e) => setSearchQuery(e)} count={filteredFeed.length}/>
            </div>
            <div style={{width:'90vw', display:'flex', gap:'3vh', flexWrap:'wrap'}}>
                {renderPodcasts(filteredFeed)}
                {end < feed.length && <div style={{position:'relative', marginTop:'10vh', width:'10vw'}}><Expander onClick={expandList} style={{position:'absolute', bottom:'2%'}}>...See More</Expander></div>}
            </div>              
        </div>
    )
}

export default Homepage
