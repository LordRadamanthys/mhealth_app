import UserInterface from "./UserInterface";

export default interface ProviderLoginInterface{
    signed: boolean,
    user: UserInterface | null
    login(email: string, password: string): Promise<void>
    clearUser(): void
    getData(): void
}