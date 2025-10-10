import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css
import { categories } from "../../../pages/Categories/CategoriesData";
import { TbFidgetSpinner } from "react-icons/tb";
const AddRoomForm = ({
  handleSubmit,
  date,
  setDate,
  loading,
  imageText,
  imageFile,
  handleImagePreview,
  isValid,
}) => {
  const [customFacility, setCustomFacility] = useState("");
  const [customAmenity, setCustomAmenity] = useState("");
  const [customRule, setCustomRule] = useState("");

  console.log(isValid);
  const facilities = [
    "Self check-in",
    "Elevator access",
    "Dedicated workspace",
    "24/7 security",
  ];
  const amenities = [
    "Wi-Fi",
    "Smart TV",
    "Air conditioning",
    "Kitchenette",
    "Coffee maker",
    "Free parking garage",
    "Gym",
    "Pool",
    "Beach access",
    "Balcony",
    "Essentials",
    "Smoke alarm",
  ];
  const rules = ["No smoking", "No pets", "Respect quiet hours after 22:00"];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 bg-white rounded-xl shadow-md grid gap-4"
    >
      <h2 className="text-2xl text-center font-semibold mb-4">Add Room</h2>
      {/* Basic info */}
      <input
        name="title"
        placeholder="Title"
        className="border border-gray-300  p-2 rounded"
        required
      />
      <input
        name="location"
        placeholder="Location"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <select
        required
        className="border border-gray-300 p-2 rounded"
        name="category"
      >
        {categories.map((category) => (
          <option value={category.label} key={category.label}>
            {category.label}
          </option>
        ))}
      </select>
      <DateRangePicker
        onChange={(item) => setDate([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={date}
        direction="horizontal"
        minDate={new Date()}
        staticRanges={[]} // <- hides “Today”, “Yesterday”, etc.
        inputRanges={[]} // <- hides “days up to today”, etc.
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="number"
          name="guests"
          placeholder="Guests"
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          className="border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          className="border border-gray-300 p-2 rounded"
          required
        />
      </div>
      {/* Host */}
      <h3 className="font-medium mt-2">Host Details</h3>
      <input
        type="text"
        name="response_rate"
        placeholder="Response Rate"
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        list="suggestions1"
        required
      />
      <datalist id="suggestions1">
        <option value="100%" />
      </datalist>

      <select
        name="response_time"
        defaultValue="within an hour"
        className="select border text-gray-500 border-gray-300 p-2 rounded w-full"
      >
        <option>within an hour</option>
        <option>within 24hours</option>
        <option>within 48hours</option>
      </select>

      <input
        type="text"
        name="languages"
        list="suggestions3"
        placeholder="Languages (comma separated)"
        pattern="^([A-Za-z]+(, ?))*[A-Za-z]+$"
        title="Enter languages separated by commas (e.g., English, French, Spanish)"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <datalist id="suggestions3">
        <option value="English" />
      </datalist>
 
      {/* Rating */}
      <h3 className="font-medium mt-2">Rating (default rating maximum 4)</h3>
      <input
        name="score"
        type="number"
        step="0.1"
        max={4}
        placeholder="rating"
        className="border border-gray-300 p-2 rounded"
        required
      />
      {/* Other info */}
      {/* Facilities */}
      <div>
        <label className="block font-medium mb-1">Facilities</label>
        <div className="flex flex-wrap gap-3">
          {facilities.map((f) => (
            <label key={f} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="facility"
                value={f}
                className="accent-green-700"
              />
              <span className="text-gray-600 text-sm">{f}</span>
            </label>
          ))}
          {/* Other option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => !e.target.checked && setCustomFacility("")}
            />
            <input
              type="text"
              placeholder="Other..."
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              className="border border-gray-400 p-1 rounded"
              name="facility_other"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block font-medium mb-1">Amenities</label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((a) => (
            <label key={a} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="amenities"
                value={a}
                className="accent-green-700"
              />
              <span className="text-gray-600 text-sm">{a}</span>
            </label>
          ))}
          {/* Other option */}
          <div className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              onChange={(e) => !e.target.checked && setCustomAmenity("")}
            />
            <input
              type="text"
              placeholder="Other..."
              value={customAmenity}
              onChange={(e) => setCustomAmenity(e.target.value)}
              className="border border-gray-400 p-1 rounded"
              name="amenities_other"
            />
          </div>
        </div>
      </div>

      {/* House Rules */}
      <div>
        <label className="block font-medium mb-1">House Rules</label>
        <div className="flex flex-col gap-2">
          {rules.map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="house_rules"
                value={r}
                className="accent-green-700"
              />
              <span className="text-gray-600 text-sm">{r}</span>
            </label>
          ))}
          {/* Other option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => !e.target.checked && setCustomRule("")}
            />
            <input
              type="text"
              placeholder="Other..."
              value={customRule}
              onChange={(e) => setCustomRule(e.target.value)}
              className="border border-gray-400 p-1 rounded"
              name="house_rules_other"
            />
          </div>
        </div>
      </div>

      
      <label className="block font-medium mb-1">Other Information</label>
      <textarea
        name="description"
        placeholder="Description"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <div className="border border-gray-300 flex items-center">
        <input
          className=" p-2 rounded"
          required
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={(e) => handleImagePreview(e.target.files[0])}
        />
        {imageFile && (
          <img
            className="w-8 h-8 rounded-full"
            src={imageFile}
            alt="Uploaded preview"
          />
        )}
      </div>
      {/* <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
        {imageText.length > 20
          ? imageText.split(".")[0].slice(0, 15) +
            "..." +
            imageText.split(".")[1]
          : imageText}
      </div> */}
      <input
        autoComplete="flexible"
        name="cancellation_policy"
        placeholder="Cancellation Policy"
        list="suggestions4"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <datalist id="suggestions4">
        <option value="flexible" />
      </datalist>

      <input
        autoComplete="24 hours"
        name="cancellation_before"
        placeholder="Cancellation Before (e.g., 24 hours)"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <datalist id="suggestions4">
        <option value="24 hours" />
      </datalist>

      <input
        name="address_line"
        placeholder="Address Line"
        className="border border-gray-300 p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 cursor-pointer"
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto" />
        ) : (
          "Add Room"
        )}
      </button>
    </form>
  );
};

export default AddRoomForm;
