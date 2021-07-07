import React from "react";

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const headlineList = this.props.headlineList.map(item => (
            <Headline key={item.content} href={item.href} alt={item.alt} symbolClass={item.symbolClass} content={item.content} handleChangeCategory={this.props.handleChangeCategory} />
        ))
        return (
            <div className="row nav-background justify-content-center align-items-center mb-3">
                <nav className="col-lg-10 pt-2 position-relative ">
                    <div className="row">
                        <div className="col-2 col-lg-1 d-flex align-items-center justify-content-around">
                            <a href={this.props.logo.href} className="h2 ps-3">{this.props.logo.content}</a>
                        </div>
                        <div className="col-9 col-lg-10">
                            <div className="row row-cols-5 flex-lg-nowrap justify-content-around">
                                {headlineList}
                            </div>
                        </div>
                        <div className="col-1 search my-auto">
                            <button type="button" className="btn text-white" id="search-button">
                                <i className="fas fa-search d-block h4"></i>
                            </button>
                            <input id="search-field" className={"form-control  position-absolute end-0 top-100" + (this.props.searching ? "" : " d-none")} type="search" style={{ zIndex: 1 }}></input>
                        </div>
                    </div>
                </nav>
            </div >

        )
    }
}

function Headline(props) {
    return (
        <div id={props.content} className="link col col-lg-auto py-2 text-center" role="button" onClick={props.handleChangeCategory}>
            <i className={props.symbolClass + " d-block"}></i>
            <p className="headline text-nowrap text-capitalize">{props.content}</p>
        </div>
    )
}
export default NavBar;