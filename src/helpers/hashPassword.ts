import brcypt from 'bcryptjs';

export const hashPassword = async(password: string): Promise<string> => {
    const salt = await brcypt.genSalt(10);

    const hashedPassword = await brcypt.hash(password, salt);

    return hashedPassword;
}