const z = require("zod");

const accountSchema = z.object({
    userId: z.string(),
    balance: z.number()
}) 

const transactionSchema = z.object({
    amount: z.number().min(1),
    to: z.string()
})

module.exports = { accountSchema,transactionSchema };