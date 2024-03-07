// export const SendEmail = (email) => {
//     const emailParams = {
//         to_email: email,
//         from_name: "remotesphere@gmail.com",
//         subject: "RemoteSphere Password Reset",
//         buttonLink: `${process.env.REACT_APP_FRONTEND_URL}/reset-password?token=${resetToken}`,
//         button: "Reset Password",
//         message: "Please reset you password through the link below",
//     };
//     emailjs
//         .send(
//             process.env.REACT_APP_EMAIL_SERVICE_KEY,
//             process.env.REACT_APP_EMAIL_PROJECT_TEMPLATE_KEY,
//             emailParams,
//             process.env.REACT_APP_EMAIL_USER_KEY
//         )
//         .then(
//             (result) => {
//                 navigate("/login");
//                 toast({
//                     position: "top-right",
//                     title: "Password Reset Email Sent",
//                     description:
//                         "Check your email for instructions to reset your password.",
//                     status: "success",
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             },
//             (error) => {
//                 toast({
//                     position: "top-right",
//                     title: "Error Sending Password Reset Email",
//                     description: error.response.data.message,
//                     status: "error",
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             }
//         )
//         .finally(() => {
//             setIsLoading(false);
//         });
// };