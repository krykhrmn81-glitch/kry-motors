import { createUploadthing, type FileRouter } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  vehicleImages: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Uploaded file:", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { POST } = createRouteHandler({
  router: ourFileRouter,
});
