import { Link } from "react-router-dom";

const LatestDestinationCard = ({ hotel }) => {
  return (
    <Link
      to={`/rooms/${hotel._id}`}
      className="card mb-4 rounded overflow-hidden position-relative"
    >
      <div className="card-img-top" style={{ height: "300px" }}>
        <img
          src={hotel.imageUrls[0]}
          className="img-fluid w-100 h-100 object-fit-cover"
          alt={hotel.name}
        />
      </div>

      <div className="card-body position-absolute bottom-0 bg-dark bg-opacity-50 w-100 rounded-bottom">
        <h5 className="card-title text-white font-weight-bold">{hotel.name}</h5>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
