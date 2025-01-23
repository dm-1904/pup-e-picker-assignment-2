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

const initialDog = dogSchema.parse({
  id: 0,
  name: "",
  image: "",
  description: "",
  isFavorite: false,
});

export const AllDogContext = createContext(initialDog);
