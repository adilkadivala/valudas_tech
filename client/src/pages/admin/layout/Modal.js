// import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useValudasData } from "../../../context/Storage";

// delete modal
const DeleteModal = ({ isDeleteOpen, onCloseDelete, onDelete, itemId }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleDelete = () => {
    if (isCheckboxChecked) {
      onDelete(itemId);
      onCloseDelete();
      setIsCheckboxChecked(false);
    } else {
      toast.error("Please check First");
    }
  };

  return (
    <>
      {isDeleteOpen && (
        <div
          style={{
            display: "block",
            zIndex: "1",
            fontSize: "15px",
            padding: "25px",
            position: "fixed",
            top: "195px",
            backgroundColor: "#f9f9f9",
            border: "1px solid #000",
            fontWeight: "bolder",
            borderRadius: "5px",
            overflow: "hidden",
            left: "480px",
            width: "35%",
            height: "220px",
          }}
        >
          <div
            style={{
              display: "block",
              fontSize: "15px",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <div className=" ">
              <button
                type="button"
                style={{
                  backgroundColor: "#db504a",
                  color: "#fff",
                  border: "none",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  padding: "3px 8px",
                  cursor: "pointer",
                }}
                onClick={onCloseDelete}
              >
                {/* <X /> */}
              </button>

              <div className="sub_container ">
                <div className=" ">
                  <p>Are You Sure For Delete This Item ?</p>
                  <br />
                  <input
                    id="check"
                    name="check"
                    type="checkbox"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  />{" "}
                  <label
                    id="check"
                    htmlFor="check"
                    style={{ cursor: "pointer" }}
                  >
                    Yes, I'm sure!
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "25px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      backgroundColor: "#3c91e6",
                      border: "none",
                      color: "#FFF",
                      marginTop: "5px",
                      padding: "5px 10px",
                      marginRight: "5px",
                      borderRadius: "5px",
                    }}
                    onClick={onCloseDelete}
                  >
                    CANCLE
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    style={{
                      backgroundColor: "#db504a",
                      border: "none",
                      color: "#FFF",
                      marginTop: "5px",
                      padding: "5px 10px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// photo gallery modal

// PhotosGallery component
const PhotosGallery = ({ isGalleryOpen, onGalleryClose, onSelectImage }) => {
  const { portImages } = useValudasData([]);

  const handleImageClick = (index) => {
    onSelectImage(portImages[index].portfolio_photo, portImages[index].id);
  };

  return (
    <>
      <div
        style={{
          display: isGalleryOpen ? "block" : "none",
          zIndex: 4,
          fontSize: "15px",
          padding: "25px",
          position: "fixed",
          top: "10rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #000",
          fontWeight: "bolder",
          borderRadius: "5px",
          overflowX: "hidden",
          overflowY: "auto",
          right: "2rem",
          width: "35%",
          height: "30rem",
        }}
      >
        <button
          onClick={onGalleryClose}
          style={{
            backgroundColor: "#db504a",
            color: "#fff",
            border: "none",
            position: "absolute",
            top: "0",
            right: "0",
            padding: "3px 8px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
        <div
          className="gallery"
          style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        >
          {portImages.map((image, index) => (
            <img
              key={index}
              src={`/upload/${image.portfolio_photo}`}
              alt={`portfolio ${index}`}
              onClick={() => handleImageClick(index)}
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export { DeleteModal, PhotosGallery };
