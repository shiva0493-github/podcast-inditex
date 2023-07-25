import { useState, useEffect} from 'react';
import { SearchInput } from '../styles/TextImages';

const SearchBar = ({onChange, count}) => {

    const [searchQuery, setSearchQuery] = useState('')

    useEffect (() => {
        if(onChange !== undefined){
            onChange(searchQuery)
        }
    },[onChange, searchQuery])

    return (
       <div>
            <span style={{padding:'1vh',fontSize:'2.5vh', color:'white', backgroundColor:'#70879e',borderRadius:'1vh'}}>{count}</span>&nbsp;
            <SearchInput
                type="text"
                id="header-search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filter Podcasts"
            />
        </div>
    )
}

export default SearchBar


