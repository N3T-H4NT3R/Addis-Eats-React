import "./DishDetailsSkeleton.css";


const DishDetailsSkeleton = () => {
  return (
    <div className="dish-details">

      <div className="skeleton-back"></div>

      <div className="dish-details-card">

        <div className="dish-details-image skeleton-image"></div>

        <div className="dish-details-content">

          <div className="skeleton-title"></div>

          <div className="skeleton-price"></div>

          <div className="skeleton-description"></div>
          <div className="skeleton-description short"></div>

          <div className="skeleton-button"></div>

        </div>

      </div>

    </div>
  );
};

export default DishDetailsSkeleton;