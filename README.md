# Bangazon

## The Command Line Ordering System

In this group project, users are able to interact with a basic product ordering database via a command line interface.

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
9. Leave Bangazon!
>
```

In order to run this project run the following commands from within the appropriate directory.

```
npm install
npm start
```


# SET ACTIVE CUSTOMERS

### Description

Users are able to choose an active customer from the command line (Main Menu option #2).

- Select number 2 from the command line.
- You should see a list of all customers.
- Enter a customer ID number and hit enter.
- After selecting a customer you should be directed back to the initial Welcome prompt. There will be a message within the prompt that indicates which customer is now listed as your active customer.


### RUNNING TESTS

To initiate the testing run the following command:
```
npm test
```
- There should be 8 test that pass.


# DELETING A PRODUCT

### Description

Users are able to delete a customer's product only if it is not linked to an existing customer order.

### Active Customer Must Be Selected

Users should not be able to delete a product if an active customer has not been selected. If a user attempts to delete a product prior to selecting an active customer they will see the following message:
```
You cannot delete a product until you select an active customer. Please choose an active customer to continue.
```

### Delete Product not linked to an order

Users should be able to delete a product if it is not linked to an order. To delete a product, first select an active customer then choose number 7 from the Main Menu prompt. If the product was successfully delete the user will get the following message:
```
The product was successfully deleted!
```

If a user attempts to delete a product that is assigned to an order the user will see the following message:
```
The product you selected is either attached to an existing order and can't be deleted, or does not exist. Please try again.
```



