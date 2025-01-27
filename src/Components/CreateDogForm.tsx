import { useContext, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { AllDogContext } from "../types";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const { isLoading, setIsLoading, name, description, picture } =
      useContext(AllDogContext);

    const handleCreateDog = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      const newDog = {
        name,
        description,
        image: picture,
        isFavorite: false,
      };
      // Requests.postItem(newDog).then(() => {});
    };

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input type="text" />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option
                value={pictureValue}
                key={pictureValue}
              >
                {label}
              </option>
            );
          })}
        </select>
        <input
          type="submit"
          value="submit"
        />
      </form>
    );
  };
