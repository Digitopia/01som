function playAudio(n) {

    return function() {

        console.log("triggered", n)
        switch(soundString[n]) {
          case 1:
              audio1.play()
              break
          case 2:
              audio2.play()
              break
          case 3:
              audio3.play()
              break
          default:
              break
          }
      }
}
