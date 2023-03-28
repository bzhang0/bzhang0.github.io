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

In this blog post, we will first show that $\PATH$ is in $\NL$ and is $\NLC$. Then we show that $\overline{\PATH}$ is also in $\NL$, which thereby shows that $\NL = \coNL$.

## to be continued!