import { useState } from "react";
import AddRoomForm from "../../../components/shared/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { ImageBBUpload } from "../../../api/utilities";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState();
  const [imageText, setImageText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const today = new Date();
  // get first day of next month
  const firstOfNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  );

  // get last day of next month
  const endOfNextMonth = new Date(
    firstOfNextMonth.getFullYear(),
    firstOfNextMonth.getMonth() + 1,
    0
  );
  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: endOfNextMonth,
      key: "selection",
    },
  ]);

  const handleImagePreview = (image) => {
    setImageFile(URL.createObjectURL(image));
    setImageText(image.name);
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["add-room"],
    mutationFn: async (room) => {
      const { data } = await axiosSecure.post("/rooms", room);
      return data;
    },
    onSuccess: () => {
      toast.success("Room added successfully");
      setLoading(false);
      navigate("/rooms");
    },
    onError: () => {
      toast.error("Something went wrong");
      setLoading(false);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const title = form.get("title");
    const location = form.get("location");
    const category = form.get("category");
    const from = new Date(date[0].startDate).toISOString();
    const to = new Date(date[0].endDate).toISOString();
    const price = form.get("price");
    const guests = form.get("guests");
    const bathrooms = form.get("bathrooms");
    const bedrooms = form.get("bedrooms");
    const response_rate = form.get("response_rate");
    const response_time = form.get("response_time");

    // languages
    const languages = form.getAll("languages");


    const score = Number(form.get("score")) || 4;
    const rating = {
      score,
    };
    // facilities
    let facility = form
      .getAll("facility")
      .map((s) => s.trim())
      .filter(Boolean); // removes "" and whitespace-only
    //filter(Boolean) is a shorthand trick in JavaScript.It removes all falsy values from the array ("", null, undefined, false, 0).

    const otherFacility = (form.get("facility_other") || "").trim();
    if (otherFacility) facility.push(otherFacility);

    // amenities
    let amenities = form
      .getAll("amenities")
      .map((s) => s.trim())
      .filter(Boolean); // removes "" and whitespace-only

    const otherAmenities = (form.get("amenities_other") || "").trim();
    if (otherAmenities) amenities.push(otherAmenities);

    // house rules
    let house_rules = form
      .getAll("house_rules")
      .map((s) => s.trim())
      .filter(Boolean); // removes "" and whitespace-only

    const otherHouse_rules = (form.get("house_rules_other") || "").trim();
    if (otherHouse_rules) house_rules.push(otherHouse_rules);

    const description = form.get("description");
    const img = form.get("image");
    const cancellation_policy = form.get("cancellation_policy");
    const cancellation_before = form.get("cancellation_before");
    const address_line = form.get("address_line");

    const host = {
      name: user?.displayName || "unknown",
      email: user?.email || "",
      img: user?.photoURL || <FaUser />,
      response_rate,
      response_time,
      languages,
    };

    try {
      const image = await ImageBBUpload(img);
      // console.log(date);
      const room = {
        date,
        title,
        location,
        category,
        from,
        to,
        price,
        host,
        guests,
        bathrooms,
        bedrooms,
        response_rate,
        response_time,
        languages,
        rating,
        facility,
        amenities,
        house_rules,
        description,
        image,
        cancellation_policy,
        cancellation_before,
        address_line,
      };
      await mutateAsync(room);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <AddRoomForm
        handleSubmit={handleSubmit}
        date={date}
        setDate={setDate}
        loading={loading}
        imageText={imageText}
        handleImagePreview={handleImagePreview}
        imageFile={imageFile}
        setImageFile={setImageFile}
      />
    </>
  );
};

export default AddRoom;
