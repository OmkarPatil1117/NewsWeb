import React, { useEffect, useState } from 'react'
import Newsitems from './Newsitems';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles,setarticles] = useState([])
    //const [loading,setloading] = useState(true)
    const [page,setpage] = useState(1)
    const [totalResults,settotalResults] = useState(0)

     const capitalChar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalChar(props.category)} - speedyNews`;

    

    const updateNews = async (pageNo) => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        //loading()
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults)
        //setloading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
         // eslint-disable-next-line
    }, [])
    
/*     const handleNextclick = async() => {
        console.log("Clcked");
        setpage(page + 1);
        updateNews();
    }

    const handlePrevioustclick = async() => {
        setpage(page - 1);
        updateNews();
    } */
    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setarticles(articles.concat( parsedData.articles))
        settotalResults(parsedData.totalResults)
        };
        return (
            <>
            <h1 className='text-center ' style={{margin : '40px', marginTop : '90px'}}>speedyNews - Top headlines</h1>
                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={ articles !== totalResults}
                loader={<Spinner/>}
                >
            <div className="container">
            {/* {this.state.loading && <Spinner/> */}
            <div className="row">
            {/* !this.state.loading && */ articles.map(function(element) {
                return <div className="col-md-4 my-3" key={element.url}>
                    <Newsitems  title={element.title? element.title:"" } description={element.description? element.description:""} imgagrUrl={element.urlToImage? element.urlToImage : "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/07/iPhone-tomando-foto-scaled.jpg?fit=2560%2C1440&quality=50&strip=all&ssl=1"}  newUrl={element.url} date={element.publishedAt.slice(0,10)} author={element.author}/>
                    </div>
                
            })}
            </div>
            </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevioustclick} > &larr; Previous</button>
            <button disabled={this.state.page + 1 >  Math.ceil( this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick} >Next &rarr;</button>
            </div> */}
        </>
        )
    }              
        


News.defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'

}
News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
}


export default News
