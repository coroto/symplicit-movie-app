import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;

const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    const { selectedMovie } = props;

    useEffect(() => {
        axios
        .get(`https://api.tvmaze.com/shows/${selectedMovie}`,
        ).then((response) => setMovieInfo(response.data));
      }, [selectedMovie]);

  return <Container>
    <InfoColumn> 
        <MovieName> Movie: {movieInfo?.name}</MovieName>
        <MovieInfo>type:{movieInfo?.type}</MovieInfo>
        <MovieInfo>language:{movieInfo?.language}</MovieInfo>
        <MovieInfo>summary:{movieInfo?.summary}</MovieInfo>
    </InfoColumn>
    <Close>X</Close>
  </Container> ;
};

export default MovieInfoComponent;