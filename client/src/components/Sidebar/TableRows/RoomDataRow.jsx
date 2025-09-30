import PropTypes from "prop-types";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner";
import toast from "react-hot-toast";
import UpdateRoomModal from "../../Modal/UpdateRoomModal";
import useAuth from "../../../hooks/useAuth";
import { ImageBBUpload } from "../../../api/utilities";
import DeleteModal from "../../Modal/DeleteModal";

const RoomDataRow = ({ room, refetch }) => {
  console.log(room);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen]=useState(false);
  
  const [date, setDate] = useState([
    {
      startDate: new Date(room?.from),
      endDate: new Date(room?.to),
      key: "selection",
    },
  ]);
  const [imageFile, setImageFile] = useState(room?.image || "");

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeDeleteModal=()=>{
    setIsDeleteModalOpen(false);
  }

  const { mutateAsync: updateRoomAsync, isPending } = useMutation({
    mutationKey: ["update-room"],
    mutationFn: async (roomData) => {
      console.log();
      const { data } = await axiosSecure.patch(`/update-room/${room?._id}`,roomData);
      return data;
    },
    onSuccess: () => {
      setLoading(false);
      closeModal();
      refetch();
    },
    onError: () => {
      setLoading(true);
      closeModal();
    },
  });

  const handleUpdateRoom = async (e) => {
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
    const languages = form.getAll("languages");
    const score = Number(form.get("score"));
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
    const image = form.get("image");
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
    let img = room?.image;
    try {
      if (image && image.size > 0) {

        try {
          const uploadedUrl = await ImageBBUpload(image); // your function
          img = uploadedUrl;
        } catch (err) {
          toast.error("Image upload failed");
          return;
        }
      }
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
        image:img,
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
        cancellation_policy,
        cancellation_before,
        address_line,
      };
      console.log(room);
      const data = await updateRoomAsync(room);
      if (data.modifiedCount > 0) {
        toast.success("Room has been updated!!");
      } else {
        toast.error("Everything is already updated!!");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (image) => {
    setImageFile(URL.createObjectURL(image));
  };

  // delete room
  const {mutateAsync:deleteRoomAsync,isPending:isDeletePending}=useMutation({
    mutationKey:['delete-room'],
    mutationFn:async(id)=>{
      const {data}=await axiosSecure.delete(`/room-delete/${id}`);
      console.log(id);
      return data;
    },
    onSuccess:()=>{
      setLoading(false);
      closeDeleteModal();
      refetch();
    }
  })

  const handleDeleteRoom=async(id)=>{
    setLoading(true);
    try{
      const data=await deleteRoomAsync(id);
      console.log(data);
      toast.success('Room has been deleted!!!');
    }catch(err){
      toast.error(err.message);
      setLoading(false);
    }
  }

  if (isPending||isDeletePending) return <LoadingSpinner />;
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={room?.image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{room?.title}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{room?.location}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${room?.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.from), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {format(new Date(room?.to), "P")}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button onClick={()=>setIsDeleteModalOpen(true)} className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal id={room?._id} closeModal={closeDeleteModal} isOpen={isDeleteModalOpen} loading={loading} handleDeleteRoom={handleDeleteRoom}/>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update</span>
        </button>
        {/* Update Modal */}
        <UpdateRoomModal
          handleUpdateRoom={handleUpdateRoom}
          imageFile={imageFile}
          handleImagePreview={handleImagePreview}
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          room={room}
          closeModal={closeModal}
          date={date}
          setDate={setDate}
        />
      </td>
    </tr>
  );
};

RoomDataRow.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
};

export default RoomDataRow;
