---
layout: post
title: "Greedy Beans"
author: "Ben Zhang"
categories: journal
tags: [cse421, algorithms, greedy, beans, proof]
---

In our algorithms class [CSE 421](https://courses.cs.washington.edu/courses/cse421/23wi/), we were given a problem to solve that required a greedy algorithm. Not only is it an interesting problem, but I think the solution is also quite satisfying.

The problem is as follows:

> There are $n$ beans to choose from. Bean $i$ costs $c_i$ dollars per gallon and weighs $w_i$ pounds per gallon. Additionally, bean $i$ has $s_i$ gallons currently in stock. You have a bucket (with infinite volume), and your goal is to fill this bucket with the highest cost combination of beans that won't go over your weight limit of $b$ pounds. Note that you're able to fill your bucket with non-discrete quantities of beans (e.g., $0.5$ gallons or $\sqrt{2}$ gallons).

Now let's solve the problem!


## First attempt

It may be quick to believe that the greedy rule for this is to simply sort each bean by $c_i$ (its cost per gallon) in descending order, then taking as much as you can of each bean. However, consider the following counterexample:

Let $b = 10$ pounds. Suppose we have two beans:

- $\textsf{bean 1}$
  - $c_1 = 5$ dollars per gallon
  - $w_1 = 10$ pounds per gallon
  - $s_1 = 10$ gallons in stock  
- $\textsf{bean 2}$
  - $c_2 = 1$ dollar per gallon
  - $w_2 = 1$ pound per gallon
  - $s_2 = 10$ gallons in stock


Note that with our given greedy rule, $\textsf{ALG}$ will take as much of $\textsf{bean 1}$ as possible, which is $1$ gallon. This will give a cost combination of $5$ dollars. However, $\textsf{OPT}$ will take $10$ gallons of $\textsf{bean 2}$, which will give a cost combination of $10$ dollars.


## Intuition for the correct greedy rule

It's important to understand that the problem wants us to find the highest cost combination. This means we need to find the most *valuable* beans, not just the beans that cost the most upfront, since those might be the heaviest! Note that we've been conveniently provided the cost per gallon and also the weight per gallon. This allows us to define the *value* of a bean.
<br><br/>
**Definition.** The ***value*** of a bean is its cost per pound, or the ratio of its cost per gallon to its weight per gallon. Formally, this is

$$  v_i = \frac{c_i}{w_i}. $$

Now, we can refine our greedy idea.

**Key idea:** Sort by $v_i$ in descending order (breaking ties by smallest index to give some sort of determinism), then take as much as you can of each bean.


## Formal proof

Let's define some more terms before we continue:
- Let $w = \sum\limits_{i=1}^{n}w_is_i$ be the combined weight of the total supply of beans (in pounds).
- Let $m = \min(w, b)$ be the maximum weight that we can take. If $w > b$, we can only take $b$. Otherwise, we can take all of the beans, as we are only restricted by weight.
- Let $A^\textsf{SOL}$ be the set outputted from some algorithm $\textsf{SOL}$ where the $i^\text{th}$ element $a^\textsf{SOL}_i$ indicates the weight (in pounds) taken from the $i^\text{th}$ most valuable bean. Note that for all $i$, $a^\textsf{SOL}_i$ is less than or equal to the supply of the bean it corresponds to.
- Let $t^\textsf{SOL} = \sum\limits_{i=1}^{n}a^\textsf{SOL}_iv_i$ be the total cost combination outputted by $\textsf{SOL}$.

We can think of the initial set of beans given to us as a set $B$ such that

$$ B = \{b_1, b_2, \dotsc, b_n \}, $$

and its sorted version is

$$ B' = \{b'_{1}, b'_{2}, \dotsc, b'_{i_n} \}, $$

such that for $b'_i, b'_j$ where $i < j$, it must be that the value of the bean corresponding to $b'_i$ (call it $v_i$) is greater than or equal to the value of the bean corresponding to $b'_j$ (call it $v_j$).

In this case, it's possible that $v_i = v_j$ for $i < j$. However, combining beans with the same value has no difference in the final solution! Why is this? Let's see.
<br/><br/>
**Claim 1.** *As long as the cumulative weight taken is the same, any weight selection of beans with the same value does not generate a unique solution.*

*Proof.* Suppose we have two arbitrary beans, $b_i, b_j$ with the same value $v$. Let $a_i, a_j$ be the weight taken of each bean in the solution. Then the cost contribution of these two beans is $v \cdot a_i + v \cdot a_j = v(a_i + a_j)$. Since addition is commutative, we could just as easily reassign the amounts to either of $i,j$, subject to their respective supplies. As long as the cumulative weight $a_i + a_j$ stays the same, the cost contribution will stay the same. This construction can be applied recursively to any beans with the same value. We can then see that switching around weights of beans with the same value will not generate a "unique" solution (in terms of total cost combination). $\square$
<br/><br/>
Great! We can now assume that beans of the same value can be "combined" to create a **big bean**. To not get messy with notation, let's just assume that $B$ and $B'$ are the "compressed" versions of the original set of beans.

Now, it's important to show that our algorithm $\textsf{ALG}$ and the optimal solution $\textsf{OPT}$ will actually end up taking the same weight of beans. In fact, they will both take $m$ pounds of beans!
<br/><br/>
**Claim 2.** *$\textsf{ALG}$ and $\textsf{OPT}$ will both take $m$ pounds.*

*Proof.* For $\textsf{OPT}$, this is pretty trivial to see. If $\textsf{OPT}$ didn't take $m$ pounds, and instead took $m' < m$ pounds, then a new solution with $m' + \varepsilon$ pounds (for $\varepsilon > 0$) would have a higher cost combination (we know there is still more to take because $m'$ is strictly less than $m$). However, this is impossible, so $\textsf{OPT}$ must take $m$ pounds.

For $\textsf{ALG}$, we can use the same idea. Our greedy rule said to take as much as we can. This means that $\textsf{ALG}$ will continuously take from the remaining supply until we either hit the maximum weight $b$ or there are no more beans left to take, whichever comes first. By definition, this is exactly $m$ pounds. $\square$
<br/><br/>
We're super close - we need one more core claim.
<br/><br/>
**Claim 3.** *For any algorithm $\textsf{SOL}$, the only way to increase $t^\textsf{SOL}$ without increasing the total weight in the bucket is to substitute a higher valued bean in the place of a lower valued bean.*

*Proof.* Suppose we have some bean $b_i$ with value $v_i$, and that our solution $\textsf{SOL}$ has taken $a^\textsf{SOL}_i$ pounds of it. Its cost contribution is

$$a^\textsf{SOL}_iv_i.$$

Now, we take out a small chunk $0 < \varepsilon \leq a^\textsf{SOL}_i$ out of $b_i$ and replace it with a bean $b_j$ with value $v_j < v_i$. Then the total cost contribution will be

$$(a^\textsf{SOL}_i - \varepsilon) v_i + \varepsilon v_j.$$

By rearranging inequalities, we get

$$\begin{aligned}
\varepsilon v_j &< \varepsilon v_i && \text{given}\\
a^\textsf{SOL}_iv_i + \varepsilon v_j &< a^\textsf{SOL}_iv_i + \varepsilon v_i  && \text{add $a^\textsf{SOL}_iv_i$ to both sides}\\
a^\textsf{SOL}_iv_i - \varepsilon v_i + \varepsilon v_j &< a^\textsf{SOL}_iv_i  && \text{subtract $\varepsilon v_i$}\\
(a^\textsf{SOL}_i - \varepsilon)v_i + \varepsilon v_j &< a^\textsf{SOL}_iv_i  && \text{rearrange}\\
\end{aligned}$$

This means that no lower-valued bean can increase the total cost contribution without manipulating the total weight in the bucket. Note that the argument applies to any sequence of beans with values less than $v_i$.

Applying the same construction for a bean $b_h$ with value $v_h > v_i$, we get

$$ \varepsilon v_h + (a^\textsf{SOL}_i - \varepsilon)v_i > a^\textsf{SOL}_iv_i,$$

which means that higher-valued beans **can** increase the total cost contribution while keeping the total weight the same, as desired. Again, this applies to any sequence of beans with values all greater than $v_i$. $\square$
<br><br/>
We've set everything up now! Let's prove correctness.


## Correctness

We will write an **exchange** argument for our proof.

*Proof.* Let $\textsf{OPT}$ and $\textsf{ALG}$ be the optimal and greedy solutions, respectively. Again, **Claim 1** allows us to safely assume that all beans with the same value can be "combined" into a **big bean**. This guarantees that the values of each **big bean** are unique.

Now, assume for the sake of contradiction that $t^\textsf{OPT}$ is different from $t^\textsf{ALG}$. Since $\textsf{OPT}$ is the optimal solution, it must be that $t^\textsf{OPT} > t^\textsf{ALG}$. This also must mean that $A^\textsf{OPT}$ and $A^\textsf{ALG}$ are different from each other. However, they respect the same ordering, so we can find the *first* index where they differ - let $i$ be that index. Again, this means that $a^\textsf{OPT}_i \neq a^\textsf{ALG}_i$.

Note that to get to index $i$, $\textsf{ALG}$ must have taken as much as it could from indices $1,\dotsc,i-1$, and so did $\textsf{OPT}$. By the greedy rule, $\textsf{ALG}$ must have also taken as much as it could've from index $i$. Since $a^\textsf{OPT}_i \neq a^\textsf{ALG}_i$, it must be that $a^\textsf{OPT}_i < a^\textsf{ALG}_i$.

Let $x$ be the combined weight of all the beans up to (but not including) the $i^\text{th}$ bean, or

$$ x = \sum_{j=1}^{i-1} a^\textsf{ALG}_j = \sum_{j=1}^{i-1} a^\textsf{OPT}_j.$$

Note that up to and *including* the $i^\text{th}$ index, $\textsf{ALG}$ actually has a strictly greater cost contribution than $\textsf{OPT}$. At the $i^\text{th}$ index, both $\textsf{ALG}$ and $\textsf{OPT}$ have $m - x$ pounds left to process, by **Claim 2**. However, $\textsf{OPT}$ must now make up for the fact that it didn't take as much as it could at the $i^\text{th}$ index. By **Claim 3**, the only way $\textsf{OPT}$ to "make up" for the lesser cost contribution is to substitute a higher valued bean. However, every bean of greater value has no more supply! But then $t^\textsf{OPT}$ must be strictly less than $t^\textsf{ALG}$, a contradiction! Therefore, $t^\textsf{OPT} = t^\textsf{ALG}$, and thus $\textsf{ALG}$ is $\textsf{OPT}$. $\square$


## Alternate correctness proof

This proof has a little more math in it, but leaves no room for error.

*Proof.* Let $\textsf{OPT}$ and $\textsf{ALG}$ be the optimal and greedy solutions, respectively. Again, **Claim 1** allows us to safely assume that all beans with the same value can be "combined" into a **big bean**. This guarantees that the values of each **big bean** are unique.

Now, assume for the sake of contradiction that $t^\textsf{OPT}$ is different from $t^\textsf{ALG}$. Since $\textsf{OPT}$ is the optimal solution, it must be that $t^\textsf{OPT} > t^\textsf{ALG}$. This also must mean that $A^\textsf{OPT}$ and $A^\textsf{ALG}$ are different from each other. However, they respect the same ordering, so we can find the *first* index where they differ - let $i$ be that index. Again, this means that $a^\textsf{OPT}_i \neq a^\textsf{ALG}_i$.

Note that to get to index $i$, $\textsf{ALG}$ must have taken as much as it could from indices $1,\dotsc,i-1$, and so did $\textsf{OPT}$. By the greedy rule, $\textsf{ALG}$ must have also taken as much as it could've from index $i$. Since $a^\textsf{OPT}_i \neq a^\textsf{ALG}_i$, it must be that $a^\textsf{OPT}_i < a^\textsf{ALG}_i$.

Because $\textsf{ALG}$ and $\textsf{OPT}$ take the same weight by **Claim 2**, and they differ at the $i^\text{th}$ index, there must be some index $j > i$ further on, where $a^\textsf{OPT}_j > a^\textsf{ALG}_j$. Note that the value of the $j^\text{th}$ bean is strictly less than the value of the $i^\text{th}$ bean.

We proceed to construct a new solution $\textsf{OPT}'$ where all weights are the same except at index $i$ and $j$, i.e., $a^{\textsf{OPT}'}_k = a^\textsf{OPT}_k$ for all $k \neq i,j$.

For $i$ and $j$, take a small weight $\varepsilon > 0$ out of bean $j$ and add it to bean $i$ (this is possible because $a^\textsf{OPT}_i < a^\textsf{ALG}_i \leq s_i$). This gives us $a^{\textsf{OPT}'}_i = a^\textsf{OPT}_i + \varepsilon$ and $a^{\textsf{OPT}'}_j = a^\textsf{OPT}_j - \varepsilon$. The weight has not changed, but the total cost strictly increases by **Claim 3** (since $v_i > v_j$). We can go in-depth to see why this inequality holds:

$$\begin{aligned}
xv_i &> xv_j \\
a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j + xv_i &> a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j + xv_j \\
a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j + xv_i - xv_j &> a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j \\
(a^{\textsf{OPT}}_i + x)v_i + (a^{\textsf{OPT}}_j - x)v_j &> a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j \\
a^{\textsf{OPT}'}_iv_i + a^{\textsf{OPT}'}_jv_j &> a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j \\
\left(\sum_{k \neq i,j}a^{\textsf{OPT}}_kv_k\right) + a^{\textsf{OPT}'}_iv_i + a^{\textsf{OPT}'}_jv_j &> \left(\sum_{k \neq i,j}a^{\textsf{OPT}}_kv_k\right) + a^{\textsf{OPT}}_iv_i + a^{\textsf{OPT}}_jv_j \\
t^{\textsf{OPT}'} &> t^{\textsf{OPT}}
\end{aligned}$$

In fact, this shows that $\textsf{OPT}'$ is strictly better than $\textsf{OPT}$, a contradiction! Therefore, $t^\textsf{OPT} = t^\textsf{ALG}$, and thus $\textsf{ALG}$ is $\textsf{OPT}$. $\blacksquare$


## Conclusion

Phew! That was a notational nightmare. I feel like there are simpler and more intuitive explanations for why this problem works. For example, one could simply summarize this entire post as:
> We want the highest value, so simply sort by the highest value and take as much as we can. It works because it works!

However, I think it's not only important to understand why everything works through rigorous proof, but it's also pretty satisfying to see all the pieces come together. Especially with greedy proofs, something that may seem intuitive could be wildly wrong, and only through formal proofs can we catch those errors.

-BZ


## References and resources

This problem is actually based off of the [fractional/continuous knapsack problem](https://en.wikipedia.org/wiki/Continuous_knapsack_problem). It turns out that if you're restricted to taking only integer amounts of each bean, the problem becomes $\mathbf{NP}\text{-hard}$. here are a couple references for proofs that are similar to mine:
- [COMPSCI 330 19sp: Lecture 8, Section 8.1](https://courses.cs.duke.edu/spring19/compsci330/lecture8scribe.pdf)
- [C73 22au](http://www.cs.toronto.edu/~vassos/teaching/c73/handouts/fractional-knapsack.pdf) (this proof seems to use a structural technique)