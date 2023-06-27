---
layout: post
title: "Four Door Monty Hall"
author: "Ben Zhang"
categories: journal
tags: [cse312, probability, monty hall, monty, hall, puzzle]
---

Today we will explore a variant of the Monty Hall problem. The puzzle is as follows:

> You are on a game show, and you are given the choice of four doors. Behind three of them are goats, and behind the fourth is a car. 
>
> As the contestant, you first randomly choose a door. Monty (the game show host) opens one of the other three doors, which reveals a goat, and asks if you want to stick to your original choice or switch to one of the two other unopened doors. After you decide, Monty opens another door (other than your current pick) which also reveals a goat. At this point, you get one more choice: stick to your current door or switch to the last unopened door. What should you do?

We will find the most optimal strategy through a formal approach. Note that we assume the car is assigned to a door at random (if the game was rigged then it wouldn't be fun). 

Let the doors be labeled $A, B, C, D$. Let $T_i$ be the event that we switch on the $i^\text{th}$ pick, and let $F_i$ be the event that we don't switch on the $i^\text{th}$ pick. Since we get to pick twice, there are four strategies:

$$ \{ \,F_1F_2\,,\, F_1T_2\,,\, T_1F_2\,,\, T_1T_2 \,\} \;. $$

