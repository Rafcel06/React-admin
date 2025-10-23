import React from 'react'
import "../css/pageNotFound.css";
import { Link, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='not-found-contain'>
    <div className="notfound">
			<h1>oops!</h1>
			<h2>Error 404 : Page Not Found</h2>
			<a onClick={() => navigate(-1)}>go back</a>

		</div>

        </div>
  )
}

export default PageNotFound