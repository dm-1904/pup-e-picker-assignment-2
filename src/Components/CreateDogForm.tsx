import { useContext, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { AllDogContext } from "../types";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
    const {
      isLoading,
      setIsLoading,
      name,
      description,
      picture,
      fetchAndSetAllDogs,
      setName,
      setDescription,
      setPicture,
      handleTabChange,
    } = useContext(AllDogContext);

    // const handleTabChange = (tab: string): void => {
    //   // Implement the tab change logic here
    //   console.log(`Tab changed to: ${tab}`);
    // };

    const handleCreateDog = (e: React.FormEvent): void => {
      e.preventDefault();
      setIsLoading(true);
      const newDog = {
        name,
        description,
        image: picture,
        isFavorite: false,
      };
      console.log(newDog);
      Requests.postItem(newDog)
        .then(() => {
          fetchAndSetAllDogs().catch((error) => {
            console.error("Failed to fetch and set all dogs:", error);
          });
          setName("");
          setDescription("");
          setPicture(Object.values(dogPictures)[0]);
        })
        .then(() => handleTabChange("none"))
        .then(() => toast.success(`✅ ${name} has been added! 🐾`))
        .finally(() => setIsLoading(false));
    };

    return (
      <form
        id="create-dog-form"
        onSubmit={handleCreateDog}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          id="description"
          cols={80}
          rows={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          onChange={(e) => {
            setPicture(e.target.value);
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
