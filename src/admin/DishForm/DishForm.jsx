import { useEffect, useState } from "react";
import "./DishForm.css";



const DishForm = ({
  editingDish,
  onAdd,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (editingDish) {
      setForm({
        name: editingDish.name || "",
        price: editingDish.price || "",
        category: editingDish.category || "",
        image: editingDish.image || "",
        description: editingDish.description || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
    }
  }, [editingDish]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.price ||
      !form.category.trim()
    ) {
      return;
    }

    const dish = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
    };

    if (editingDish) {
      onUpdate(editingDish.id, dish);
    } else {
      onAdd(dish);
    }

    setForm({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });
  };

  return (
    <form
      className="dish-form"
      onSubmit={submitHandler}
    >
      <div className="dish-form-header">
        <div>
          <h2>
            {editingDish ? "Edit Dish" : "Add Dish"}
          </h2>

          <p>
            {editingDish
              ? "Update the dish information."
              : "Add a new dish to Addis Eats."}
          </p>
        </div>
      </div>

      <div className="dish-form-grid">

        <div className="dish-form-group">
          <label htmlFor="dish-name">
            Dish Name
          </label>

          <input
            id="dish-name"
            type="text"
            name="name"
            placeholder="Enter dish name"
            value={form.name}
            onChange={changeHandler}
          />
        </div>

        <div className="dish-form-group">
          <label htmlFor="dish-price">
            Price
          </label>

          <input
            id="dish-price"
            type="number"
            name="price"
            placeholder="Enter price"
            min="0"
            value={form.price}
            onChange={changeHandler}
          />
        </div>

        <div className="dish-form-group">
          <label htmlFor="dish-category">
            Category
          </label>

          <input
            id="dish-category"
            type="text"
            name="category"
            placeholder="Example: Traditional"
            value={form.category}
            onChange={changeHandler}
          />
        </div>

        <div className="dish-form-group">
          <label htmlFor="dish-image">
            Image URL
          </label>

          <input
            id="dish-image"
            type="url"
            name="image"
            placeholder="Enter image URL"
            value={form.image}
            onChange={changeHandler}
          />
        </div>

        <div className="dish-form-group dish-form-full">
          <label htmlFor="dish-description">
            Description
          </label>

          <textarea
            id="dish-description"
            name="description"
            placeholder="Enter dish description"
            value={form.description}
            onChange={changeHandler}
            rows="4"
          />
        </div>

      </div>

      <div className="dish-form-actions">

        <button
          type="submit"
          className="dish-save-button"
        >
          {editingDish ? "Update Dish" : "Add Dish"}
        </button>

        {editingDish && (
          <button
            type="button"
            className="dish-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
};

export default DishForm;