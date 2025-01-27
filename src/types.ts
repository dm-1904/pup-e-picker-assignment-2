import { createContext } from "react";
import { z } from "zod";
import { Requests } from "./api";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;
//Line 12 creates a typescript type Dog inferred from the dogSchema.

export const allDogContextSchema = z.object({
  allDogs: z.array(dogSchema),
  setAllDogs: z.function().args(z.array(dogSchema)).returns(z.void()),
  activeTab: z.enum(["create", "fav", "unfav", "none"]),
  setActiveTab: z
    .function()
    .args(z.enum(["create", "fav", "unfav", "none"]))
    .returns(z.void()),
  handleTabChange: z
    .function()
    .args(z.enum(["create", "fav", "unfav", "none"]))
    .returns(z.void()),
  isLoading: z.boolean(),
  setIsLoading: z.function().args(z.boolean()).returns(z.void()),
  name: z.string(),
  setName: z.function().args(z.string()).returns(z.void()),
  description: z.string(),
  setDescription: z.function().args(z.string()).returns(z.void()),
  picture: z.string(),
  setPicture: z.function().args(z.string()).returns(z.void()),
  fetchAndSetAllDogs: z.function().returns(z.promise(z.void())),
  // renderDogCards: z
  //   .function()
  //   .args(z.array(dogSchema))
  //   .returns(z.array(z.unknown())),
});
//Lines 15-18 defines a Zod schema for the context object.
//This schema specifies that the context object should have:
//allDogs: an array of Dog objects
//setAllDogs: a function that takes a array of Dog objects as args and returns void

export type AllDogContextType = z.infer<typeof allDogContextSchema>;
//Line 24 creates a TypeScript type AllDogContextType inferred from the
//allDogContextSchema. This type will be used to type the context.

export type TActiveTab = "fav" | "unfav" | "create" | "none";

const initialDogContext: AllDogContextType = {
  allDogs: [],
  setAllDogs: (dogs: Dog[]) => {
    initialDogContext.allDogs = dogs;
  },
  activeTab: "none",
  setActiveTab: (tab: TActiveTab) => {
    initialDogContext.activeTab = tab;
  },

  handleTabChange: function (): void {
    throw new Error("Function not implemented.");
  },
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    initialDogContext.isLoading = isLoading;
  },
  name: "",
  setName: (name: string) => {
    initialDogContext.name = name;
  },
  description: "",
  setDescription: (description: string) => {
    initialDogContext.description = description;
  },
  picture: "",
  setPicture: (picture: string) => {
    initialDogContext.picture = picture;
  },
  fetchAndSetAllDogs: async () => {
    initialDogContext.setIsLoading(true);
    try {
      const dogs = await Requests.getAllRequests();
      initialDogContext.setAllDogs(dogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      initialDogContext.setIsLoading(false);
    }
  },
  // renderDogCards: (dogs: Dog[]): JSX.Element[] => {
  //   return dogs.map((dog) => (
  //     <div key={dog.id}>
  //       <DogCard
  //         dog={dog}
  //         onTrashIconClick={() => {
  //           initialDogContext.setIsLoading(true);
  //           Requests.deleteItem(dog.id)
  //             .then(() => initialDogContext.fetchAndSetAllDogs())
  //             .finally(() => initialDogContext.setIsLoading(false));
  //         }}
  //         onHeartClick={() => {
  //           initialDogContext.handleFavoriteClick(dog).catch((error) => {
  //             console.error("Error handling favorite click:", error);
  //           });
  //         }}
  //         onEmptyHeartClick={() => {
  //           initialDogContext.handleFavoriteClick(dog).catch((error) => {
  //             console.error("Error handling favorite click", error);
  //           });
  //         }}
  //         isLoading={initialDogContext.isLoading}
  //       />
  //     </div>
  //   ));
  // },
};

//Lines 28-33 defines the initial context object initialDogContext with:
//  allDogs: an empty array
//  setAllDogs: a function that updates the allDogs array in the initialDogContext object

export const AllDogContext =
  createContext<AllDogContextType>(initialDogContext);
//Lines 38-39 creates a React context AllDogContext with the inital value
//initialDogContext and typing it with AllDogContextType.

// function setAllDogs(
//   dogs: {
//     id: number;
//     name: string;
//     image: string;
//     description: string;
//     isFavorite: boolean;
//   }[]
// ) {
//   throw new Error("Function not implemented.");
// }

// function setIsLoading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
