import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css
import { categories } from "../../../pages/Categories/CategoriesData";
import { TbFidgetSpinner } from "react-icons/tb";
import "./UpdateRoomCalendar.css";
const UpdateRoomForm = ({
  room,
  loading,
  handleImagePreview,
  handleUpdateRoom,
  closeModal,
  date,
  setDate,
  imageFile,
}) => {
  const [customFacility, setCustomFacility] = useState("");
  const [facilities, setFacilities] = useState(room?.facility);

  const [customAmenity, setCustomAmenity] = useState("");
  const [customRule, setCustomRule] = useState("");

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

  const addToFacility = () => {
    if (customFacility) {
      setFacilities([...facilities, customFacility]);
      setCustomFacility("");
    }
  };
  // initialize state with room amenities
  const [selectedAmenities, setSelectedAmenities] = useState(
    room?.amenities || []
  );

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      // remove it
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      // add it
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <div data-lenis-prevent className="max-h-[80vh] overflow-y-auto overscroll-contain pr-2">
      <form
      onSubmit={handleUpdateRoom}
      className="w-full p-6 bg-white rounded-xl shadow-md grid gap-4"
    >
      {/* <h2 className="text-2xl text-center font-semibold mb-4">Update Room</h2> */}
      {/* Basic info */}
      <input
        name="title"
        placeholder="Title"
        className="border border-gray-300  p-2 rounded"
        defaultValue={room?.title}
        required
      />
      <input
        name="location"
        placeholder="Location"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.location}
        required
      />
      <select
        required
        className="border border-gray-300 p-2 rounded"
        name="category"
        defaultValue={room?.category}
      >
        {categories.map((category) => (
          <option value={category.label} key={category.label}>
            {category.label}
          </option>
        ))}
      </select>
      <div className="w-full">
        <DateRangePicker
          onChange={(item) => setDate([item.selection])}
          showSelectionPreview
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date}
          direction="horizontal"
          minDate={new Date()}
          staticRanges={[]} // no presets
          inputRanges={[]} // no inputs
          className="
    w-full
    [&_.rdrDefinedRangesWrapper]:hidden     /* hide left preset sidebar */
    [&_.rdrDateRangePickerWrapper]:w-full
    [&_.rdrCalendarWrapper]:w-full
    [&_.rdrMonths]:w-full                   /* stretch months row */
    [&_.rdrMonth]:flex-1                    /* let each month grow */
    [&_.rdrMonth]:basis-1/2                 /* 50/50 split across width */
  "
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border border-gray-300 p-2 rounded"
          defaultValue={room?.price}
        />
        <input
          type="number"
          name="guests"
          placeholder="Guests"
          className="border border-gray-300 p-2 rounded"
          defaultValue={room?.guests}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          className="border border-gray-300 p-2 rounded"
          defaultValue={room?.bathrooms}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          className="border border-gray-300 p-2 rounded"
          defaultValue={room?.bedrooms}
        />
      </div>
      {/* Host */}
      <h3 className="font-medium mt-2">Host Details</h3>
      <input
        type="text"
        name="response_rate"
        placeholder="Response Rate"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.host?.response_rate}
      />
      <input
        type="text"
        name="response_time"
        placeholder="Response Time"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.host?.response_time}
      />
      {room?.host?.languages.map((language) => (
        <input
          type="text"
          name="languages"
          placeholder="Languages (comma separated)"
          className="border border-gray-300 p-2 rounded"
          defaultValue={language}
        />
      ))}
      {/* Rating */}
      <h3 className="font-medium mt-2">Rating</h3>
      <input
        name="score"
        type="number"
        step="0.1"
        placeholder="Score"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.rating?.score}
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
                checked
              />
              <span className="text-gray-600 text-sm">{f}</span>
            </label>
          ))}
          {/* Other option */}
          <div className="flex items-center gap-2">
            {/* <input
              type="checkbox"
              onChange={(e) => !e.target.checked && setCustomFacility("")}
            /> */}
            <input
              type="text"
              placeholder="Other..."
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              className="border border-gray-400 p-1 rounded"
              name="facility_other"
            />
            <button
              type="button"
              disabled={!customFacility}
              onClick={addToFacility}
              className="btn bg-green-800 text-white"
            >
              Add
            </button>
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
                checked={selectedAmenities.includes(a)}
                onChange={() => handleAmenityChange(a)}
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
                checked={room?.house_rules?.includes(r)}
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
        defaultValue={room?.description}
      />
      <div className="border border-gray-300 flex items-center">
        <input
          className=" p-2 rounded"
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
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.cancellation_policy}
      />
      <input
        autoComplete="24 hours"
        name="cancellation_before"
        placeholder="Cancellation Before (e.g., 24 hours)"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.cancellation_before}
      />
      <input
        name="address_line"
        placeholder="Address Line"
        className="border border-gray-300 p-2 rounded"
        defaultValue={room?.address_line}
      />
      <button
        type="submit"
        disabled={room?.booked}
        className={`disabled:bg-gray-200 disabled:cursor-default bg-green-800 text-white py-2 px-4 rounded hover:bg-green-800 cursor-pointer`}
      >
        {loading ? (
          <TbFidgetSpinner className="animate-spin m-auto" />
        ) : (
          "Update Room"
        )}
      </button>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={closeModal}
      >
        Cancel
      </button>
    </form>
    </div>
  );
};

export default UpdateRoomForm;
