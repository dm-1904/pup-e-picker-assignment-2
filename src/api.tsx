import { Dog } from "./types";

export type RequestsType = {
  getAllDogs: () => Promise<Dog[]>;
  postItem: (note: Omit<Dog, "id">) => Promise<Dog>;
  deleteItem: (id: number) => Promise<void>;
  updateItem: (id: number, updatedItem: Partial<Dog>) => Promise<Dog | null>;
};

const API_URL = "http://localhost:3000";

export const Requests: RequestsType = {
  // should return a promise with all info in the database
  getAllDogs: () => {
    return fetch(`${API_URL}/dogs`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`HTTP Request failed with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error("Error fetching dogs", error);
        throw new Error(
          `Fetching all dogs failed with error: ${error.message}`
        );
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
        }
        throw new Error(`HTTP POST failed with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error("Error creating dog", error);
        throw new Error(`Posting dog failed with error: ${error.message}`);
      });
  },
  // should delete an item from the database
  deleteItem: (id: number): Promise<void> => {
    return fetch(`${API_URL}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete dog with status ${res.status}`);
        }
      })
      .catch((error: Error) => {
        console.error("Error deleting dog", error);
        throw new Error(`Deleting dog failed with error: ${error.message}`);
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
        }
        throw new Error(`Failed to update item with status ${res.status}`);
      })
      .catch((error: Error) => {
        console.error("Error updating item", error);
        throw new Error(`Failed to PATCH item with error: ${error.message}`);
      });
  },
};
