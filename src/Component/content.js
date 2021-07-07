function Content(props) {
    const articleList = props.articleList.map(item => (
        <Article key={item.title} alt={item.title} href={item.url} title={item.title} imgSrc={item.image} source={item.source} publishedAt={item.publishedAt} content={item.description} linkList={item.linkList} />
    ))
    for (let x = 2, y = 0; x < articleList.length - 1; x += 3) {
        articleList.splice(x, 0, <Ad href={props.adList[y].href} src={props.adList[y].src} alt={props.adList[y].alt} />)
        y++;
        if (y >= props.adList.length) { y = 0; }
    }
    const sideBar = props.sideBarList.map(item =>
        <SideBar src={item.src} alt={item.alt}  href={item.href}/>
    )
    return (
        <div className="content row mb-3">
            <main className="col-8 col-lg-9">
                <div className="row article-row justify-content-between">
                    {articleList}
                </div>
            </main>
            <aside className='col-4 col-lg-3'>
                <div className="row mb-3">
                    {sideBar}
                </div>
            </aside>
        </div>
    )
}

function Article(props) {
    let publistDate = new Date(props.publishedAt)
    return (
        <article className="col-lg-6 mb-2">
            <div className="card p-2 bg-light">
                <div className="card-title">
                    <a target="_blank" alt={props.alt} href={props.href} className="h5">{props.title}</a>
                </div>
                <div className="card-body row">
                    <div className="image-holder col-5 " style={{ height: 120 }}>
                        <a target="_blank" href={props.href} alt={props.alt}><img src={props.imgSrc}  alt={props.alt} className="me-2 float-start img-fluid img-thumbnail" /></a>
                    </div>
                    <div className="col-7 text-box-truncated" style={{ height:100 }} >{props.content}</div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <span className="">Source Website: <a target="_blank" className="text-decoration-underline" href={props.source.url}> {props.source.name}</a></span>
                    <span className="">Published at: {publistDate.toLocaleDateString()}</span>
                </div>
            </div>
        </article >
    )
}

function Ad(props) {
    return (
        <div className="ad col-12 mb-2">
            <a href={props.href} target="_blank">  <img className="ad-image" alt={props.alt} src={props.src} />
            </a>
        </div>
    )

}

function SideBar(props) {
    return (
        <a href={props.href}  target="_blank" ><img src={props.src} className="img-fluid col-12 mb-2" alt={props.alt}/></a>
    )
}
export default Content