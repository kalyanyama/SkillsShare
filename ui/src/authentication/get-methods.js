import { domainDetails } from "../site-information";
import { ServerCallHeaders } from "../utils/headers";

export const GET_METHOD = async (type) => {
  try {
    const result = await fetch(
      domainDetails.server + type,
      ServerCallHeaders()
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
