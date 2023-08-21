import { Link } from "react-router-dom";

function Movie({imgPath, selectedUser, changeRent, id, details}) {

    return ( 
        <div className="movie">
            {selectedUser===undefined?"":
                <button className="plus-minus" onClick={()=>changeRent(details,2)}>
                    {selectedUser.rented.some(m=>m===details)?"-":"+"}
                </button>}
            <Link to={`/movies/${id}`}>
                <img src={imgPath} alt=""/>
            </Link> 
        </div>
     );
}

export default Movie;