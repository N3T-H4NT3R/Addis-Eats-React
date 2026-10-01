import "./MenuSkeleton.css";

const MenuSkeleton = () => {
  return (
    <div className="menu-skeleton">

      {Array.from({ length: 6 }).map((_, index) => (
        <div className="menu-skeleton-card" key={index}>

          <div className="menu-skeleton-image"></div>

          <div className="menu-skeleton-content">

            <div className="menu-skeleton-title"></div>

            <div className="menu-skeleton-text"></div>
            <div className="menu-skeleton-text short"></div>

            <div className="menu-skeleton-bottom">

              <div className="menu-skeleton-price"></div>

              <div className="menu-skeleton-button"></div>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default MenuSkeleton;