import toast from "react-hot-toast";

export const successNotify = (message: string) =>
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
export const errorNotify = (message: string) =>
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

// export const loadingNotify = (promise: Promise<{temp: string, temp2: string}>, loadingMessage: string) =>
//   toast.promise(
//     promise,
//     {
//       loading: loadingMessage,
//       success: (data) => `Successfully saved ${data.name}`,
//       error: (err) => `This just happened: ${err.toString()}`,
//     },
//     {
//       style: {
//         minWidth: "250px",
//       },
//       success: {
//         duration: 5000,
//         icon: "🔥",
//       },
//     }
//   );
