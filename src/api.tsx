// const getAllDogs = () => {
//   // fill out method
// };

// const postDog = () => {
//   // fill out method
// };
// const deleteDogRequest = () => {
//   // fill out method
// };

// const patchFavoriteForDog = () => {
//   // fill out method
// };

// export const Requests = {
//   postDog,
//   deleteDogRequest,
//   patchFavoriteForDog,
//   getAllDogs,
// };

import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

const API_URL = "http://localhost:3000";

export const Requests = {
  // should return a promise with all info in the database
  getAllRequests: (): Promise<Dog[]> => {
    return fetch(`${API_URL}/types`)
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<Dog[]>;
        } else {
          throw new Error("Failed to fetch dogs");
        }
      })
      .catch((error) => {
        console.error("Error fetching dogs", error);
        return [];
      });
  },
  // should create an item in the database from a partial item object
  // and return a promise with the result
  postItem: (note: Omit<Dog, "id">) => {
    return fetch(`${API_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to create dog");
        }
      })
      .catch((error) => {
        console.error("Error creating dog", error);
        return null;
      });
  },
  // should delete an item from the database
  deleteItem: (id: number): Promise<void> => {
    return fetch(`${API_URL}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete dog");
        }
      })
      .catch((error) => {
        console.error("Error deleting dog", error);
      });
  },
  updateItem: (id: number, updatedItem: Partial<Dog>): Promise<Dog | null> => {
    return fetch(`${API_URL}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<Dog>;
        } else {
          throw new Error("Failed to update item");
        }
      })
      .catch((error) => {
        console.error("Error updating item", error);
        return null;
      });
  },
};
