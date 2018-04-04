### Melhorar/Corrigir
- [x] adicionar matriz binária à sessão 1
- [x] posicionamento dos círculos on resize e não só
- [x] tamanho da janela está oversized e a criar scroll, pelo menos no Chrome
- [x] tirar botões de bpm da sessão notation
- [x] falta adicionar possibilidade de gravar nas versões novas
- [x] adicionar subtitulo
- [x] update imagens
- [x] update README.md, com imagens e texto
- [x] migrar de github pages para netlify para poder ter o repositório na conta de Digitópia
- [ ] melhorar instruções: melhorar o contraste e dimensões da box
- [ ] terminar de implementar panner3D!
- [ ] "deprecar" a sessão 2 em favor da 3, uma vez que educativamente não está a acrescentar nada
- [ ] remover possibilidade de gravar áudio sessão 4, visto que praticamente ninguém usa
- [ ] converter sessão 4 para Tone.js
- [ ] fica a faltar também claro, passar tudo para app Android/iOS
- [ ] fullscreen icon bug
- [ ] css modo landscape
- [ ] mudar fonte sequencer labels
- [ ] tamanho texto sequencer labels também não parece o correto
- [ ] text size on orientation change
- [ ] matrizes

### New features

- [x] proper resize de demais elementos de interface
- [x] tamanho certo em móveis e computador
- [x] botão fullscreen
- [ ] posicionamento das matrizes binárias

#### Possible new features
- [ ] possibilidade de clicar diretamente na "matriz" de 0s e 1s e ter reflexo nos círculos
- [ ] possibilidade de arrastar sons para a "legenda" e até gravar diretamente do mic
- [ ] possibilidade de configurar número pontos, em vez de ser fixo sempre a 8
- [ ] Twitter Player card (?)

### Puramente Técnicas

- [x] Change to [Visual Studio Code](https://code.visualstudio.com/), to be able to make use of better intelisense
- [x] Add [ESlint](https://eslint.org/) to project, to improve code qualitiy and consistency. Use [Airbnb style guide](https://github.com/airbnb/javascript).
- [x] Experiment with [Vue.js](https://vuejs.org/), to build the buttons instead of using jQuery
- [x] Refactor code to use ECMASCript 6
    - [x] classes
    - [x] overcome the use of `var self = this` with the use of arrow functions
    - [x] default parameters
    - [x] better bind logic together via getter and setters!
    - [x] string interpolation `${var} and some test with another ${var}`
    - [x] avoid some `var` issues, by using `let` and even `const`
    - [x] dependências que antes globais agora locais e com scripts
    - [x] static methods
- [x] Just have to run one script instead of multiple
- [x] Experiment with [JSDoc](http://usejsdoc.org/) for classes, just because
- [ ] Add [webpack](https://webpack.js.org/)
    - [ ] also minify and bundle javascript code
- [ ] Automated screenshots on continous integration server
- [x] Automated testing on CI too
- [x] Migrate to netlify
- [x] Update readme with gif
- [ ] Change to SPA
- [ ] Make all global dependencies local
   - [x] webpack
   - [x] pug
   - [x] eslint
   - [x] live-server
   - [ ] sass
