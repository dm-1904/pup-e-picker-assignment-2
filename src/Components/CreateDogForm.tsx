import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../context/UseDogs";

export const CreateDogForm = () =>
  // no props allowed
  {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [picture, setPicture] = useState<string>(
      Object.values(dogPictures)[0]
    );
    const { isLoading, handleCreateDog } = useDogs();

    const dogData = {
      name,
      description,
      image: picture,
    };

    return (
      <form
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateDog(dogData).catch(() => `Failed to create dog`);
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
