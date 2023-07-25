import axios from "axios";


// Check Time Lapse

export const TimeLapse = () => {

    let today = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)
    let yesterday = JSON.parse(localStorage.getItem('DateAPI'));
   
    return (today === yesterday)
}

// Podcast Feed
export const getPodcasts = async () => {

    if(TimeLapse()){
        let podcastsList = JSON.parse(localStorage.getItem('Podcasts'));
        return podcastsList
    } else {
        try{
            const list = await axios.get(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)
            const podcasts = list.data.feed.entry
            localStorage.setItem('Podcasts', JSON.stringify(podcasts))
            let current = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)
            localStorage.setItem('DateAPI', JSON.stringify(current));
            return podcasts
        } catch(err){
            console.log({err})
            return []
        }
    }      
}


// To check if podcast already exists in storage
const checkPodcastId = (id) => {

    let podcast = JSON.parse(localStorage.getItem(id));

    if(podcast){
        return true
    } else {
        return false
    }
}

// API to get the Postcast Detail
export const podcastDetail = async (id) => {

    const parser = new DOMParser();
    const baseURL = `https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id=${id}`

    let podcastDetail = []
    let episodelist = []

    try {
        const response = await axios.get(baseURL)
        podcastDetail.push({"podcast":response.data.results[0]})   
        const response2 = await axios.get(`https://cors-anywhere.herokuapp.com/${response.data.results[0].feedUrl}`)
        const xmlDoc = parser.parseFromString(response2.data,"text/xml");
        podcastDetail.push({"summary":xmlDoc.getElementsByTagName('description')[0].innerHTML})   

        let items = xmlDoc.getElementsByTagName('item')

        for (var i = 0; i < items.length -1; i++){
          
            let epTitle = items[i].getElementsByTagName('title')[0]?.innerHTML  || "NO TITLE"
            let epDate = items[i].getElementsByTagName('pubDate')[0]?.innerHTML || "Thu, 29 Feb 2024 04:00:00 -0000"
            let epDuration = items[i].getElementsByTagName('itunes:duration')[0]?.innerHTML || "3950"
            let epDescription = items[i].getElementsByTagName('description')[0]?.innerHTML || "No Description"
            let epLink = items[i].getElementsByTagName('enclosure')[0]?.attributes.getNamedItem('url').value || 'No Link'
            let epLinkType = items[i].getElementsByTagName('enclosure')[0]?.attributes.getNamedItem('type').value || 'No Link Type'
           
              let epDetail = {epTitle, epDate, epDuration, epDescription, epLink, epLinkType}
              episodelist.push(epDetail)
        }
        localStorage.setItem("list"+id, JSON.stringify(episodelist))
        localStorage.setItem(id, JSON.stringify(podcastDetail))
        let current = new Date().toLocaleString({timeZone:"Europe/Madrid"}).substring(0, 10)
        localStorage.setItem('DateAPI', JSON.stringify(current));

        return [podcastDetail, episodelist]

    } catch (error) {
        console.error({error})
    }
}

// FUNCTION to get the Podcast Detail either from the API or from local storage with TIME LAPSE CHECK
export const getPodcastDetail = async (id) => {

    if(!checkPodcastId(id)){
        const response = await podcastDetail(id)
        console.log({response})
        return response
    } else {
        if(TimeLapse()){
            let podcastDetail = JSON.parse(localStorage.getItem(id));
            let episodelist = JSON.parse(localStorage.getItem('list'+id));
            return [podcastDetail, episodelist]
        }else{
            const response = await podcastDetail(id)
            return response
        }
    }
} 


// FUNCTION TO REMOVE cDATA
export const CleanText = (text) => {
    let x = text.replace("<![CDATA[", "").replace("]]>", "");
    return x
}   