import React from 'react'
const  Newsitems = (props) => {
    let {title, description, imgagrUrl, newUrl,date , author} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : "90%", zIndex: 1}}>
        {author}
        <span class="visually-hidden">unread messages</span>
        </span>
        <img src={imgagrUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className='card-text' ><small className='text-muted'>by {author} on {new Date(date).toUTCString()}</small></p>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }

export default Newsitems
