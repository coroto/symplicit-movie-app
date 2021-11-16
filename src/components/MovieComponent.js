import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieComponent = (props) => {
    //console.log (`estos son los props ${JSON.stringify(props)}`)
    const { show } = props.movie;
    let poster  = './blank.jpg'

    if (show.image != null) {
        poster = show.image.medium;
    }

    return(
        <MovieContainer onClick={() => props.onMovieSelect(show.id)}>
        <CoverImage 
            src={poster} alt={show.name}/>
        <MovieName>{show.name}</MovieName>
        <InfoColumn>
            <MovieInfo>language: {show.language}</MovieInfo>
            <MovieInfo>type: {show.type} </MovieInfo>
            
        </InfoColumn>
    </MovieContainer>
    );
}

export default MovieComponent;