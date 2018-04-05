# Bangazon

## The Command Line Ordering System

In this group project, you will be allowing a user to interact with a basic product ordering database via a command line interface.

## Ordering System Interface

### Main Menu

```bash
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************
1. Create a customer account
2. Choose active customer
3. Create a payment option
4. Add product to sell
5. Add product to shopping cart
6. Complete an order
7. Remove customer product
8. Update product information
9. Show stale products
10. Show customer revenue report
11. Show overall product popularity
12. Leave Bangazon!
>
```


## SET ACTIVE CUSTOMERS

# Description

This pull request completes all requirements for issue #2. Users are now able to choose an active customer from the command line. We also introduced a test for the getAll customers function.


## Type of change

- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [x] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [x] This change requires a documentation update

# How Has This Been Tested?

To test the command line run the following commands:
```
npm start
```
- Select number 2 from the command line.
- You should see a list of all customers.
- Enter a customer ID number and hit enter.
- After selecting a customer you should be directed back to the initial Welcome prompt. There will be a message within the prompt that indicates which customer is now listed as your active customer.


**RUNNING TESTS**

To initiate the testing run the following command:
```
npm test
```
- There should be 8 test that pass.


# Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [x] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes

