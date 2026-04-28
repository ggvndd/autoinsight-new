# Example: User Journey Map

> [!NOTE] 
> This is a generalized example of a User Journey Map for a standard "User Registration & Onboarding" process. Use this structure as a reference when building journey maps for your actual projects.

## 1. Persona Description
- **Role:** New Customer
- **Goal:** Successfully register an account and complete the initial profile setup to access the platform's core features.

## 2. Stages of the Journey
1. **Discovery & Landing**
2. **Account Creation**
3. **Email Verification**
4. **Profile Onboarding**

## 3. Journey Details

### Stage 1: Discovery & Landing
- **User Actions:** User visits the homepage and navigates to the pricing or features page.
- **Touchpoints:** `Homepage`, `Pricing Page`, `Get Started` Button.
- **System Interactions:** System loads marketing site (latency < 100ms).

### Stage 2: Account Creation
- **User Actions:** User fills out the registration form with email and password.
- **Touchpoints:** `Registration Form`, `Submit` Button.
- **System Interactions:** 
  - Frontend validates email format and password strength.
  - Backend `POST /api/v1/users/register` creates the unverified account.
  - System dispatches verification email via SendGrid.

### Stage 3: Email Verification
- **User Actions:** User opens their email client, finds the email, and clicks the verification link.
- **Touchpoints:** Email Client, `Verify Email` Link.
- **System Interactions:** 
  - Link redirects to frontend route `/verify?token=abc`.
  - Frontend calls `POST /api/v1/auth/verify-email`.
  - Backend validates token and updates DB status to `VERIFIED`.

### Stage 4: Profile Onboarding
- **User Actions:** User logs in for the first time and is prompted to enter their name and company details.
- **Touchpoints:** `Onboarding Modal`, `Save Profile` Button.
- **System Interactions:** 
  - `PUT /api/v1/users/me/profile`.
  - Backend updates the `users` table and redirects user to the main `Dashboard`.

## 4. Friction Points & Latency Tracking
- **Email Verification Delay:** Emails can sometimes take 1-2 minutes to arrive. We need a clear "Resend Email" button on the UI if they get stuck.
- **Password Constraints:** Strict password constraints might cause form errors. Ensure inline validation clearly explains the requirements *before* they click submit.
