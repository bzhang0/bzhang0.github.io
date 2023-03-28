window.MathJax = {
  options: {
    ignoreHtmlClass: 'tex2jax_ignore',
    processHtmlClass: 'tex2jax_process'
  },
  loader: {
    load: ['input/asciimath', '[tex]/noerrors', '[tex]/textmacros']
  },
  tex: {
    displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
    inlineMath: [ ['$','$'], ['\\(','\\)'] ],
    autoload: {
      color: [],
      colorv2: ['color']
    },
    packages: {'[+]': ['noerrors', 'textmacros']},
    macros: {
      // functions
      binfun: ["{#1 : \\{0, 1\\}^{#2} \\to \\{0, 1\\}}", 2],
      rank: "\\operatorname{rank}",
      spa: "\\operatorname{span}",
      col: "\\operatorname{col}",
      row: "\\operatorname{row}",
      proj: "\\operatorname{proj}",
      nul: "\\operatorname{null}",
      nullity: "\\operatorname{nullity}",
      trace: "\\operatorname{trace}",
      perm: "\\operatorname{perm}",
      sign: "\\operatorname{sign}",
      diag: "\\operatorname{diag}",
      argmin: "\\operatorname*{argmin}",
      argmax: "\\operatorname*{argmax}",
      twonorm: ["\\| #1 \\|_2", 1],
      poly: "\\operatorname{poly}",

      // probability
      prob: "\\mathbb{P}",
      E: "\\mathbb{E}",
      Cov: "\\textsf{Cov}",
      Var: "\\textsf{Var}",

      // vectors
      aA: "\\mathbf{a}",
      bb: "\\mathbf{b}",
      cc: "\\mathbf{c}",
      ee: "\\mathbf{e}",
      ff: "\\mathbf{f}",
      pp: "\\mathbf{p}",
      qq: "\\mathbf{q}",
      uu: "\\mathbf{u}",
      vv: "\\mathbf{v}",
      ww: "\\mathbf{w}",
      xx: "\\mathbf{x}",
      yy: "\\mathbf{y}",
      zz: "\\mathbf{z}",
      one: "\\mathbf{1}",
      zr: "\\mathbf{0}",

      // cal
      A: "\\mathcal{A}",
      B: "\\mathcal{B}",

      // matrices
      AA: "\\mathbf{A}",
      BB: "\\mathbf{B}",
      MM: "\\mathbf{M}",
      XX: "\\mathbf{X}",
      YY: "\\mathbf{Y}",

      // sets
      N: "\\mathbb{N}",
      R: "\\mathbb{R}",
      Z: "\\mathbb{Z}",
      Q: "\\mathbb{Q}",
      C: "\\mathbb{C}",

      // omitting complexity classes
      NL: "\\mathbf{NL}",
      coNL: "\\mathbf{coNL}",

      // complexity problems
      PATH: "\\mathsf{PATH}",
      TQBF: "\\mathsf{TQBF}",
      TWOCOL: "3\\text{-}\\mathsf{COL}",
      IP: "\\mathsf{IP}",
      HALT: "\\mathsf{HALT}",
      kCOLOR: "k\\text{-}\\mathsf{COLOR}",
      VERTEXCOVER: "\\mathsf{VERTEX}\\text{-}\\mathsf{COVER}",
      CLIQUE: "\\mathsf{CLIQUE}",
      INDSET: "\\mathsf{INDSET}",
      THREESAT: "3\\text{-}\\mathsf{SAT}",

      // computational time
      DTIME: "\\mathsf{DTIME}",
      DSPACE: "\\mathsf{DSPACE}",

      // formatting
      parens: ["\\left( #1 \\right)", 1],
      bracks: ["\\left[ #1 \\right]", 1],
      curly: ["\\left\\{ #1 \\right\\}", 1],
      abs: ["\\left| #1 \\right|", 1],

      quadarrow: "\\quad \\Rightarrow \\quad",
      quadand: "\\quad \\text{and} \\quad",
      quador: "\\quad \\text{or} \\quad",
      quadbut: "\\quad \\text{but} \\quad",
    },
    environments: {
      parens: ["\\left(", "\\right)"],
      curly: ["\\left\\{", "\\right\\}"]
    }
  },
};