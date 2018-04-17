# Bangazon

NOTE: This was a group project between five group members (myself included). 

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
8. Leave Bangazon!
>
```

In order to run this project run the following commands from within the appropriate directory.

```
npm install
npm start
```

# Creating New Customer

### Description

 Users are able to create new customer accounts by selection option #1 from the Main Menu then filling out the following prompts:

```
Enter a customer name (First Name):
Enter a customer name (Last Name):
Enter a street address:
Enter City: 
Enter State: 
Enter Postal Code: 
Enter Phone: 
```
Once the customer has been added the user will see an alert that indicates the user has been successfully added.

# SET ACTIVE CUSTOMERS

### Description

Users are able to choose an active customer from the command line (Main Menu option #2).

- Select number 2 from the command line.
- You should see a list of all customers.
- Enter a customer ID number and hit enter.
- After selecting a customer you should be directed back to the initial Welcome prompt. There will be a message within the prompt that indicates which customer is now listed as your active customer.


# DELETING A PRODUCT

### Description

Users are able to delete a customer's product only if it is not linked to an existing customer order.

### Active Customer Must Be Selected

Users should not be able to delete a product if an active customer has not been selected. If a user attempts to delete a product prior to selecting an active customer they will see the following message:
`
You cannot delete a product until you select an active customer. Please choose an active customer to continue.
`

### Delete Product not linked to an order

Users should be able to delete a product if it is not linked to an order. To delete a product, first select an active customer then choose number 7 from the Main Menu prompt. If the product was successfully delete the user will get the following message:
`
The product was successfully deleted!
`

If a user attempts to delete a product that is assigned to an order the user will see the following message:
`
The product you selected is either attached to an existing order and can't be deleted, or does not exist. Please try again.
`

# Add a Product

### Description

Users are able to add a product to sell once they have selected the correct active customer.

If the user tries to add a product (Main Menu option #4) before selecting a customer, it will throw an error and put the user back into the main menu.
Once the user selects an active customer, he or she will choose option 4 and start inputting the data needed for a new product. If the user tries to put a word in for the quantity or price, it will throw an error and tell the user to put in a number.
After the user completes the process of adding a product, they are alerted that their product has been succssefully added.

# Adding a Payment Type

### Description

When an active customer is selected, the user is is able to then add a payment option for that customer.

In order to add a payment type follow these steps:
- Select option 3 from the Main Menue to add payment type for the active customer
- Follow the prompts to enter the required information:
```
Enter Payment Type
Enter Account number
```

### Adding a Product to a Customer's Cart

Users are able to add a product(s) to the Active Customer's Cart using the prompt, after the Active Customer has been selected.

**Active Customer Must Be Selected**
Users will not be able to add a Product to the Customers Cart if an active customer has not been selected. If you select #5 from the main menu before choosing an active customer, you will see the following error message: 

```
You cannot add products to the cart until you select an active customer. Please choose an active customer to continue.
```
**Select the product to be added to the cart**
After an active customer has been selected, proceed to the product list by selecting option # 5 on the Welcome Menu. Once selected, the user will be presented with a list of ALL products. The user must then input a number that corresponds to the product they wish to add. If they do not select a number that corresponds to a product, they will receive the following error message: 

```
You did not enter a valid option. Please try again!
```

***Select the quantity of the Product to be added to the Order***
Once a product has been selected, the User will be presented with a prompt to enter a total Quantity. The user will enter a number for the quantity they wish to add to their cart. If the quantity entered is not available, the User will be presented with a message notifying them how many of the product is available. Ex:

```
I'm sorry but there are only X items available to be added to your cart, please enter another quantity.
```
Once the user has entered an available quantity, the will receive a message notifying them of such. If no active order exists for the customer, an order will be created with the product added, and the customer will receive the following message: 

```
Your Order has been created!
```
If an active order already exists for the customer, the product will be added to the order, and the customer will receive the following message: 

```
Your Order has been updated with your product(s)
```
Once a product has been added to an order, the User will be returned to the Welcome Menu. 


**Complete a payment**
    1. select active customer 
    2. enter 6 on the command line to complete an order
    3. CLI will prompt with current order total, enter Y or N
        1. if N CLI will exit with console log (‘You chose to not complete your order!’)
    4.  If Y CLI will prompt to chose a payment option, enter the number of the payment option that is chosen
    5. Console will log payment completed, run npm test or refresh the database to view successful update 
# RUNNING TESTS

To initiate the testing run the following commands in this exact order:
```
node db/build_table.js
npm test test/order.test.js
npm test test/paymentType.test.js
npm test test/product.test.js
npm test test/order_product.test.js
npm test test/customer.test.js

```






