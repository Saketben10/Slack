import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";
export const useChannelId = () => {
  const params = useParams();
  console.log(params);
  console.log(params.channeId);

  return params.channeId as Id<"channels">;
};
