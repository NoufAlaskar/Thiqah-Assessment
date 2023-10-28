import Data from "../../../Data";


  export const handleDelete = (id) => {
    const subscriptions = Data()
const setSubscriptions = Data()
        const updatedSubscriptions = subscriptions.filter((item) => item.id !== id);
        setSubscriptions(updatedSubscriptions);
      };
