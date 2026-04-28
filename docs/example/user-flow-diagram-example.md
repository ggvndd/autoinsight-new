# Example: User Flow Diagram

> [!NOTE] 
> This is a generalized example of a User Flow Diagram for a standard "User Login & Password Reset" process. Use this to understand how to map out complex edge cases.

## Flow 1: Standard Login with 2FA

### Description
The flow of an existing user attempting to log in, including the edge case where they have Two-Factor Authentication (2FA) enabled.

### Sequence/Diagram

```mermaid
graph TD;
    A[Login Page] -->|Submits Form| B(Frontend Validates Inputs);
    B -->|Invalid| C[Show Form Errors];
    B -->|Valid| D[POST /api/v1/auth/login];
    
    D --> E{Backend Validates Credentials};
    E -->|Invalid| F[Show 'Invalid Email/Password'];
    
    E -->|Success| G{Is 2FA Enabled?};
    
    G -->|No| H[Set HttpOnly Cookie & Redirect to Dashboard];
    
    G -->|Yes| I[Redirect to /2fa-challenge];
    I --> J[User Enters OTP];
    J --> K[POST /api/v1/auth/verify-2fa];
    
    K --> L{Valid OTP?};
    L -->|No| M[Show 'Invalid Code'];
    L -->|Yes| H;
```
