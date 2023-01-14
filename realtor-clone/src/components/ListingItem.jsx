import React from "react";
import Moment from "react-moment";
import { HiLocationMarker } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ListingItem({ id, listing, onEdit, onDelete }) {
  return (
    <li className="bg-white relative rounded overflow-hidden shadow-md hover:shadow-lg transition duration-150 ease-in-out m-2">
      <Link to={`/category/${listing.type}/${id}`}>
        <img
          className="hover:scale-105 transition ease-in-out duration-150 object-cover w-full h-[170px]"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <div>
          <Moment
            className="absolute top-1 left-2 bg-blue-500 px-2 py-1 rounded-lg text-sm text-white font-medium"
            fromNow
          >
            {listing.timestamp?.toDate()}
          </Moment>
        </div>
        <div className="flex items-center mt-3 ml-2">
          <HiLocationMarker className="text-green-600 text-xl" />
          <div className="ml-1">
            <p className="text-gray-600 font-medium text-sm truncate">
              {listing.address}
            </p>
          </div>
        </div>
        <div className="ml-2 mt-2">
          <h2 className="font-semibold text-xl truncate">{listing.name}</h2>
        </div>
        <div className="ml-2 mt-3">
          <p className="font-semibold text-xl text-gray-600">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>
        </div>
        <div className="ml-2 mt-4 mb-3 flex items-center">
          <div className="mr-4">
            <p className="font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 Bed"}
            </p>
          </div>
          <div>
            <p className="font-bold text-xs">
              {listing.bethrooms > 1 ? `${listing.bethrooms} bath` : "1 Bath"}
            </p>
          </div>
        </div>
      </Link>
      <FaTrash className="absolute bottom-3 right-2 cursor-pointer text-red-500 text-sm" onClick={onDelete}/>
      <MdEdit className="absolute bottom-3 right-7 cursor-pointer" onClick={onEdit}/>
    </li>
  );
}