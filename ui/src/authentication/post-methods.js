import { domainDetails } from "../site-information";
import { ServerCallHeaders } from "../utils/headers";

export const POST_METHOD = async (type, body) => {
  try {
    const result = await fetch(
      domainDetails.server + type,
      ServerCallHeaders("POST", body)
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
