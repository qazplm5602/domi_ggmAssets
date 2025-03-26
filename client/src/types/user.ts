export interface UserDTO {
    email: string,
    name: string
}

export interface UserAdminDTO extends UserDTO {
    admin: boolean
}