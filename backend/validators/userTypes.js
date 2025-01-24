const z = require("zod");

const userSignUpSchema = z.object({
   username: z.string().email({message:"Invalid Email Address"}),
   password: z.string().min(8,{message:"Password must be atleast 8 characters"}),
   firstName: z.string(),
   lastName: z.string()
});

const userSignInSchema = z.object({
   username: z.string().email({message:"Invalid Email Address"}),
   password: z.string()
});
// const user = {
//    username: "yash.com",
//    firstName: "yash",
//    lastName: "Jain",
//    password: "askdfl",
// }
//  console.log(userSchema.safeParse(user).error);

const userUpdateSchema =  z.object({
   password: z.string().min(8,{message:"Password must be atleast 8 characters"}).optional(),
   firstName: z.string().optional(),
   lastName: z.string().optional()
});

module.exports = { userSignUpSchema, userSignInSchema ,userUpdateSchema};