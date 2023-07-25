import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";

// API CALL
import { getPodcasts } from "./services";

// Pages Desktop
import Homepage from "./pages/Homepage";
import PodcastDetail from "./pages/PodcastDetail";
import EpisodeDetail from "./pages/EpisodeDetail";

function App() {

  const [podcasts, setPodcasts] = useState([])
  
  useEffect(() => {
    async function fetchData(){
      const response = await getPodcasts()
      setPodcasts(response)
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage podcasts={podcasts} />}  />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />}  />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />}  />
      </Routes>
    </div>
  );
}

export default App;
