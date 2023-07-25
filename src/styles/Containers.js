import styled from "styled-components";


//Home Page

export const Thumbnail = styled.div`
    height:35vh; 
    width:20vw; 
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    :hover{
        cursor: pointer;
    }
`

export const TextBox = styled.div`
    border-radius: 1vh;
    height: 1000px;
    width:20vw; 
    border:none;
    box-shadow: 0px 2px 10px 1px grey;
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content:bottom;
    text-align: center;
    gap:2vh;    

    :hover {
        
        box-shadow:0px 2px 10px 1px black ;
    }
`

// Detail Page

export const DetailBox = styled.div`
    border-radius: 1vh;
    height: fit-content;
    width:20vw; 
    padding:3vh;
    border:none;
    position:relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content:bottom;  
`

export const ShadowBox = styled.div`
    border-radius: 1vh;
    height: 50vh;
    width:20vw; 
    border:none;

`

export const EpisodeBox = styled.div`
    width:96%; 
    padding:2vh;
`
export const EpisodeRow = styled.div`
    height:7vh; 
    border-bottom: 1px solid grey;
    padding:0.5vh 1vh;
    display:flex; 
    align-items:space-around;
    gap:2vw;
    cursor: default;
`
