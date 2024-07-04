import React, { useState, useContext, useEffect, useRef } from "react";
import EXIF from "exif-js";
import PopupMap from "./PopupMap";
import PopupLayout from "./PopupLayout";
import { AddressContext } from "../../contexts/AddressContext";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadComponent = () => {
  const [image, setImage] = useState(null);
  const [treeName, settreeName] = useState("");
  const [plantedOn, setPlantedOn] = useState("");
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { address, setAddress, latlng, setLatlng, country, setCountry } =
    useContext(AddressContext);
  const fileUploadRef = useRef(null);
  const [invalidFields, setInvalidFields] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        EXIF.getData(img, async function () {
          const lat = EXIF.getTag(this, "GPSLatitude");
          const lon = EXIF.getTag(this, "GPSLongitude");
          if (lat && lon) {
            const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
            const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "W";
            const latitude =
              (lat[0] + lat[1] / 60 + lat[2] / 3600) *
              (latRef === "N" ? 1 : -1);
            const longitude =
              (lon[0] + lon[1] / 60 + lon[2] / 3600) *
              (lonRef === "W" ? -1 : 1);

            setLatlng({ lat: latitude, lng: longitude });

            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&accept-language=en&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name);

            const countryName = data.address.country;
            setCountry(countryName);
          } else {
            setAddress("");
            setError("No geotags found in the image.");
            toast.error("No geotags found in the image.");
          }
        });
      };
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // Update location when address context changes
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInvalidFields = [];

    if (!image) newInvalidFields.push("image");
    if (!treeName) newInvalidFields.push("treeName");
    if (!address) newInvalidFields.push("address");
    if (!plantedOn) newInvalidFields.push("plantedOn");
    if (!latlng) newInvalidFields.push("latlng");

    if (newInvalidFields.length > 0) {
      setInvalidFields(newInvalidFields);
      setError("Please provide all required information.");
      toast.error("Please provide all required information.");
      return;
    }

    if (!image || !treeName || !address || !plantedOn) {
      setError("Please provide all required information.");
      toast.error("Please provide all required information.");
      return;
    }

    if (!latlng) {
      setError("Coordinates are missing.");
      toast.error("Coordinates are missing.");
      return;
    }

    const _id = Cookies.get("_id") || "0"; // Retrieve _id from cookies or use 0

    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("plantedOn", new Date(plantedOn).toISOString());
    formData.append("Address", address);
    formData.append("Plant_name", treeName);
    formData.append("lat", latlng.lat.toString());
    formData.append("lng", latlng.lng.toString());
    formData.append("image", image); // Append the image file
    formData.append("image_name", image.name);
    formData.append("country", country);
    formData.append("username", "Gautam");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/upload/user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);

      // Clear the context and reset form fields after submission
      setImage(null);
      settreeName("");
      setAddress("");
      setLatlng(null);
      setPlantedOn("");
      setCountry("");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to upload image or submit data.");
      toast.error("Failed to upload image or submit data.");
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFocus = (event) => {
    event.target.showPicker();
  };

  const invalidFieldStyle = {
    border: "2px solid red",
  };

  return (
    <div>
      <div>
        <section className="bg-image pt-40 pb-40">
          <div className="container">
            <h2
              className="wow fadeInUp"
              data-wow-duration="1.2s"
              data-wow-delay=".2s"
            >
              Upload Tree
            </h2>
          </div>
        </section>

        <section className="contact pt-60 pb-60">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="content bg-image-upload">
                  <h2>Plant Upload Procedure</h2>
                  <p>
                    Kindly provide clear picture and geo location detail of
                    plant images for higher accuracy. Watch the tutorial video
                    for more information.
                  </p>
                  <ul>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      On your device, enable the location service.
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      Verify that the camera has access to the location service.
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      Take pictures of plants with your phone.
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      Check the image file details in your phone's gallery to
                      see if the location is present in the captured images.
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      For fast processing, copy the original photos to the
                      computer. (Optional)
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      Upload plant photos using the file uploader provided on
                      this page.
                    </li>
                    <li>
                      <img
                        className="pe-2"
                        src="/images/icon/leaf.png"
                        alt="icon"
                        style={{ display: "inline" }}
                      />
                      Our Team will Verify the image in First Come First Serve
                      manner and will approve it for public listing
                    </li>
                  </ul>

                  <div className="col-lg-12">
                    <div class="container-youtube">
                      <iframe
                        title="ytvideo"
                        class="responsive-iframe"
                        src="https://www.youtube.com/embed/AkbGz3CYvqE?&loop=1&autoplay=1&controls=0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-area">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileUploadRef}
                      style={
                        invalidFields.includes("image") ? invalidFieldStyle : {}
                      }
                    />

                    <input
                      type="text"
                      value={treeName}
                      onChange={(e) => settreeName(e.target.value)}
                      placeholder="Tree Name"
                      style={
                        invalidFields.includes("treeName")
                          ? invalidFieldStyle
                          : {}
                      }
                    />

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="text"
                        placeholder="Select Location From Map"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly
                        style={{
                          flex: "1",
                          marginRight: "10px",
                          ...(invalidFields.includes("address")
                            ? invalidFieldStyle
                            : {}),
                        }}
                      />
                      <button
                        type="button"
                        className="fa-solid"
                        onClick={openPopup}
                        style={{
                          height: "60px",
                          paddingRight: "55px",
                          paddingLeft: "55px",
                          marginBottom: "20px",
                          backgroundColor: "#3E6294",
                        }}
                      >
                        📍
                      </button>
                      <PopupLayout
                        component={PopupMap}
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                      />
                    </div>

                    <input
                      type="datetime-local"
                      value={plantedOn}
                      onChange={(e) => setPlantedOn(e.target.value)}
                      onFocus={handleFocus}
                      placeholder="Planted On"
                      style={{
                        cursor: "pointer",
                        ...(invalidFields.includes("plantedOn")
                          ? invalidFieldStyle
                          : {}),
                      }}
                    />
                    <button>
                      Submit
                      <i className="fa-solid fa-arrow-right-long" />
                    </button>
                    {error && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "20px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                          textAlign: "center",
                        }}
                      >
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadComponent;
