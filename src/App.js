import React, { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import axios from "axios";
import MovieInfoComponent from "./components/MovieInfoComponent";



const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: darkslategrey;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;


function App() {

const [searchQuery, updateSearchQuery] = useState("");
const [timeoutId, updateTimeoutId] = useState();
const [movieList, updateMovieList] = useState([]);
const [selectedMovie, onMovieSelect] = useState();
  
const fetchData = async (searchString)=> {
 const response =  await axios.get(`https://api.tvmaze.com/search/shows?q=${searchString}`);
  updateMovieList(response.data);
}

const onTextChange = (e)=>{
  clearTimeout(timeoutId);
  updateSearchQuery(e.target.value);
  const timeout = setTimeout(()=> fetchData(e.target.value), 500)
  updateTimeoutId(timeout);
}
  return (
  <Container> 
    <Header> 
      <Logo>Symplicit Movie App</Logo>
      <SearchBox>
        <SearchIcon src='/search-icon.svg'/>
        <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
      </SearchBox>
    </Header>
    
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}

    <MovieListContainer>
      {
        movieList?.length
          ? movieList.map((movie, index)=>(
            <MovieComponent 
              key={index} 
              movie={movie} 
              onMovieSelect={onMovieSelect}
            />
          )) 
        :"No Found Movie"
      }
    </MovieListContainer>
  </Container>
  );
}

export default App;
