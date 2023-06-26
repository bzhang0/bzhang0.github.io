---
layout: post
title: "NL = coNL"
author: "Ben Zhang"
categories: journal
tags: [cse431, complexity, nl, coNL, proof]
---

A fascinating discovery that we covered in our complexity theory class [CSE 431](https://courses.cs.washington.edu/courses/cse431/23wi/) is the proof that shows the complexity class $\NL$ is equal to its complement $\coNL$.

As a reminder, $\NL$ is the set of functions (or languages, depending on how you define complexity classes) solvable by a non-deterministic Turing machine using at most logarithmic space. $\coNL$ is the complement of $\NL$, which is the set of functions $f$ such that $1 - f$ is in $\NL$.

There is also an alternate definition of $\NL$ which uses certificates. We say that $f \in \NL$ iff there exists a (deterministic) Turing machine that uses space at most $\bigOh(\log n)$ and such that

$$ f(x) = 1 \,\Longleftrightarrow\, \exists w \in \{0, 1\}^{p(|x|)} \text{ s.t. } M(x, w) = 1 \;, $$

where $M$ has read-once access to $w$.

In this blog post, we will first show that $\PATH$ is in $\NL$ and is $\NLC$. Then we show that $\overline{\PATH}$ is also in $\NL$, which thereby shows that $\NL = \coNL$.


## $\PATH$ is in $\NL$.

Suppose we are given a directed graph $G$ with $n$ vertices. 

Define $\PATH$ as follows:

$$\PATH(G, a, b) = \begin{cases} 1 & \text{if there exists a path from $a$ to $b$ in $G$} \\ 0 & \text{otherwise} \end{cases}$$

<hr>
**Claim 1.** $\PATH \in \NL$.

*Proof*. First note that if $a=b$, then we are done. With the easy case out of the way, consider the following non-deterministic algorithm to solve $\PATH$:

Maintain a counter $i$ and a current vertex $v_\text{curr}$. Initially, set $i = 0$ and $v_\text{curr} = a$. For each iteration of the loop, non-deterministically guess a vertex $v$ and check that it is adjacent to $v_\text{curr}$. If it is not, then reject. Otherwise, check if $v = b$. If it is not, then set $v_\text{curr} = v$. Repeat until the counter exceeds $n$. If we have not accepted by now, then reject.

**Correctness**

$(\Rightarrow)$ Suppose there a path from $a$ to $b$ in $G$. Then our algorithm will non-deterministically guess the path from $a$ to $b$ and accept.

$(\Leftarrow)$ Suppose there is no path from $a$ to $b$ in $G$. Then our algorithm will never be able to guess a path from $a$ to $b$, and it will either select a vertex that is not adjacent to $v_\text{curr}$ or it will exceed $n$ iterations. In either case, it will reject.

**Analysis**

Our algorithm takes $\log n$ space to store $i$, and $\mathcal{O}(\log n)$ bits to store $v_\text{curr}$ and the next vertex $v$. The entire algorithm takes non-deterministic logarithmic space, so $\PATH \in \NL$. $\square$
<hr>

## $\PATH$ is $\NLC$.

I'll admit my understanding of $\NLC$ness is not the strongest, but I'll give it my best shot here. Consider a function $f$ such that there exists a nondeterministic turing machine $M_f$ such that $f(x) = M_f(x)$ and $M$ uses at most $\mathcal{O}(\log n)$ space. We will show that $f$ can be reduced to $\PATH$.

We first prove a quick fact about configuration graphs.

<hr>
**Claim 2.** *If $M$ uses at most $s(n)$ space, then its configuration graph is of size at most $2^{\mathcal{O}(s(n))}$.*

*Proof.* The configuration graph $G_{M,x}$ of $M$ on input $x$ is a directed graph where each vertex are possible configurations. A configuration consists of 
- contents of the work tape
- location of the pointers on the work/input tape
- line number of code for the Turing machine

If $M$ takes space $\bigOh(s(n))$, then there are at most $n$ possible locations of the input tape pointer and at most $s(n)$ locations of the work tape pointer. The code executed by the machine is constant. Finally, there are at most $2^{\bigOh(s(n))}$ ways to represent the contents of the work tape (we consider asymptotic with respect to $s(n)$ to avoid any constant factors). Then, there are at most

$$
n \cdot s(n) \cdot \bigOh(1) \cdot 2^{\bigOh(s(n))} = 2^{\log n + \log s(n) + \log\bigOh(1) + \bigOh(s(n))} = 2^{\mathcal{O}(s(n))}
$$

vertices in $G_{M, x}$, since $s(n) \geq \log n$. $\square$
<hr>

Therefore, we can see that $M_f$ has a configuration graph of size $2^{\bigOh(\log n)}$. We can then execute $\PATH(G_{M_f, x}, \texttt{start}, \texttt{accept})$ (where $\texttt{start}$ and $\texttt{accept}$ are the specific start and accept states of $M_f$) to determine if $M_f$ can solve $f(x)$. Note that each configuration can be generated in logarithmic space as we can simulate a single step of $M_f$, and since $M_f$ uses logarithmic space, this is at most $\bigOh(\log n)$ space. 

Since we have shown that $f$ can be solved with $\PATH$, this necessarily implies that $\PATH$ is $\NLC$.

## $\overline{\PATH}$ is in $\NL$.
The following theorem was shown by Immerman-Szlepcsenyi. Consider the complement of $\PATH$ as follows:

$$ \overline{\PATH}(G, a, b) = \begin{cases} 1 & \text{if there does not exist a path from $a$ to $b$ in $G$} \\ 0 & \text{otherwise} \end{cases}$$

Suppose we have a fixed $G,a,b$ of size at most $2^{s(n)}$. Let $C_i$ denote the set of set of vertices reachable from $a$ in at most $i$ steps. Additionally, let $c_i$ be the size of $C_i$.

<hr>

**Claim 3.** Given a vertex $v$ and a number $i \leq 2^{s(n)}$, then there exists a non-deterministic space $s(n)$ algorithm such that:
- If $v \in C_i$, then some computational path outputs $1$.
- If $v \notin C_i$, then every computational path outputs $0$.

*Proof.* We follow an extremely similar approach to **Claim 1**, except this time our counter will be at most the $i$ provided above. $\square$

<hr>

**Claim 4.** *Given $c_{i-1}$ and a vertex $v$, there exists a non-deterministic space $s(n)$ algorithm such that:*
- *If $v \notin C_i$, then some computational path outputs $1$.*
- *If $v \in C_i$, then every computational path outputs $0$.*

*Proof.* Since we are using a non-deterministic algorithm, we may assume that 
we can guess each of the vertices of $C_{i-1}$, and the guessed vertices are in increasing order. Let $v_{\text{curr}}$ be the currently guessed vertex. At each step, we check the following (in increasing order):
- $v_{\text{curr}}$ is strictly greater than the previous vertex.
- $v_{\text{curr}}$ is in $C_{i-1}$.
- $v_{\text{curr}}$ is not $v$.
- $v_{\text{curr}}$ is not a neighbor of $v$.

The second bullet can be verified through **Claim 3**. All other bullets can be easily verified. If all checks pass, then we increment a counter by $1$. The algorithm finally checks that the counter has stopped at $c_{i-1}$. If at any point there is an incorrect check, the algorithm outputs $0$. Otherwise, the algorithm returns $1$.

**Correctness**

$(\Rightarrow)$ Suppose there is not a path from $a$ to $v$ of length $i$. Then none of the neighbors of $v$ will be in $C_{i-1}$, and at no point will we have an invalid check, as none of the neighbors of $v$ will be guessed. Therefore, the algorithm will output $1$.

$(\Leftarrow)$ Suppose there is a path from $a$ to $v$ of length $i$. Then, at some point, we will guess a neighbor of $v$ that is in $C_{i-1}$. This will lead to an invalid check, and the algorithm will output $0$. 

**Analysis**

Similar to **Claim 1**, we only need $\bigOh(s(n))$ space to keep track of the counter, previous vertex, and current vertex. This is logarithmic with respect to the graph size. $\square$
<hr>

The main question is: how can we get $c_{i-1}$ in logarithmic space? We can use the following claim.

<hr>

**Claim 5.** Given $c_{i-1}$, there is a non-deterministic space $s(n)$ algorithm such that the algorutm either aborts, or outputs $c_i$.

*Proof.* We can go through each vertex in the entire graph. At each step, we use $c_{i-1}$ and the current vertex $v_{\text{curr}}$ to check if $v_{\text{curr}}$ is in $C_i$ or not. This verification can be done through **Claim 3** and **Claim 4**. If the algorithm in **Claim 4** returns $1$, then we increment our counter. After all $2^{s(n)}$ vertices are checked, we output our counter as $c_{i}$.

**Correctness**

$(\Rightarrow)$ If $c_{i-1}$ is correct, then we will increment our counter for each vertex in $C_i$. Therefore, we will output $c_i$.

$(\Leftarrow)$ If $c_{i-1}$ is incorrect, then we will not pass some check in either **Claim 3** or **Claim 4**.

**Analysis**
The counter and current vertex requires $\bigOh(s(n))$ space. Passing the input into the algorithms for **Claim 3** and **Claim 4** also require $\bigOh(s(n))$ space. Therefore, the algorithm requires $\bigOh(s(n))$ space. $\square$

<hr>

We are now able to prove the main theorem.

<hr>

*Proof.* Given $G,a,b$, with $G$ of size $s(n)$, we first calculate $C_{s(n)}$ by repeatedly applying **Claim 5**, with $c_{0} = 1$, since $C_0 = \\{a\\}$. After each iteration of **Claim 5**, we discard the previous $c_i$. Finally, we check if $b \in C_{s(n)}$ through **Claim 3** and **Claim 4**. Correctness naturally follows from the correctness of both **Claim 3** and **Claim 4**. Simiarly, it is clear that we only require $\bigOh(s(n))$ space. $\square$

<hr>

## Conclusion

Why does showing $\overline{\PATH} \in \NL$ indicate that $\NL = \coNL$? Well, one fact is that if a function $f \in \NL$, then its complement $\overline{f} \in \coNL$, and vice versa. Since $\PATH \in NL$, we have $\overline{\PATH} \in \coNL$. Since $\overline{\PATH} \in \NL$ as well, we can say $\PATH \in \coNL$. Since $\PATH$ is $\NLC$, any function $f$ in $\NL$ is also in $\coNL$ as well.

This is quite interesting as we have no current way to find a tighter relationship between time complexity classes, but here we have exactly shown that $\NL = \coNL$, or a more general statement, 

$$\textrm{nspace}(s(n)) = \text{co-}\textrm{nspace}(s(n)) \;,$$

where $s(n) \geq \log n$ is space constructible.

From this, we get some strong pointers to the belief that space and time complexity classes have quite different relationships. For example, we still have yet to show a strict(?) containment between $\textbf{P}$ and $\textbf{coP}$, and similary with $\textbf{NP}$ and $\textbf{coNP}$.

## References
The intuition and ideas behind many of these proofs were inspired by the following sources:
- [https://homes.cs.washington.edu/~anuprao/pubs/CSE431wi23/lecture11.pdf](https://homes.cs.washington.edu/~anuprao/pubs/CSE431wi23/lecture11.pdf)
- [https://www.cs.umd.edu/~jkatz/complexity/f11/all.pdf](https://www.cs.umd.edu/~jkatz/complexity/f11/all.pdf)
- [https://theory.cs.princeton.edu/complexity/book.pdf](https://theory.cs.princeton.edu/complexity/book.pdf)