class User {
    private id: number;
    private username: string;
    private email: string;
    private password: string;
    private confirmPassword: string;

    constructor(id: number, username: string, email: string, password: string, confirmPassword: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    getId() : number {
        return this.id;
    }
    getUsername() : string {
        return this.username;
    }
    getEmail() : string {
        return this.email;
    }
    getPassword() : string {
        return this.password;
    }
    getConfirmPassword() : string {
        return this.confirmPassword;
    }
}