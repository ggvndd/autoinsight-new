# Example: Use Case Diagram

> [!NOTE] 
> This is a generalized example of a Use Case Diagram for a standard "Content Management System (CMS)". Use this as a reference to understand how actors and interactions should be modeled.

## 1. Actors & Permissions
- **Guest Visitor:** Unauthenticated user browsing public posts.
- **Content Creator:** Authenticated user with permissions to write and edit their own posts.
- **System Administrator:** High-privilege user capable of managing users and deleting any post.

## 2. Diagram

```mermaid
flowchart LR
    Guest([Guest Visitor])
    Creator([Content Creator])
    Admin([System Administrator])
    
    subgraph CMS Platform
        UC1[Read Public Posts]
        UC2[Create New Post]
        UC3[Edit Own Post]
        UC4[Delete Any Post]
        UC5[Manage User Accounts]
    end
    
    Guest --> UC1
    
    Creator --> UC1
    Creator --> UC2
    Creator --> UC3
    
    Admin --> UC1
    Admin --> UC4
    Admin --> UC5
```

## 3. Critical Backend Interactions
- **Delete Any Post:** When an Admin deletes a post, the system must cascade the deletion to remove all associated comments and media attachments from the S3 bucket to prevent orphaned data.
