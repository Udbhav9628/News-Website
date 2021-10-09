import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";

export default class Newscomponent extends Component {
  constructor() {
    //1st run this
    super();
    this.state = {
      articles: [],
      page: 1,
      left_article_to_show: 0,
      loading: true,
    };
  }

  Update_Fun = async () => {
    console.log("In Update");
    console.log(this.state.page);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a1ebd7a1a80f4214a937f33d187d623e&page=${this.state.page}&pageSize=${this.props.page_size}`;
    let data = await fetch(url);
    var parse_data = await data.json();
    this.setState({
      articles: parse_data.articles,
      loading: false,
    });
  };

  async componentDidMount() {
    //then 3st run this
    console.log("in mount");
    this.Update_Fun();
    this.setState({
      left_article_to_show: 38 - this.props.page_size,
      page: this.state.page - 1,
    });
  }

  handle_pre_click = async () => {
    this.setState({
      loading: true,
      page: (this.state.page - 1),
      left_article_to_show:
        this.state.left_article_to_show + this.props.page_size,
    });
    this.Update_Fun();
  };

  handle_next_click = async () => {
    console.log("In nextclick");
    console.log(this.state.page);
    this.setState({
      loading: true,
      page: 2,
      left_article_to_show:
        this.state.left_article_to_show - this.props.page_size,
    });
    console.log(this.state.loading);
    console.log("In next before caling");
    console.log(this.state.page);
    this.Update_Fun();
    
  };

  render() {
    //then 2st run this

    return (
      <div className="container">
        <h2 className="center">Top Headlines</h2>
        <div className="row">
          {this.state.loading ? (
            <Spinner />
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
        <div className="container d-flex justify-content-between mt-3 mb-3">
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
        </div>
      </div>
    );
  }
}
