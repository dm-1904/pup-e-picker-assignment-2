import { createContext } from "react";
import { z } from "zod";

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
  displayAll: z.boolean(),
  setDisplayAll: z.function().args(z.boolean()).returns(z.void()),
  displayFavorites: z.boolean(),
  setDisplayFavorites: z.function().args(z.boolean()).returns(z.void()),
  displayUnfavorites: z.boolean(),
  setDisplayUnfavorites: z.function().args(z.boolean()).returns(z.void()),
  handleTabChange: z
    .function()
    .args(z.enum(["create", "fav", "unfav", "none"]))
    .returns(z.void()),
});
//Lines 15-18 defines a Zod schema for the context object.
//This schema specifies that the context object should have:
//allDogs: an array of Dog objects
//setAllDogs: a function that takes a array of Dog objects as args and returns void

export type AllDogContextType = z.infer<typeof allDogContextSchema>;
//Line 24 creates a TypeScript type AllDogContextType inferred from the
//allDogContextSchema. This type will be used to type the context.

const initialDogContext: AllDogContextType = {
  allDogs: [],
  setAllDogs: (dogs: Dog[]) => {
    initialDogContext.allDogs = dogs;
  },
  activeTab: "none",
  setActiveTab: (tab: TActiveTab) => {
    initialDogContext.activeTab = tab;
  },
  displayAll: true,
  setDisplayAll: (display: boolean) => {
    initialDogContext.displayAll = display;
  },
  displayFavorites: false,
  setDisplayFavorites: (display: boolean) => {
    initialDogContext.displayFavorites = display;
  },
  displayUnfavorites: false,
  setDisplayUnfavorites: (display: boolean) => {
    initialDogContext.displayUnfavorites = display;
  },
  handleTabChange: function (): void {
    throw new Error("Function not implemented.");
  },
};
//Lines 28-33 defines the initial context object initialDogContext with:
//  allDogs: an empty array
//  setAllDogs: a function that updates the allDogs array in the initialDogContext object

export const AllDogContext =
  createContext<AllDogContextType>(initialDogContext);
//Lines 38-39 creates a React context AllDogContext with the inital value
//initialDogContext and typing it with AllDogContextType.

export type TActiveTab = "fav" | "unfav" | "create" | "none";
