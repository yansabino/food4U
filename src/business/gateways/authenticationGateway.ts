export interface AuthenticationGateway {
    generateToken(input: UsersInfoForToken): string;
    verifyToken(token: string): UsersInfoForToken;
  }
  
  // userId
  
  export interface UsersInfoForToken {
    id: string;
    email: string;
  }
  