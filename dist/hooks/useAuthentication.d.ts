export declare const useAuthentication: () => {
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
    reloadUser: () => Promise<void>;
};
//# sourceMappingURL=useAuthentication.d.ts.map