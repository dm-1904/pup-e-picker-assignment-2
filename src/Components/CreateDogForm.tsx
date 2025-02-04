import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../context/UseDogs";
import toast from "react-hot-toast";

const defaultImage = dogPictures.BlueHeeler;

export const CreateDogForm = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>(defaultImage);

  const { isLoading, handleCreateDog } = useDogs();

  const dogData = {
    name,
    description,
    image: picture,
  };

  const resetStateDogData = () => {
    setName("");
    setDescription("");
    setPicture(defaultImage);
  };

  return (
    <form
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        void handleCreateDog(dogData)
          .then(() => {
            toast.success("Dog Created!");
            resetStateDogData();
          })
          .catch((error) => {
            toast.error("Failed to add dog.");
            throw error;
          });
      }}
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
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map((item) => {
          const [label, pictureValue] = item;
          return (
            <option
              value={pictureValue}
              key={pictureValue}
              selected={picture === pictureValue}
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
