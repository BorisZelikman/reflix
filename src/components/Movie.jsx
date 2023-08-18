function Movie(props) {
    return ( 
        <div className="movie">
            <button className="plus-minus">+</button>
            <img src={props.imgPath} alt="" />
        </div>
     );
}

export default Movie;