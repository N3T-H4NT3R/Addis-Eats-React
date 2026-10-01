
import { useState } from "react";
import useDishStore from "../../store/dishStore";
import { useSearch } from "../../Context/SearchContext";
import "./DishManager.css";
import DishForm from "../DishForm/DishForm";

const DishManager = () => {
  const dishes = useDishStore((state) => state.dishes);

  const addDish = useDishStore(
    (state) => state.addDish
  );

  const updateDish = useDishStore(
    (state) => state.updateDish
  );

  const deleteDish = useDishStore(
    (state) => state.deleteDish
  );

  const toggleAvailability = useDishStore(
    (state) => state.toggleAvailability
  );

  const { search } = useSearch();

  const [editingDish, setEditingDish] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  /* ================================
     Live Search
  ================================= */

  const filteredDishes = dishes.filter((dish) =>
    dish.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ================================
     Add
  ================================= */

  const handleAdd = (dish) => {
    addDish(dish);
  };

  /* ================================
     Edit
  ================================= */

  const handleEdit = (dish) => {
    setEditingDish(dish);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = (id, dish) => {
    updateDish(id, dish);
    setEditingDish(null);
  };

  const handleCancel = () => {
    setEditingDish(null);
  };

  /* ================================
     Delete
  ================================= */

  const handleDelete = (id) => {
    deleteDish(id);

    if (selectedDish?.id === id) {
      setSelectedDish(null);
    }

    if (editingDish?.id === id) {
      setEditingDish(null);
    }
  };

  return (
    <section className="dish-manager">

      {/* Header */}

      <div className="dish-manager-header">

        <div>
          <h1>Dish Management</h1>

          <p>
            Manage dishes available on Addis Eats.
          </p>
        </div>

        <span className="dish-count">
          {dishes.length} Dishes
        </span>

      </div>

      {/* Add / Edit Form */}

      <DishForm
        editingDish={editingDish}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />

      {/* Dish List */}

      {filteredDishes.length === 0 ? (
        <div className="dish-empty">

          <h2>No dishes found</h2>

          <p>
            {search
              ? "No dishes match your search."
              : "There are no dishes yet."}
          </p>

        </div>
      ) : (
        <div className="dish-grid">

          {filteredDishes.map((dish) => (
            <article
              className="dish-card"
              key={dish.id}
            >

              {/* Image */}

              <div className="dish-image-wrapper">

                {dish.image ? (
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="dish-image"
                  />
                ) : (
                  <div className="dish-no-image">
                    No Image
                  </div>
                )}

              </div>

              {/* Content */}

              <div className="dish-card-content">

                <div className="dish-card-top">

                  <h3>{dish.name}</h3>

                  <strong>
                    ETB{" "}
                    {Number(dish.price).toFixed(2)}
                  </strong>

                </div>

                <span className="dish-category">
                  {dish.category}
                </span>

                <p>
                  {dish.description ||
                    "No description."}
                </p>

                {/* Availability */}

                <div className="dish-availability">

                  <span
                    className={
                      dish.available
                        ? "dish-status available"
                        : "dish-status finished"
                    }
                  >
                    {dish.available
                      ? "Available"
                      : "Finished"}
                  </span>

                  <button
                    type="button"
                    className={
                      dish.available
                        ? "availability-toggle on"
                        : "availability-toggle off"
                    }
                    onClick={() =>
                      toggleAvailability(dish.id)
                    }
                    aria-label={
                      dish.available
                        ? `Mark ${dish.name} as finished`
                        : `Mark ${dish.name} as available`
                    }
                  >
                    <span className="toggle-circle"></span>
                  </button>

                </div>

                {/* Actions */}

                <div className="dish-actions">

                  <button
                    type="button"
                    className="view-dish-button"
                    onClick={() =>
                      setSelectedDish(dish)
                    }
                  >
                    View
                  </button>

                  <button
                    type="button"
                    className="edit-dish-button"
                    onClick={() =>
                      handleEdit(dish)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-dish-button"
                    onClick={() =>
                      handleDelete(dish.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </article>
          ))}

        </div>
      )}

      {/* View Dish Modal */}

      {selectedDish && (
        <div
          className="dish-modal-overlay"
          onClick={() => setSelectedDish(null)}
        >

          <div
            className="dish-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="dish-modal-header">

              <div>
                <h2>{selectedDish.name}</h2>

                <p>
                  {selectedDish.category}
                </p>
              </div>

              <button
                type="button"
                className="close-dish-modal"
                onClick={() =>
                  setSelectedDish(null)
                }
              >
                ×
              </button>

            </div>

            {selectedDish.image && (
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="dish-modal-image"
              />
            )}

            <div className="dish-modal-info">

              <div>
                <span>Category</span>

                <strong>
                  {selectedDish.category}
                </strong>
              </div>

              <div>
                <span>Price</span>

                <strong>
                  ETB{" "}
                  {Number(
                    selectedDish.price
                  ).toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {selectedDish.available
                    ? "Available"
                    : "Finished"}
                </strong>
              </div>

            </div>

            <div className="dish-modal-description">

              <h3>Description</h3>

              <p>
                {selectedDish.description ||
                  "No description available."}
              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
};

export default DishManager;