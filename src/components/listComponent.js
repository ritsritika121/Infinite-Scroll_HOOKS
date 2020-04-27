import React, { useState, useEffect } from "react";
import axios from "axios";
import useInfiniteScroll from "./useInfinitescroll"
import SearchBar from "./SearchBar"

const Article = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const [isFetching, setIsFetching] = useInfiniteScroll(moreData);
  const [hasMore, setHasMore] = useState(true)

  const loadData = () =>{
    let url = `https://medrum.herokuapp.com/feeds/?source=5718e53e7a84fb1901e05971&page=${page}&sort=latest&limit=${pageLimit}`;
    axios.get(url).then(res => {
        if(hasMore){
            setData(res.data);
        }
    });
    setHasMore(data.length < 100)
  }
  function moreData() {
    let url = `https://medrum.herokuapp.com/feeds/?source=5718e53e7a84fb1901e05971&page=${page}&sort=latest&limit=${pageLimit}`;
    axios.get(url).then(res => {
        if(hasMore){
            setData([...data, ...res.data]);
            setPage(page+1)
            setIsFetching(false)
            setHasMore(data.length < 100)
        }
        setIsFetching(false)
    });
  }

 const onSearch = (value) => {
    console.log("ONSEARCH---->", value)
    // setIsFetching(true)
    const listData = data && data.length >0 && data.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(listData)
    // setIsFetching(false)
    console.log("DATA--->", listData)
    if(value == ""){
        loadData()
    }
}
  
  useEffect(()=>{
    loadData()
  }, [])

  if (data.length==0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
    {isFetching ? null : <SearchBar onSearch={onSearch} />}
      <div className="list-group-ul">
        {data && data.length > 0 && data.map((article, key) => (
          <div className="list-group-li" key={key} style={{margin:"20px 30px", padding:"37px 20px", border:"2px solid"}}>
            <a href={article.url} target="_blank">
              {article.title}
            </a>
          </div>
        ))}
        {isFetching && hasMore && "FETCHING MORE ITEMS..."}
        {hasMore ? null : <div><h2>YOU REACH THE END...!</h2></div>}
      </div>
    </>
  );
};

export default Article;
