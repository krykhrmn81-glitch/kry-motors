import { createUploadthing } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileCount: 10, maxFileSize: "4MB" },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded file:", file.url);

    return {
      url: file.url, // client'a dönecek değer
    };
  }),
};

export type OurFileRouter = typeof ourFileRouter;
