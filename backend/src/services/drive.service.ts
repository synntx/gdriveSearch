import { google } from "googleapis";

export const getDriveClient = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return google.drive({ version: "v3", auth: oauth2Client });
};

export const getFileContent = async (
  fileId: string,
  accessToken: string,
): Promise<string> => {
  const drive = getDriveClient(accessToken);

  try {
    const fileMetadata = await drive.files.get({
      fileId,
      fields: "mimeType,name",
    });

    const response = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      {
        responseType: "stream",
      },
    );

    console.log("fileMetadata", fileMetadata);
    console.log("response", response);

    return new Promise((resolve, reject) => {
      let data = "";
      response.data
        .on("data", (chunk: Buffer) => {
          data += chunk.toString();
        })
        .on("end", () => {
          resolve(data);
        })
        .on("error", (err: Error) => {
          reject(err);
        });
    });
  } catch (error) {
    console.error(`Error retrieving content for file ${fileId}:`, error);
    throw error;
  }
};
