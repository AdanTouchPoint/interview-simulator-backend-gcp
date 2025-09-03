declare module "*.png" {
    const value: string;
    export default value;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { readonly [key:string]: string };
  export default classes;
}

declare namespace Express {
    interface Request {
        user?: {
            id: string;
            name: string;
            lastName: string;
            city: string;
            roles: string;
        };
    }
}