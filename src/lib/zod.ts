import zod from 'zod';
import User from '@/types/user';

export default function zodValidation(data: User) {

    const signupSchema = zod.object({
        username: zod.string().max(25),
        password: zod.string().min(6),
        confirmpassword: zod.string().min(6),
    })

    if(data.password !== data.confirmpassword) {
        return false
    }

    const isValid = signupSchema.safeParse(data);

    if(isValid.success) {
        return true;

    } else return false;
}