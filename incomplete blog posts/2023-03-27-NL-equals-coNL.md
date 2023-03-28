---
layout: post
title: "NL = coNL"
author: "Ben Zhang"
categories: journal
tags: [cse431, complexity, nl, coNL, proof]
---

A fascinating discovery that we covered in our complexity theory class [CSE 431](https://courses.cs.washington.edu/courses/cse431/23wi/) is the proof that shows the complexity class $\NL$ is actually equal to its complement $\coNL$!

As a reminder, $\NL$ is the set of functions (or languages, depending on how you define complexity classes) solvable by a non-deterministic Turing machine using at most logarithmic space. $\coNL$ is the complement of $\NL$, which is the set of functions $f$ such that $1 - f$ is in $\NL$.

There is also an alternate definition of $\NL$ which uses certificates. We say $f$ is in $\NL$ if there exists a deterministic Turing machine $M$ and a polynomial $p$ such that on input $x \in \\{0, 1\\}^*$

$$f(x) = 1 \Leftrightarrow \exists w \in \{0, 1\}^{p(|x|)} \text{ s.t. } M(x, w) = 1,$$

where $M$ has read-once access to $w$.

In this blog post, we will first show that $\PATH$ is in $\NL$ and is $\NLC$. Then we show that $\overline{\PATH}$ is in $\coNL$ and in $\NL$, which thereby shows that $\NL = \coNL$.


## $\PATH$ is in $\NL$.

From here on, we'll assume that we are given a directed graph $G$ with $n$ vertices. Define $\PATH$ as follows:

$$\PATH(G, s, t) = \begin{cases} 1 & \text{if there exists a path from $s$ to $t$ in $G$} \\ 0 & \text{otherwise} \end{cases}$$

First note that if $s = t$, then we are done. With the easy case out of the way, consider the following non-deterministic algorithm to solve $\PATH$:

Maintain a counter $i$ and a current vertex $v_\text{curr}$. Initially, set $i = 0$ and $v_\text{curr} = s$. For each iteration of the loop, non-deterministically guess a vertex $v$ and check that it is adjacent to $v_\text{curr}$. If it is not, then reject. Otherwise, check if $v = t$. If it is not, then set $v_\text{curr} = v$. Repeat until the counter exceeds $n$. If we have not accepted by now, then reject.

### Correctness
$(\Rightarrow)$ Suppose there a path from $s$ to $t$ in $G$. Then our algorithm will non-deterministically guess the path from $s$ to $t$ and accept.

$(\Leftarrow)$ Suppose there is no path from $s$ to $t$ in $G$. Then our algorithm will never be able to guess a path from $s$ to $t$, and it will either select a vertex that is not adjacent to $v_\text{curr}$ or it will exceed $n$ iterations. In either case, it will reject.

### Analysis
Our algorithm takes $\log n$ bits to store $i$, and $\mathcal{O}(\log n)$ bits to store $v_\text{curr}$ and the next vertex $v$. Therefore, the entire algorithm takes non-deterministic logarithmic space, which means $\PATH \in \NL$.


## $\PATH$ is $\NLC$.

I'll admit my understanding of $\NLC$ness is not the strongest, but I'll give it my best shot here. Consider a function $f$ such that there exists a nondeterministic turing machine $M_f$ such that $f(x) = M_f(x)$ and $M$ uses at most $\mathcal{O}(\log n)$ space. We will show that $f$ can be reduced to $\PATH$.

We first prove a quick fact about configuration graphs.
<br><br/>
**Claim 1.** *If a machine $M$ uses at most $s(n)$ space, then its configuration graph is of size at most $2^{\mathcal{O}(s(n))}$.*

*Proof.* The configuration graph $G_{M,x}$ of $M$ on input $x$ is a directed graph where each vertex are possible configurations. A configuration consists of 
- contents of the work tape
- location of the pointers on the work/input tape
- line number of code for the Turing machine

If $M$ takes space $\bigOh(s(n))$, then there are at most $n$ possible locations of the input tape pointer and at most $s(n)$ locations of the work tape pointer. The code executed by the machine is constant. Finally, there are at most $2^{\bigOh(s(n))}$ ways to represent the contents of the work tape (we consider asymptotic with respect to $s(n)$ to avoid any constant factors). Then, there are at most

$$\begin{aligned}
n \cdot s(n) \cdot \bigOh(1) \cdot 2^{\bigOh(s(n))} &= 2^{\log n + \log s(n) + \log\bigOh(1) + \bigOh(s(n))} \\
&= 2^{\mathcal{O}(s(n))} \\
\end{aligned}$$

vertices in $G_{M, x}$, since $s(n) \geq \log n$.
<br><br/>
Therefore, we can see that $M_f$ has a configuration graph of size $2^{\bigOh(\log n)}$. We can then execute $\PATH(G_{M_f, x}, \texttt{start}, \texttt{accept})$ (where $\texttt{start}$ and $\texttt{accept}$ are the specific start and accept states of $M_f$) to determine if $M_f$ can solve $f(x)$. Note that each configuration can be generated in logarithmic space as we can simulate a single step of $M_f$, and since $M_f$ uses logarithmic space, this is at most $\bigOh(\log n)$ space. 

Since we have shown that $f$ can be solved with $\PATH$, this necessarily implies that $\PATH$ is $\NLC$.

## $\overline{\PATH}$ is in $\coNL$.
The following theorem was shown by Immerman-Szlepcsenyi. Consider the complement of $\PATH$ as follows:

$$ \overline{\PATH}(G, s, t) = \begin{cases} 1 & \text{if there does not exist a path from $s$ to $t$ in $G$} \\ 0 & \text{otherwise} \end{cases}$$




<!-- https://www.cs.umd.edu/~jkatz/complexity/f11/all.pdf -->