import './App.css';
import React from 'react';
import NavBar from "./Component/nav"
import Content from "./Component/content"
import Footer from "./Component/footer"

const apiToken = "ad0a28ebac46f9277f05362512d20722";//api token to fetch news from sever

//The top component represent the hold website
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {//state consist of an "article list" and a "search" variable 
      aricleList: [],//article list that hold all articles to display on the screen
      searching: false//this state variable determine whether to show the search box, if true, the search box is displayed and user can type the keyword to search
    }
    //Bind all the method used through out the website
    this.turnOnSearch = this.turnOnSearch.bind(this);
    this.turnOffSearch = this.turnOffSearch.bind(this);
    this.handleSearchKeyword = this.handleSearchKeyword.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }
  //This method is triggered when user press on the search button on the navbar, it will display the search field
  turnOnSearch(event) {
    event.stopPropagation()
    this.setState((state) => {
      let newSearchingState = !state.searching;
      return { searching: newSearchingState }
    })
  }
  //This method is trigger when the seach field is displayed, and user click outside it, the method will close the search-field
  turnOffSearch() {
    if (this.state.searching) this.setState({ searching: false })
  }
  //This method keep the search field display when user typing
  keepSearchOn(event) {
    event.stopPropagation()
  }
  //This method is trigger when user type something into the search field and press Enter
  async handleSearchKeyword(event) {
    let keycode = (event.keyCode ? event.keyCode : event.which);
    console.log("hey iam working");
    if (keycode == '13') {
      event.preventDefault();
      let keyword = event.target.value;
      console.log(keyword);
      let newArticleList;
      newArticleList = await fetch(`https://gnews.io/api/v4/search?q=${keyword}&lang=en&token=${apiToken}`)
        .then(function (response) {
          return response.json();
        }).then(function (data) {
          return data.articles;
        });
      this.setState({ aricleList: await newArticleList })
    }
  }
  //This method is triggered when user press on any catergory on the navbar
  async handleChangeCategory(event) {
    let newTopic = (event.target.parentNode.id).toLowerCase(); //get the category
    let newArticleList; //this hold the new article list
    newArticleList = await fetch(`https://gnews.io/api/v4/top-headlines?&topic=${newTopic}&lang=en&token=${apiToken}`).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        return data.articles;
      });
    this.setState({ aricleList: await newArticleList })//update the state with new article list
  }

  //this method is run only once when the page is loaded, it fetch data from the sever and display articles on webpage
  // apart from this, it also add some eventListener to some DOM node 
  async componentDidMount() {
    console.log("hey iam getting");
    let initialData;
    initialData = await fetch(`https://gnews.io/api/v4/top-headlines?&lang=en&token=${apiToken}`).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        // console.log(data);
        return data.articles;
      });
    this.setState({ aricleList: await initialData });
    //We add eventLister to some Dom node 
    document.getElementById("search-field").addEventListener("keypress", this.handleSearchKeyword);
    document.addEventListener("click", this.turnOffSearch);
    document.getElementById("search-button").addEventListener("click", this.turnOnSearch);
    document.getElementById("search-field").addEventListener("click", this.keepSearchOn);
  }


  render() {
    //Data to display the logo
    const logo = { href: "index.html", content: "24H" };
    //Data to display on the navbar, they represent different category user can choose from
    const headlineList = [
      { content: "breaking-news", symbolClass: "fas fa-rss" },
      { content: "world", symbolClass: "fas fa-globe" },
      { content: "nation", symbolClass: "fas fa-flag" },
      { content: "business", symbolClass: "fas fa-chart-area" },
      { content: "technology", symbolClass: "fas fa-laptop" },
      { content: "entertainment", symbolClass: "fas fa-grin-beam" },
      { content: "sports", symbolClass: "fas fa-futbol" },
      { content: "science", symbolClass: "fas fa-microscope" },
      { content: "health", symbolClass: "fas fa-heart" },

    ]


    //Some ad that is displayed on the main page
    const adList = [
      { href: "https://quyvacxincovid19.gov.vn/", src: "./download(1).png", alt: "Ủng hộ quỹ vaxcin VietNam" },
      { href: "https://www.lazada.vn/shop/unilever-cham-soc-gia-dinh-nang-tam-cuoc-song1621412480/AxeRexonamen.htm?laz_trackid=2:mm_150031263_51203474_2010303021:clkgg28b81f9v9is38l0je&mkttid=clkgg28b81f9v9is38l0je", src: "./ad2.png", alt: "Unilever - chăm sóc gia đình, nâng niu cuộc sống" }
    ];

    //some ad on the sidebar
    const sideBarList = [
      { src: "sidebar.jpg", alt: "", href: "https://event.mi.com/global/BurningIceChallenge?utm_source=TTD&utm_medium=Display&utm_campaign=LFTC" },
      { src: "sidebar2.png", alt: "", href: "https://timnhavodicheuro.24h.com.vn/#dang_ki_ngay" }

    ]
    return (
      <div className="container" >
        <NavBar logo={logo} headlineList={headlineList}
          handleChangeKeyword={this.handleSearchKeyword}
          searching={this.state.searching}
          handleSearch={this.handleSearch}
          handleChangeCategory={this.handleChangeCategory} />
        <Content articleList={this.state.aricleList} adList={adList} sideBarList={sideBarList} />
        <Footer />
      </div>
    )
  }
}

export default App;
