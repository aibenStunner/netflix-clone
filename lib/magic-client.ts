import { Magic } from "magic-sdk";

export const createMagic = () => {
  if (typeof window !== "undefined")
    return new Magic(
      process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY as string
    );
};

export const magic = createMagic();
