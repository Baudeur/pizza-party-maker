# Introduction
## Welcome to
<img src="/src/assets/Title.png" width=500px/>

This little website is a tool to plan your pizza party.
More specifically, it will help you choose the right amount of specific diet pizzas for your guests.
For instance, imagine you want to create a buffet of pizza for <span style="color:rgb(219 39 119); font-weight:bold">7 persons</span>,
- one of them is <span style="color:rgb(22 163 74); font-weight:bold">vegetarian</span>
- 2 are <span style="color:rgb(37 99 235); font-weight:bold">pesco-vegetarian</span>
- one is <span style="color:rgb(234 88 12); font-weight:bold">vegan</span>
- the last 3 eats meat (I will call them <span style="color:rgb(220 38 38); font-weight:bold">omnivorous</span> for simplicity).

**How much of which pizza should you order?**

One might make the assumption that you can order
- <span style="color:rgb(220 38 38); font-weight:bold">3 pizzas with meat</span>
- <span style="color:rgb(37 99 235); font-weight:bold">2 with fish</span>
- <span style="color:rgb(22 163 74); font-weight:bold">one vegetarian</span>
- <span style="color:rgb(234 88 12); font-weight:bold">one vegan</span>

But one would be **wrong!**

### Theorem

Introducing the completely made-up theorem: 
**The theorem of everyone loves the 4 cheese**

That's right! One very common choice for a <span style="color:rgb(22 163 74); font-weight:bold">vegetarian</span> pizza is the 4 cheese, but <span style="color:rgb(220 38 38); font-weight:bold">omnivorous</span> and <span style="color:rgb(37 99 235); font-weight:bold">pesco-vegetarian</span> will eat a bit of that too.

Once the most permissive pizzas in terms of diet are depleted, the remaining slices will be exclusive to the most permissive diets. Leaving restrictive diets behind.

One might have already noted that, in such circumstances, even one single pizza with meat will give advantage to <span style="color:rgb(220 38 38); font-weight:bold">omnivorous</span> people. One is right, but this problem can be greatly mitigated. We'll see how.

## How to use

**But how can this website help me plan a great pizza party?**

The website is divided in 3 distincts panels:

- The People Panel: This panel lets you configure the diets of your guests
- The Pizza Panel: This panel lets you choose which pizza you want to order
- The Result Panel: This panel give you insights on your plan and help you decide

We will cover them one by one.

### The People Panel

In this panel, you will find four counters that represent how much of each diet will be at your party.

- <img src="/src/assets/Meat.png" width="25px" style="display:inline"/> Represents the <span style="color:rgb(220 38 38); font-weight:bold">omnivorous</span> people.

- <img src="/src/assets/Fish.png" width="25px" style="display:inline"/> Represents the <span style="color:rgb(37 99 235); font-weight:bold">pesco-vegetarian</span> people.

- <img src="/src/assets/Cheese.png" width="25px" style="display:inline"/> Represents the <span style="color:rgb(22 163 74); font-weight:bold">vegetarian</span> people.

- <img src="/src/assets/Carrot.png" width="25px" style="display:inline"/> Represents the <span style="color:rgb(234 88 12); font-weight:bold">vegan</span> people.    

You can add the number of each diet that will be at your pizza party.

#### The Pizza Panel

In this panel you will find a table of pizzas described by their quantity, name, diet and price. At the bottom of the table is a form to add new pizzas to the list.
In here you can put what you plan to order, since the quantity can be 0 you can also add the whole menu of the pizzeria you are ordering from and only then choose which one you want.

The diet selector let you decide up to what diet can eat it.
If you select the cheese <img src="/src/assets/Cheese.png" width="25px" style="display:inline"/>, it means that <span style="color:rgb(22 163 74); font-weight:bold">vegetarian</span>, <span style="color:rgb(37 99 235); font-weight:bold">pesco-vegetarian</span> and <span style="color:rgb(220 38 38); font-weight:bold">omnivorous</span> can eat it.

If you make a mistake, you can edit the pizzas. To do that you can either use the edit button or double click any field.

You can also delete pizzas by clicking on the trash button.

Once you have your pizza setup, you can choose the quantity on the left by hovering it and using the same controls as for the amount of people.

### The Result Panel

In this panel you will find insights about your plan. More specifically you will find how much pizza per person you have, how much money per person it will cost. And most importantly, whether every diet will have a fair share of the pizzas or not.

The slices is the exact number of slices per person, the pizza is an approximation with understandable numbers (1/2, 1/4, 7/8) of what it represents.

The fairness for every diet is represented by flag giving qualitative results like this:
*(Here we take the example of the vegetarian flag)*

- <span style="color:rgb(2 132 199); font-weight:bold">Perfect</span>: This flag means that vegetarians eat exactly as much as the diet that eats the most.- <span style="color:rgb(22 163 74); font-weight:bold">Good</span>: This flag means that the diet that eats the most eats less that 125% of what vegetarians eat.
- <span style="color:rgb(202 138 4); font-weight:bold">Okay</span>: This flag means that the diet that eats the most eats between 125% and 150% of what vegetarians eat.
- <span style="color:rgb(220 38 38); font-weight:bold">Bad</span>: This flag means that the diet that eats the most eats more that 150% what vegetarians eat.
- <span style="color:rgb(147 51 234); font-weight:bold">Can't eat</span>: This flag means that there is nothing to eat for vegetarians.
- <span style="color:rgb(150 150 150); font-weight:bold">N/A</span>: This flag means that there is no vegetarians in the party.

Overall you should aim for having every diet marked as <span style="color:rgb(22 163 74); font-weight:bold">Good</span>, <span style="color:rgb(2 132 199); font-weight:bold">Perfect</span> is unattainable unless you take only pizzas that everyone can eat.

On the result panel there are also three element that you can expand:

#### Graphs
The graphs panel represents the number of people and number of pizzas on a bar chart. It might help you figure out what to change in your plan.
#### Details
The details panel shows you what to expect in terms of reparition of the food. With numbers this time.
#### Params
The params panel allow you to choose in how many slices each pizza have.
          
## Thanks

Thanks for using Pizza Party Maker, have a nice Pizza Party!

Created by Bertrand Baudeur