import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";


export default class Newscomponent extends Component {
  constructor() {
    //1st run this
    super();
    this.state = {
      articles: [],
      page: 1,
      left_article_to_show: 0,
      loading: true,
      totalresult: 0,
    };
    console.log("in constructur")
  }

  // Update_Fun = () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={process.env.REACT_APP_KEY}&page=${this.state.page}&pageSize=${this.props.page_size}`;
  //   fetch(url)
  //     .then((Response) => {
  //       Response.json()
  //         .then((Response) => {
  //           this.props.setProgress(100)
  //           this.setState({
  //             articles: Response.articles,
  //             loading: false,
  //             totalresult: Response.totalResults,
  //           });
            
  //         })
  //         .catch((Error) => {
  //           console.log(Error);
  //         });
  //     })
  //     .catch((Error) => {
  //       console.log(Error);
  //     });
  // };

componentDidMount() {
    //then 3st run this
    this.props.setProgress(30); //problem because set state is aynchronous thatit
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_KEY}&page=${this.state.page}&pageSize=${this.props.page_size}`;
    fetch(url)
      .then((Response) => {
        Response.json()
          .then((Response) => {
            this.setState({
              articles: Response.articles,
              loading: false,
              totalresult: Response.totalResults,
            });
            this.props.setProgress(100)
          })
          .catch((Error) => {
            console.log(Error);
          });
      })
      .catch((Error) => {
        console.log(Error);
      });
   
   
  }
  componentWillUnmount(){
    
  }

  fetchMoreData = () => {
    this.setState(
      {
        loading: false,
        page: this.state.page+1,
      },
      () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_KEY}&page=${this.state.page}&pageSize=${this.props.page_size}`;
        fetch(url).then((Response) => {
          Response.json().then((Response) => {
            this.setState({
              articles: this.state.articles.concat(Response.articles),
            });
          });
        });
      }
    );
  };

  // handle_pre_click = () => {
  //   console.log("In preclick");
  //   this.setState({
  //     loading: true,
  //     page: this.state.page - 1,
  //     left_article_to_show:
  //       this.state.left_article_to_show + this.props.page_size,
  //   });
  // };

  // handle_next_click = () => {
  //   console.log("In nextclick");
  //   console.log(this.state.page);
  //   this.setState(
  //     {
  //       loading: true,
  //       page: this.state.page + 1,
  //       left_article_to_show:
  //         this.state.left_article_to_show - this.props.page_size,
  //     },
  //     () => {
  //       this.Update_Fun();
  //     }
  //   );
  // };

  render() {
    //then 2st run this
    return (
      
      <div className="container">
        <h2 className="center">Top Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalresult}
          loader={<Spinner/>}
          className="scroll"
        >
        <div className="row container">
          {this.state.loading ? (
            <Spinner/>
          ) : (
            this.state.articles.map((elements) => {
              return (
                <div className="col-md-4" key={elements.url}>
                  <Newsitem
                    url={elements.url}
                    title={elements.title}
                    discription={elements.description}
                    img_url={elements.urlToImage}
                    date={new Date(elements.publishedAt).toGMTString()}
                  />
                </div>
              );
            })
          )}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between mt-3 mb-3">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handle_pre_click}
            className="btn btn-dark"
          >
          Previous
          </button>
          <button
            type="button"
            disabled={this.state.left_article_to_show <= 1}
            onClick={this.handle_next_click}
            className="btn btn-dark"
          >
            Next
          </button>
        </div> */}
      </div>
    );
  }
}
