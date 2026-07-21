import z from 'zod';

export const registerSchema = z.object({
    email: z.email({ error: "E-mail inválido!" }),
    password: z.string().min(1, { error: "Senha é obrigatória!" }),
    confirmPassword: z.string().min(1, { error: "Senha é obrigatória!" }),
}).refine((data) => data.password === data.confirmPassword, {
    error: "As senhas não coincidem",
    path: ["confirmPassword"]
});

export const loginSchema = z.object({
    email: z.email({ error: "E-mail inválido!" }),
    password: z.string().min(1, { error: "Senha é obrigatória!" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;